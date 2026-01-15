import React, { useState, useEffect, useRef } from 'react';
import { Send, MessageSquare, Sparkles } from 'lucide-react';
import { useParams } from 'react-router-dom';
import aiServices from '../../services/ai.service.js';
import { useAuth } from '../../context/AuthContext.jsx';
import Spinner from '../common/Spinner.jsx';
import MarkdownRenderer from '../common/MarkdownRenderer.jsx';
import toast from 'react-hot-toast';

const ChatInterface = () => {
  const { id: documentId } = useParams();
  const { user } = useAuth();
  const [history, setHistory] = useState([]);
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);
  const messagesEndRef = useRef(null);

  const scrolltoBottom = () => {
    messagesEndRef.current?.scrollIntoView({ bottom: 'smooth' });
  };

  useEffect(() => {
    const fetchChatHistory = async () => {
      try {
        setInitialLoading(true);

        const response = await aiServices.getChatHistory(documentId);
        setHistory(response.data);
      } catch (error) {
        toast.error('Failed to fetch chat history');
        console.error('Failed to fetch chat history', error);
      } finally {
        setInitialLoading(false);
      }
    };

    fetchChatHistory();
  }, [documentId]);

  useEffect(() => {
    scrolltoBottom();
  }, [history]);

  const sendMessage = async (e) => {
    e.preventDefault();
    if (!message.trim()) return;

    const userMessage = { role: 'user', content: message, timestamp: new Date() };
    setHistory((prev) => [...prev, userMessage]);
    setMessage('');
    setLoading(true);

    try {
      const response = await aiServices.chat(documentId, userMessage.content);
      const assistantMessage = {
        role: 'assistant',
        content: response.data.answer,
        timestamp: new Date(),
        relevantChunks: response.data.relevantChunks,
      };
      setHistory((prev) => [...prev, assistantMessage]);
    } catch (error) {
      const assistantMessage = {
        role: 'assistant',
        content: 'Sorry, I encountered an unexpected error. Please try again.',
        timestamp: new Date(),
      };
      setHistory((prev) => [...prev, assistantMessage]);
    } finally {
      setLoading(false);
    }
  };

  const renderMessage = (msg, index) => {
    const isUser = msg.role === 'user';
    return (
      <div key={index} className={`flex items-start gap-3 my-4 ${isUser ? 'justify-end' : ''}`}>
        {!isUser && (
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center shrink-0">
            <Sparkles strokeWidth={2} className="w-4 h-4 text-white" />
          </div>
        )}

        <div
          className={`max-w-xl p-4 rounded-2xl shadow-sm ${isUser
              ? 'bg-gradient-to-br from-primary to-secondary rounded-br-md'
              : 'bg-gradient-to-br from-primary/10 to-secondary/10 rounded-bl-md border border-primary/20'
            } `}
        >
          {isUser ? (
            <p className="text-base leading-relaxed text-white">{msg.content}</p>
          ) : (
            <div className="prose prose-sm max-w-none prose-slate">
              <MarkdownRenderer content={msg.content} />
            </div>
          )}
        </div>
        {isUser && (
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center shrink-0 font-semibold text-white">
            {user?.username?.charAt(0).toUpperCase() || 'U'}
          </div>
        )}
      </div>
    );
  };

  if (initialLoading) {
    return (
      <div className="flex flex-col h-[70vh] bg-gradient-to-br from-primary/5 to-secondary/5 backdrop-blur-xl border border-primary/20 rounded-md items-center justify-center shadow-lg shadow-primary/10">
        <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center mb-4">
          <MessageSquare strokeWidth={2} className="w-6 h-6 text-white" />
        </div>
        <Spinner />
        <p className="text-base mt-3 font-medium text-foreground/70">Loading chat History...</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-[70vh] bg-gradient-to-br from-primary/5 to-secondary/5 backdrop-blur-xl border border-primary/20 rounded-md items-center justify-center shadow-lg shadow-primary/10">
      <div className="flex-1 w-full p-6 overflow-y-auto bg-gradient-to-br from-[#0A0F1C] via-[#0A0F1C] to-[#0D9488]/5 rounded-lg">
        {history.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-center">
            <div className="w-14 h-14 rounded-lg bg-gradient-to-br from-primary to-secondary flex items-center justify-center mb-4 shadow-lg shadow-primary/30">
              <MessageSquare strokeWidth={2} className="h-6 w-6 text-white" />
            </div>
            <h3 className="text-base font-semibold mb-2 text-foreground">Start a conversation</h3>
            <p className="text-base text-foreground/70">Ask me anything about the document</p>
          </div>
        ) : (
          history.map(renderMessage)
        )}

        <div ref={messagesEndRef}>
          {loading && (
            <div className="flex items-center gap-3 my-4">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center shrink-0">
                <Sparkles strokeWidth={2} className="w-4 h-4 text-white" />
              </div>
              <div className="flex items-center gap-2 p-3 rounded-2xl rounded-bl-md border border-primary/20 bg-primary/5">
                <div className="flex gap-1">
                  <span
                    className="w-2 h-2 rounded-full animate-bounce bg-primary"
                    style={{ animationDelay: '0ms' }}
                  />
                  <span
                    className="w-2 h-2 rounded-full animate-bounce bg-primary"
                    style={{ animationDelay: '150ms' }}
                  />
                  <span
                    className="w-2 h-2 rounded-full animate-bounce bg-primary"
                    style={{ animationDelay: '300ms' }}
                  />
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="p-2 border-t border-primary/20 w-full">
        <form onSubmit={sendMessage} className="flex items-center gap-3">
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Ask a follow-up question..."
            disabled={loading}
            className="flex-1 h-12 px-4 border-2 border-primary/30 rounded-xl focus:outline-none focus:border-primary bg-primary/5 text-foreground placeholder-foreground/50"
          />
          <button
            type="submit"
            disabled={loading || !message.trim()}
            className="rounded-full bg-gradient-to-r from-primary to-secondary h-12 w-12 flex items-center justify-center font-medium hover:from-secondary hover:to-primary transition-all duration-200 disabled:cursor-not-allowed disabled:opacity-50 shadow-lg shadow-primary/30"
          >
            <Send strokeWidth={2} className="h-6 w-6 text-white" />
          </button>
        </form>
      </div>
    </div>
  );
};

export default ChatInterface;
