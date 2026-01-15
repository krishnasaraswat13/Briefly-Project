import multer from 'multer';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';
import dotenv from 'dotenv';

// Ensure env variables are loaded if this file is imported early
dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// 1. Create upload directory if it doesn't exist
const uploadDir = path.join(__dirname, '../uploads/documents');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// 2. Configure storage engine
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    // Clean filename to prevent issues with special characters
    const safeName = file.originalname.replace(/[^a-zA-Z0-9.\-_]/g, '_');
    cb(null, `${uniqueSuffix}-${safeName}`);
  },
});

// 3. File filter - Strict PDF check
const fileFilter = (req, file, cb) => {
  if (file.mimetype === 'application/pdf') {
    cb(null, true);
  } else {
    cb(new Error('Only PDF files are allowed'), false);
  }
};

/**
 * 4. Configure Multer with dynamic size limits
 * We use a helper to ensure "5MB" from .env is converted to bytes.
 */
const getLimitInBytes = () => {
  const envLimit = process.env.MAX_FILE_SIZE || '10MB';
  const numericValue = parseInt(envLimit);
  
  if (envLimit.includes('MB')) return numericValue * 1024 * 1024;
  if (envLimit.includes('KB')) return numericValue * 1024;
  return numericValue; // Defaults to bytes
};

const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: {
    fileSize: getLimitInBytes(),
  },
});

export default upload;