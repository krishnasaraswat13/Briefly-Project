import { chunkText } from './utils/textChunker.js';
import('mongoose').then(async (mongooseModule) => {
  const mongoose = mongooseModule.default;
  const Document = (await import('./models/document.models.js')).default;
  await mongoose.connect('mongodb://localhost:27017/BrieflyDB');
  const doc = await Document.findOne().sort({ createdAt: -1 });
  
  if (!doc) { console.log('no doc'); process.exit(); }
  if (!doc.extractedText) { console.log('no extractedText'); process.exit(); }
  
  const chunks = chunkText(doc.extractedText, 500, 50);
  
  await Document.collection.updateOne(
    { _id: doc._id },
    { $set: { chunks: chunks, status: 'ready' } }
  );
  
  console.log('updated natively');
  process.exit();
});
