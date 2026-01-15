import dotenv from 'dotenv';
import { GoogleGenAI } from '@google/genai';
import { text } from 'express';

dotenv.config();

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

if (!process.env.GEMINI_API_KEY) {
  console.error('FATAL ERROR: GEMINI_API_KEY is not set in the environment variable');
}

/**
 * Generate flashcards from text
 * @param {string} text - Document text
 * @param {number} count - Number of flashcards to generate
 * @returns {Promise<Array<{question: string, ans: string, difficulty: string}>>}
 */

export const generateFlashcards = async (text, count = 10) => {
  const prompt = `Generate exactly ${count} educational flashcards from the following text.
  Format each flashcard as:
  Q: [Clear, specific question]
  A: [Concise, accurate answer]
  D: [Difficulty level: easy, medium, or hard]

  Separate each flashcard with "---"

  Text:
  ${text.substring(0, 15000)}`;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash-lite',
      contents: prompt,
    });

    const generatedText = response.text;

    const flashcards = [];
    const cards = generatedText.split('---').filter((c) => c.trim());

    for (const card of cards) {
      const lines = card.trim().split('\n');
      let question = '',
        answer = '',
        difficulty = 'medium';

      for (let line of lines) {
        line = line.trim();
        if (line.startsWith('Q:')) {
          question = line.substring(2).trim();
        } else if (line.startsWith('A:')) {
          answer = line.substring(2).trim();
        } else if (line.startsWith('D:')) {
          const diff = line.substring(2).trim().toLowerCase();
          if (['easy', 'medium', 'hard'].includes(diff)) {
            difficulty = diff;
          }
        }
      }

      if (question && answer) {
        flashcards.push({ question, answer, difficulty });
      }
    }
    return flashcards.slice(0, count);
  } catch (error) {
    console.error('Gemini API error:', error);
    throw new Error('Failed to generate flashcards');
  }
};

/**
 * Generate quiz questions
 * @param {string} text - Document text
 * @param {Number} numQuestions - Number of questions
 * @returns {Promise<Array<{question: string, options: Array, answer: string}>>}
 */

export const generateQuiz = async (text, numQuestions = 5) => {
  const prompt = `Generate exactly ${numQuestions} multiple choice questions from the following text.
  Format each question as:
  Q: [Question]
  O1: [option1]
  O2: [option2]
  O3: [option3]
  O4: [option4]
  A: [Correct option - exactly as written above]
  E: [Brief Explanation]
  D: [Difficulty level: easy, medium, or hard]

  Separate each quiz with "---"

  Text:
  ${text.substring(0, 15000)}`;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash-lite',
      contents: prompt,
    });

    const generatedText = response.text;

    const questions = [];
    const questionBlocks = generatedText.split('---').filter((q) => q.trim());

    for (const block of questionBlocks) {
      const lines = block.trim().split('\n');
      let question = '',
        options = [],
        correctAnswer = '',
        explanation = '',
        difficulty = 'medium';

      for (let line of lines) {
        line = line.trim();
        if (line.startsWith('Q:')) {
          question = line.substring(2).trim();
        } else if (line.startsWith('O')) {
          options.push(line.substring(3).trim());
        } else if (line.startsWith('A:')) {
          correctAnswer = line.substring(2).trim();
        } else if (line.startsWith('E:')) {
          explanation = line.substring(2).trim();
        } else if (line.startsWith('D:')) {
          let diff = line.substring(2).trim();
          if (['easy', 'medium', 'hard'].includes(diff)) {
            difficulty = diff;
          }
        }
      }

      if (question && correctAnswer && options.length === 4) {
        questions.push({ question, options, correctAnswer, explanation, difficulty });
      }
    }

    return questions;
  } catch (error) {
    console.error('Gemini API error:', error);
    throw new Error('Failed to generate quiz');
  }
};

/**
 * Generate document summary
 * @param {string} text - Document Text
 * @returns {Promise<string>}
 */

export const generateSummary = async (text) => {
  const prompt = `Provide a concise summary of the following text, highlighting the key concepts, main ideas, and important points.
  Keep the summary clear and structured.
  
  Text:
  ${text.substring(0, 20000)}`;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash-lite',
      contents: prompt,
    });

    const generatedText = response.text;

    return generatedText;
  } catch (error) {
    console.error('Gemini API error:', error);
    throw new Error('Failed to generate summary');
  }
};

/**
 * Chat with document context
 * @param {string} question - User question
 * @param {Array<Object>} chunks - Relevant document chunks
 * @returns {Promise<string>}
 */
export const chatWithContent = async (question, chunks, history = []) => {
  const context = chunks.map((c, i) => `[Chunk ${i + 1}]\n${c.content}`).join('\n\n');
  const historyText = history.slice(-6).map(m => `${m.role === 'user' ? 'User' : 'Assistant'}: ${m.content}`).join('\n');

  let prompt;
  if (context.trim()) {
    prompt = `You are a helpful and intelligent AI assistant analyzing a PDF document for a user.
    
    IMPORTANT: The text in the "Document Context" section below IS the content of the user's PDF. Do NOT tell the user that you cannot read PDFs, cannot access files, or don't have their document. You ALREADY have it.

    Use the Document Context to answer the user's question. If the user refers to "the pdf" or "the document", they mean the Document Context provided below.
    If the context contains the answer, use it. If the user's question is conversational, or if the answer is truly not in the context, feel free to use your general knowledge.

    Previous Conversation History:
    ${historyText ? historyText : 'No previous history.'}
    
    Document Context:
    ${context}
    
    Current Question: ${question}
    
    Answer:`;
  } else {
    prompt = `You are a helpful and intelligent AI assistant. 
    Answer the user's question using your general knowledge, being helpful and conversational.
    
    Previous Conversation History:
    ${historyText ? historyText : 'No previous history.'}

    Current Question: ${question}
    
    Answer:`;
  }

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash-lite',
      contents: prompt,
    });

    const generatedText = response.text;

    return generatedText;
  } catch (error) {
    console.error('Gemini API error:', error);
    throw new Error('Failed to process chat request');
  }
};

/**
 * Explain a specific concept
 * @param {string} explainConcept - Concept to explain
 * @param {Array<Object>} chunks - Relevant document chunks
 * @returns {Promise<string>}
 */

export const explainConcept = async (concept, chunks) => {
  const context = chunks.map((c, i) => `[Chunk ${i + 1}]\n${c.content}`).join('\n\n');

  const prompt = `Explain the concept of ${concept} based on the following context. Provide a clear, education explanation that's easy to understand.
  Include example if relevant.
  
  Context:
  ${context.substring(0, 10000)}`;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash-lite',
      contents: prompt,
    });

    const generatedText = response.text;

    return generatedText;
  } catch (error) {
    console.error('Gemini API error:', error);
    throw new Error('Failed to explain concept');
  }
};
