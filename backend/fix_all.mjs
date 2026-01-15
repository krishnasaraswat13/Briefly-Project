import fs from 'fs/promises';
import { extractTextFromPdf } from './utils/pdfParser.js';
import { chunkText } from './utils/textChunker.js';

import('mongoose').then(async (mongooseModule) => {
  const mongoose = mongooseModule.default;
  const Document = (await import('./models/document.models.js')).default;
  await mongoose.connect('mongodb://localhost:27017/BrieflyDB');
  
  const docs = await Document.find({ status: 'failed' });
  console.log(`Found ${docs.length} failed documents.`);
  
  for (const doc of docs) {
    console.log(`Processing document: ${doc.title} (${doc._id})`);
    try {
      const response = await fetch(doc.filePath);
      if (!response.ok) throw new Error('Failed to fetch PDF from ' + doc.filePath);
      
      const arrayBuffer = await response.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);
      await fs.writeFile('temp.pdf', buffer);
      
      const { text } = await extractTextFromPdf('temp.pdf');
      const chunks = chunkText(text, 500, 50);
      
      await Document.collection.updateOne(
        { _id: doc._id },
        { $set: { chunks: chunks, extractedText: text, status: 'ready' } }
      );
      
      console.log(`Successfully fixed ${doc.title}`);
      await fs.unlink('temp.pdf').catch(() => {});
    } catch (err) {
      console.error(`Error fixing ${doc.title}:`, err);
    }
  }
  
  const ChatHistory = (await import('./models/chatHistory.models.js')).default;
  await ChatHistory.updateMany({}, { $set: { messages: [] } });
  
  console.log('Done processing all documents and cleared chat history again.');
  process.exit();
});
