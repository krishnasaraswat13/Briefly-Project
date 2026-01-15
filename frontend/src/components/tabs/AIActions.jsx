import React, { use, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Brain, BookOpen, Lightbulb } from 'lucide-react';
import aiServices from '../../services/ai.service';
import toast from 'react-hot-toast';
import MarkdownRenderer from '../common/MarkdownRenderer';
import Modal from '../common/Modal.jsx';

const AIActions = () => {
  const { id: documentId } = useParams();
  const [loadingAction, setLoadingAction] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalTitle, setModalTitle] = useState('');
  const [modalContent, setModalContent] = useState('');
  const [concept, setConcept] = useState('');

  const handleGenerateSummary = async () => {
    setLoadingAction('summary');
    try {
      const response = await aiServices.generateSummary(documentId);
      setModalTitle('Generated Summary');
      setModalContent(response.data.summary);
      setIsModalOpen(true);
    } catch (error) {
      toast.error('Failed to generate summary');
    } finally {
      setLoadingAction(null);
    }
  };

  const handleExplainConcept = async (e) => {
    e.preventDefault();
    if (!concept.trim()) {
      toast.error('Please enter a concept to explain');
      return;
    }
    setLoadingAction('explain');
    try {
      const response = await aiServices.explainConcept(documentId, concept);
      setModalTitle(`Explanation of ${concept}`);
      setModalContent(response.data.explanation);
      setIsModalOpen(true);
      setConcept('');
    } catch (error) {
      toast.error('Failed to explain concept');
    } finally {
      setLoadingAction(null);
    }
  };

  return (
    <>
      <div className="glass-panel rounded-2xl shadow-lg shadow-primary/10 overflow-hidden border border-primary/20">
        {/* Header */}
        <div className="px-6 py-5 border-b border-primary/10 bg-gradient-to-br from-primary/10 to-secondary/10 relative overflow-hidden">
          <div className="absolute -right-10 -top-10 w-40 h-40 bg-accent/20 blur-3xl rounded-full" />
          <div className="flex items-center gap-4 relative z-10">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-primary to-secondary shadow-lg shadow-primary/30 flex items-center justify-center animate-pulse-glow">
              <Brain className="h-6 w-6 text-white" strokeWidth={2} />
            </div>
            <div>
              <h3 className="text-xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-primary via-light to-accent">Briefly.</h3>
              <p className="text-sm text-foreground/70 font-medium">Powered by Advanced AI</p>
            </div>
          </div>
        </div>

        <div className="p-6 space-y-6">
          {/* Summary */}
          <div className="group p-5 bg-primary/5 backdrop-blur-md rounded-2xl border border-primary/20 shadow-lg hover:border-primary/50 hover:shadow-xl hover:shadow-primary/20 hover:-translate-y-1 transition-all duration-300">
            <div className="flex items-center justify-between gap-4">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center shadow-inner border border-primary/20 group-hover:shadow-lg group-hover:shadow-primary/30 transition-all">
                    <BookOpen strokeWidth={2} className="h-5 w-5 text-white" />
                  </div>
                  <h4 className="font-bold text-lg text-foreground">Generate Summary</h4>
                </div>
                <p className="text-base text-foreground/70 leading-relaxed pl-13">
                  Get a concise summary of the entire document.
                </p>
              </div>
              <button
                onClick={handleGenerateSummary}
                disabled={loadingAction === 'summary'}
                className="shrink-0 h-12 px-6 flex items-center gap-2 bg-gradient-to-r from-primary to-secondary hover:from-secondary hover:to-primary text-white font-bold rounded-xl transition-all duration-300 shadow-lg shadow-primary/30 hover:shadow-xl hover:shadow-primary/40 hover:-translate-y-0.5 disabled:opacity-60 disabled:cursor-not-allowed active:scale-95"
              >
                {loadingAction === 'summary' ? (
                  <>
                    <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    <span>Processing</span>
                  </>
                ) : (
                  'Summarize'
                )}
              </button>
            </div>
          </div>

          {/* Explain concept */}
          <div className="group p-5 bg-primary/5 backdrop-blur-md rounded-2xl border border-primary/20 shadow-lg hover:border-accent/50 hover:shadow-xl hover:shadow-accent/20 hover:-translate-y-1 transition-all duration-300">
            <div className="flex flex-col gap-4">
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-accent to-amber-600 flex items-center justify-center shadow-inner border border-accent/20 group-hover:shadow-lg group-hover:shadow-accent/30 transition-all">
                    <Lightbulb strokeWidth={2} className="h-5 w-5 text-white" />
                  </div>
                  <h4 className="font-bold text-lg text-foreground">Explain a Concept</h4>
                </div>
                <p className="text-base text-foreground/70 leading-relaxed mb-4 pl-13">
                  Enter a topic from the document to get a detailed explanation.
                </p>
                <div className="flex items-center gap-3 pl-13">
                  <input
                    type="text"
                    value={concept}
                    onChange={(e) => setConcept(e.target.value)}
                    placeholder="e.g. React Hooks"
                    className="flex-1 h-12 px-5 py-2 border border-primary/30 rounded-xl bg-primary/5 text-foreground placeholder-foreground/40 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/50 transition-all duration-300"
                    disabled={loadingAction === 'explain'}
                  />
                  <button
                    onClick={handleExplainConcept}
                    disabled={loadingAction === 'explain' || !concept.trim()}
                    className="shrink-0 h-12 px-6 flex items-center gap-2 bg-gradient-to-r from-accent to-amber-600 hover:from-amber-600 hover:to-accent text-white font-bold rounded-xl transition-all duration-300 shadow-lg shadow-accent/30 hover:shadow-xl hover:shadow-accent/40 hover:-translate-y-0.5 disabled:opacity-60 disabled:cursor-not-allowed active:scale-95"
                  >
                    {loadingAction === 'explain' ? (
                      <>
                        <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        <span>Processing</span>
                      </>
                    ) : (
                      'Explain'
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Result Modal */}
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title={modalTitle}>
        <div className="max-h-[70vh] overflow-y-auto max-w-[70wh] prose prose-sm">
          <MarkdownRenderer content={modalContent} />
        </div>
      </Modal>
    </>
  );
};

export default AIActions;
