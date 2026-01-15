import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import authService from '../../services/auth.service.js';
import toast from 'react-hot-toast';
import { Brain, Mail, Lock, Eye, EyeOff, User } from 'lucide-react';

const Register = ({ title = 'Briefly.' }) => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast.error('Please make sure your passwords match.');
      return;
    }

    if (password.length < 6) {
      toast.error('Password must be at least 6 characters long.');
      return;
    }

    setIsLoading(true);

    try {
      const result = await authService.register(username, email, password);
      const { token, user } = result.data;
      login(user, token);

      toast.success(`Welcome to ${title}. Let\'s start learning!`);
      navigate('/dashboard');
    } catch (error) {
      toast.error(error.error || 'Failed to register user. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="min-h-screen flex">
      {/* Left Side */}
      <section className="hidden lg:flex lg:w-1/2 xl:w-[55%] bg-background relative overflow-hidden">
        <div className="absolute inset-0 opacity-40">
          <div className="absolute top-20 left-20 w-72 h-72 rounded-full bg-primary/40 blur-[80px] animate-float" />
          <div className="absolute bottom-40 right-20 w-96 h-96 rounded-full bg-secondary/30 blur-[100px] animate-float-delayed" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-accent/20 blur-[120px] animate-pulse-glow" />
        </div>

        <div className="relative z-10 flex flex-col justify-center px-12 xl:px-20 h-full w-full glass-panel border-r border-border">
          <div className="max-w-lg">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary to-accent flex items-center justify-center shadow-[0_0_30px_rgba(124,58,237,0.5)]">
                <Brain className="w-7 h-7 text-white" />
              </div>
              <span className="text-3xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-primary via-light to-accent">{title}</span>
            </div>

            <h2 className="text-4xl xl:text-6xl font-extrabold text-foreground mb-6 leading-tight tracking-tight">
              Read less.
              <br />
              <span className="text-light">Understand more.</span>
            </h2>
            <p className="text-lg text-foreground/80 leading-relaxed font-medium">
              Transform how you consume information. Join Briefly to instantly summarize, analyze, and chat with your documents using advanced AI.
            </p>
          </div>
        </div>
      </section>

      {/* Right Side - Register Form */}
      <section className="w-full lg:w-1/2 xl:w-[45%] flex items-center justify-center p-6 sm:p-8 lg:p-12">
        <div className="w-full max-w-md">
          <div className="lg:hidden flex items-center gap-3 mb-8 justify-center">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center">
              <Brain className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold text-foreground">{title}</span>
          </div>

          <div className="text-center mb-8">
            <h1 className="text-2xl sm:text-3xl font-bold text-foreground mb-2">
              Create your account
            </h1>
            <p className="text-foreground/70">Fill in your details to get started</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="name" className="text-light text-sm font-medium">
                User Name
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-primary" />
                <input
                  id="name"
                  type="text"
                  placeholder="johndoe123"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="pl-10 bg-primary/5 text-foreground border border-primary/30 w-full px-4 py-3 mt-1 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 rounded-xl transition-all"
                  required
                />
              </div>
            </div>

            <div>
              <label htmlFor="email" className="text-light text-sm font-medium">
                Email
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-primary" />
                <input
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-10 bg-primary/5 text-foreground border border-primary/30 w-full px-4 py-3 mt-1 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 rounded-xl transition-all"
                  required
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="text-light text-sm font-medium">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-primary" />
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-10 bg-primary/5 text-foreground border border-primary/30 w-full px-4 py-3 mt-1 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 rounded-xl transition-all"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-primary/70 hover:text-primary transition-colors"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            <div>
              <label htmlFor="confirmPassword" className="text-light text-sm font-medium">
                Confirm Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-primary" />
                <input
                  id="confirmPassword"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="••••••••"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="pl-10 bg-primary/5 text-foreground border border-primary/30 w-full px-4 py-3 mt-1 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 rounded-xl transition-all"
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-primary to-secondary hover:from-secondary hover:to-primary text-white font-bold h-12 rounded-xl shadow-lg shadow-primary/30 hover:shadow-xl hover:shadow-primary/40 transition-all duration-300 hover:-translate-y-0.5 active:scale-95"
              disabled={isLoading}
            >
              {isLoading ? 'Creating account...' : 'Create account'}
            </button>
          </form>

          <p className="mt-6 text-center text-foreground/70">
            Already have an account?{' '}
            <Link
              to="/login"
              className="text-primary hover:text-primary/80 font-medium transition-colors"
            >
              Sign in
            </Link>
          </p>
        </div>
      </section>
    </main>
  );
};

export default Register;
