# Briefly

Briefly is an AI-based learning tool that transforms static documents into interactive study material. Instead of just reading PDFs, users can generate quizzes, flashcards, summaries, and ask focused questions to better understand the content.

The key idea behind Briefly is that all outputs are strictly based on the uploaded document. This ensures that responses remain accurate, relevant, and easy to trace back to the source.

This project was built to demonstrate real-world AI integration in a production-like environment.

**Live Demo:** 

---

## 🌟 Features
- Upload PDF documents securely
- Generate quizzes automatically from content
- Create flashcards with different difficulty levels
- Get concise summaries for quick revision
- Understand concepts through AI-generated explanations
- Ask questions and receive answers based only on the document

## ⚙️ Functionality
- Cloud-based file storage using ImageKit
- Text extraction from PDFs followed by smart chunking
- Processing pipeline with status tracking (processing, ready, failed)
- AI-generated outputs limited strictly to document content
- Context-aware Q&A using relevant chunks only

## 🏗 System Design
- Layered architecture with clear separation of concerns
- Routes handle API endpoints
- Middleware manages authentication and validation
- Controllers contain business logic
- MongoDB models define data structure
- Frontend services handle API calls

## 🔒 Security and Data Handling
- JWT-based authentication
- User-specific data isolation
- Documents and generated content stored per user

## 🚀 Optimization
- Generated outputs are stored and reused
- Reduces repeated AI calls
- Improves performance and debugging

---

## 💻 Tech Stack

### Frontend
- React
- Redux Toolkit
- Tailwind CSS

### Backend
- Node.js
- Express.js
- MongoDB (Mongoose)

### Cloud & AI
- ImageKit (file storage)
- Gemini API (AI generation)
- Custom chunking and relevance filtering

### Engineering Practices
- RESTful API design
- Modular code structure
- Secure authentication with JWT
- Git-based workflow

//npm run dev on backend and frontend both