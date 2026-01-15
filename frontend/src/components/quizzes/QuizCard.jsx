import React from 'react';
import { Link } from 'react-router-dom';
import { Play, BarChart2, Trash2, Award } from 'lucide-react';
import moment from 'moment';

const QuizCard = ({ quiz, onDelete }) => {
  return (
    <div className="group relative bg-gradient-to-br from-primary/5 to-secondary/5 backdrop-blur-xl border border-primary/20 rounded-2xl p-6 hover:border-primary/50 hover:shadow-xl hover:shadow-primary/20 transition-all duration-200">
      <button
        onClick={(e) => {
          e.stopPropagation();
          onDelete(quiz);
        }}
        className="opacity-0 group-hover:opacity-100 justify-center hover:bg-red-500/80 transition-colors duration-200 rounded-lg absolute top-4 right-4 p-2 text-foreground/70 hover:text-white"
      >
        <Trash2 className="w-5 h-5" strokeWidth={2} />
      </button>

      <div className="space-y-4">
        {/* Status badge */}
        <div className="inline-flex items-center gap-1.5 py-1 rounded-lg text-sm font-semibold">
          <div className="flex items-center gap-1.5 border rounded-lg px-3 py-1 bg-primary/20 border-primary/30">
            <Award className="w-4 h-4 text-primary" strokeWidth={2} />
            <span className="text-light">Score: {quiz?.score}</span>
          </div>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-1 line-clamp-2 text-foreground" title={quiz.title}>
            {quiz.title || `Quiz - ${moment(quiz.createdAt).format('MMM D, YYYY')}`}
          </h3>
          <p className="text-xs font-medium uppercase tracking-wide text-foreground/60">
            Created {moment(quiz.createdAt).format('MMM D, YYYY')}
          </p>
        </div>

        {/* Quiz Info */}
        <div className="flex items-center gap-3 pt-2 border-t border-primary/20">
          <div className="px-3 py-1 border rounded-lg bg-primary/10 border-primary/30">
            <span className="text-base font-semibold text-light">
              {quiz.questions.length} {quiz.questions.length === 1 ? 'Question' : 'Questions'}
            </span>
          </div>
        </div>
      </div>

      {/* Action Button */}
      <div className="mt-2 pt-4 border-t border-primary/20">
        {quiz?.userAnswers?.length > 0 ? (
          <Link to={`/quizzes/${quiz._id}/result`}>
            <button className="group/btn w-full inline-flex items-center justify-center gap-2 h-11 border rounded-xl bg-primary/20 hover:bg-primary/30 border-primary/30 text-light transition-all duration-200">
              <BarChart2 strokeWidth={2} className="w-4 h-4" />
              View Results
            </button>
          </Link>
        ) : (
          <Link to={`/quizzes/${quiz._id}`}>
            <button className="h-11 border rounded-xl bg-gradient-to-r from-primary to-secondary hover:from-secondary hover:to-primary border-transparent transition-all duration-200 w-full">
              <span className="relative z-10 flex items-center justify-center gap-2 text-white font-semibold">
                <Play className="w-4 h-4" strokeWidth={2} />
                Start Quiz
              </span>
            </button>
          </Link>
        )}
      </div>
    </div>
  );
};

export default QuizCard;
