import fs from 'fs/promises';
import { DOMMatrix } from 'canvas';

// 1. Solve the DOMMatrix issue locally in this file
// Must be done before importing pdf-parse which depends on pdfjs-dist
global.DOMMatrix = DOMMatrix;

export const extractTextFromPdf = async (filePath) => {
  try {
    const dataBuffer = await fs.readFile(filePath);

    if (!dataBuffer || dataBuffer.length === 0) {
      throw new Error('PDF file is empty or could not be read.');
    }

    // Dynamic import to ensure global.DOMMatrix is set before pdf-parse evaluates
    const { PDFParse } = await import('pdf-parse');

    const parser = new PDFParse({ data: dataBuffer });
    const result = await parser.getText();
    await parser.destroy();
    
    return {
      text: result.text || '',
      numpages: result.numpages || 1,
      info: result.info || {}
    };
  } catch (error) {
    console.error("Internal Parser Error Details:", error);
    throw new Error(`PDF Extraction Failed: ${error.message}`);
  }
};