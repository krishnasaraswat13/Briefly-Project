import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext.jsx';
import { useTheme } from '../../context/ThemeContext.jsx';
import {
  ArrowRight,
  BookOpenCheck,
  Brain,
  FileUp,
  Gauge,
  LockKeyhole,
  MessageSquareText,
  Moon,
  Sparkles,
  Sun,
} from 'lucide-react';

const featureItems = [
  {
    title: 'Document-Grounded Answers',
    description:
      'Every response is tied to your uploaded content so your learning stays accurate, relevant, and verifiable.',
    icon: BookOpenCheck,
  },
  {
    title: 'Instant Summaries and Notes',
    description:
      'Convert long PDFs into concise study notes so you revise quickly without losing key ideas.',
    icon: Sparkles,
  },
  {
    title: 'Auto Quizzes and Flashcards',
    description:
      'Generate practice material in seconds and reinforce concepts with active recall.',
    icon: Brain,
  },
  {
    title: 'Secure Personal Workspace',
    description:
      'JWT-based authentication and user-isolated storage keep every document private to your account.',
    icon: LockKeyhole,
  },
];

const flowItems = [
  {
    title: 'Upload your PDF',
    description: 'Drop a document and let Briefly extract and process the content.',
    icon: FileUp,
  },
  {
    title: 'Generate smart outputs',
    description: 'Create summaries, flashcards, quizzes, and explanations from your material.',
    icon: Gauge,
  },
  {
    title: 'Ask focused questions',
    description: 'Chat with your document and get context-aware answers built from relevant chunks.',
    icon: MessageSquareText,
  },
];

const LandingPage = () => {
  const { isAuthenticated } = useAuth();
  const { theme, toggleTheme } = useTheme();

  return (
    <main className="relative min-h-screen overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-[38rem] h-[38rem] rounded-full bg-primary/25 blur-[130px]" />
        <div className="absolute top-[28rem] -left-20 w-[28rem] h-[28rem] rounded-full bg-secondary/20 blur-[110px]" />
        <div className="absolute top-40 -right-20 w-[26rem] h-[26rem] rounded-full bg-accent/20 blur-[120px]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-8 sm:py-10">
        <header className="glass-panel rounded-2xl border border-primary/20 px-4 sm:px-6 py-4 flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-accent shadow-[0_0_25px_rgba(124,58,237,0.35)] flex items-center justify-center">
              <Brain className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl sm:text-2xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-primary via-light to-accent">
              Briefly.
            </span>
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            <button
              onClick={toggleTheme}
              className="inline-flex items-center justify-center w-10 h-10 rounded-xl border border-primary/30 bg-primary/10 hover:bg-primary/20 transition-colors"
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? (
                <Moon className="w-5 h-5 text-primary" />
              ) : (
                <Sun className="w-5 h-5 text-accent" />
              )}
            </button>

            {isAuthenticated ? (
              <Link
                to="/dashboard"
                className="inline-flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm sm:text-base font-semibold text-white bg-gradient-to-r from-primary to-secondary hover:from-secondary hover:to-primary transition-all"
              >
                Dashboard
                <ArrowRight className="w-4 h-4" />
              </Link>
            ) : (
              <>
                <Link
                  to="/login"
                  className="hidden sm:inline-flex rounded-xl px-4 py-2.5 text-sm font-semibold border border-primary/35 bg-primary/10 hover:bg-primary/20 transition-colors"
                >
                  Log in
                </Link>
                <Link
                  to="/register"
                  className="inline-flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm sm:text-base font-semibold text-white bg-gradient-to-r from-primary to-secondary hover:from-secondary hover:to-primary transition-all"
                >
                  Sign up
                </Link>
              </>
            )}
          </div>
        </header>

        <section className="mt-12 sm:mt-16 lg:mt-20 grid lg:grid-cols-12 gap-8 lg:gap-10 items-center">
          <div className="lg:col-span-7">
            <p className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-primary/30 bg-primary/10 text-sm font-semibold text-light">
              AI Learning Workspace
            </p>
            <h1 className="mt-5 text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight tracking-tight">
              Turn static documents into interactive learning.
            </h1>
            <p className="mt-5 text-base sm:text-lg text-foreground/80 max-w-2xl leading-relaxed">
              Briefly transforms PDFs into summaries, quizzes, flashcards, and explainers so you
              spend less time reading and more time understanding.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              {isAuthenticated ? (
                <Link
                  to="/dashboard"
                  className="inline-flex items-center gap-2 rounded-xl px-5 py-3 text-sm sm:text-base font-bold text-white bg-gradient-to-r from-primary to-secondary hover:from-secondary hover:to-primary transition-all shadow-lg shadow-primary/30"
                >
                  Go to dashboard
                  <ArrowRight className="w-4 h-4" />
                </Link>
              ) : (
                <>
                  <Link
                    to="/register"
                    className="inline-flex items-center gap-2 rounded-xl px-5 py-3 text-sm sm:text-base font-bold text-white bg-gradient-to-r from-primary to-secondary hover:from-secondary hover:to-primary transition-all shadow-lg shadow-primary/30"
                  >
                    Start for free
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                  <Link
                    to="/login"
                    className="inline-flex items-center justify-center rounded-xl px-5 py-3 text-sm sm:text-base font-semibold border border-primary/35 bg-primary/10 hover:bg-primary/20 transition-colors"
                  >
                    I already have an account
                  </Link>
                </>
              )}
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className="glass-panel rounded-3xl border border-primary/20 p-6 sm:p-7">
              <h2 className="text-xl sm:text-2xl font-bold">What you can do in Briefly</h2>
              <ul className="mt-5 space-y-3">
                <li className="flex items-start gap-3">
                  <span className="mt-1 w-2.5 h-2.5 rounded-full bg-primary" />
                  <span className="text-foreground/80">Upload and process PDF study material.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-1 w-2.5 h-2.5 rounded-full bg-secondary" />
                  <span className="text-foreground/80">Get concise summaries for quick revision.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-1 w-2.5 h-2.5 rounded-full bg-accent" />
                  <span className="text-foreground/80">
                    Practice with quizzes and flashcards generated from the same source.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-1 w-2.5 h-2.5 rounded-full bg-primary" />
                  <span className="text-foreground/80">
                    Ask questions and get answers grounded in your document.
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        <section className="mt-16 sm:mt-20">
          <div className="grid sm:grid-cols-2 xl:grid-cols-4 gap-4 sm:gap-5">
            {featureItems.map((item) => (
              <article
                key={item.title}
                className="glass-panel rounded-2xl border border-primary/15 p-5 hover:border-primary/35 transition-colors"
              >
                <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center shadow-md shadow-primary/25">
                  <item.icon className="w-5 h-5 text-white" />
                </div>
                <h3 className="mt-4 text-lg font-bold">{item.title}</h3>
                <p className="mt-2 text-sm text-foreground/75 leading-relaxed">{item.description}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="mt-16 sm:mt-20">
          <h2 className="text-2xl sm:text-3xl font-bold">How it works</h2>
          <div className="mt-6 grid md:grid-cols-3 gap-4 sm:gap-5">
            {flowItems.map((item, index) => (
              <article
                key={item.title}
                className="relative glass-panel rounded-2xl border border-primary/15 p-5"
              >
                <span className="absolute top-4 right-4 text-xs font-bold text-foreground/40">
                  0{index + 1}
                </span>
                <div className="w-10 h-10 rounded-lg bg-primary/20 border border-primary/30 flex items-center justify-center">
                  <item.icon className="w-5 h-5 text-primary" />
                </div>
                <h3 className="mt-4 text-lg font-bold">{item.title}</h3>
                <p className="mt-2 text-sm text-foreground/75">{item.description}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="mt-16 sm:mt-20 pb-10">
          <div className="glass-panel rounded-3xl border border-primary/25 p-7 sm:p-10 text-center">
            <h2 className="text-2xl sm:text-4xl font-extrabold">
              Ready to make learning faster and smarter?
            </h2>
            <p className="mt-3 text-foreground/75 max-w-2xl mx-auto">
              Create your account, upload your first document, and jump straight into your personal
              AI study dashboard.
            </p>
            <div className="mt-7 flex flex-wrap justify-center gap-3">
              {isAuthenticated ? (
                <Link
                  to="/dashboard"
                  className="inline-flex items-center gap-2 rounded-xl px-5 py-3 font-bold text-white bg-gradient-to-r from-primary to-secondary hover:from-secondary hover:to-primary transition-all"
                >
                  Open dashboard
                  <ArrowRight className="w-4 h-4" />
                </Link>
              ) : (
                <>
                  <Link
                    to="/register"
                    className="inline-flex items-center gap-2 rounded-xl px-5 py-3 font-bold text-white bg-gradient-to-r from-primary to-secondary hover:from-secondary hover:to-primary transition-all"
                  >
                    Sign up now
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                  <Link
                    to="/login"
                    className="inline-flex items-center justify-center rounded-xl px-5 py-3 font-semibold border border-primary/35 bg-primary/10 hover:bg-primary/20 transition-colors"
                  >
                    Log in
                  </Link>
                </>
              )}
            </div>
          </div>
        </section>
      </div>
    </main>
  );
};

export default LandingPage;
