import { useState } from 'react';
import { ThemeProvider, useTheme, BackgroundGradient, GlowingCard, MovingBorderButton, TextGenerateEffect } from '@project-v-redone/ui';
import { IconSun, IconMoon, IconLock } from '@tabler/icons-react';
import { motion } from 'framer-motion';

function SignInPage({ onBack, onSignIn }: { onBack: () => void; onSignIn: () => void }) {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSignIn();
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <GlowingCard className="w-full max-w-md">
          <div className="text-center mb-8">
            <div className="w-20 h-20 bg-primary/20 backdrop-blur-sm rounded-2xl flex items-center justify-center mx-auto mb-4">
              <IconLock className="text-primary" size={40} stroke={1.5} />
            </div>
            <h2 className="text-4xl font-bold text-white mb-2">Admin Sign In</h2>
            <p className="text-white/60">Enter your credentials to access the admin panel</p>
          </div>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label className="text-sm font-medium text-white/90">Email</label>
              <input
                type="email"
                placeholder="admin@lankavacations.com"
                required
                className="w-full h-12 px-4 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10 text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-primary transition-all"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-white/90">Password</label>
              <input
                type="password"
                placeholder="Enter your password"
                required
                className="w-full h-12 px-4 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10 text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-primary transition-all"
              />
            </div>
            <div className="space-y-3 pt-4">
              <MovingBorderButton
                type="submit"
                containerClassName="w-full"
                className="w-full bg-primary-dark/80"
              >
                Sign In
              </MovingBorderButton>
              <button
                type="button"
                onClick={onBack}
                className="w-full h-12 rounded-xl text-white/70 hover:text-white hover:bg-white/5 transition-all"
              >
                Back to Home
              </button>
            </div>
          </form>
        </GlowingCard>
      </motion.div>
    </div>
  );
}

function HomePage({ onSignIn }: { onSignIn: () => void }) {
  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="text-center space-y-12 max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-7xl md:text-8xl font-bold text-white mb-4">Lanka Vacation</h1>
          <TextGenerateEffect
            words="Admin Center"
            className="text-6xl md:text-7xl text-primary"
          />
        </motion.div>
        
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="text-2xl text-white/70"
        >
          Manage destinations, packages, and bookings all in one place
        </motion.p>
        
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1, duration: 0.5 }}
        >
          <BackgroundGradient>
            <MovingBorderButton
              onClick={onSignIn}
              containerClassName="h-16"
              className="bg-primary-darkest/90 text-lg px-12"
            >
              Sign In to Dashboard
            </MovingBorderButton>
          </BackgroundGradient>
        </motion.div>
      </div>
    </div>
  );
}

function ThemeToggleButton() {
  const { theme, toggleTheme } = useTheme();
  return (
    <button
      onClick={toggleTheme}
      className="p-3 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 transition-all"
    >
      {theme === 'dark' ? <IconSun size={20} /> : <IconMoon size={20} />}
    </button>
  );
}

function AppContent() {
  const [page, setPage] = useState<'home' | 'signin'>('home');
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleSignIn = () => {
    setIsAuthenticated(true);
    setPage('home');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-darkest via-primary-dark to-primary-muted">
      <header className="fixed top-0 left-0 right-0 z-50 bg-primary-darkest/50 backdrop-blur-xl border-b border-white/5">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-gradient-to-br from-primary to-primary-light rounded-xl flex items-center justify-center shadow-lg">
              <span className="text-white font-bold text-xl">LV</span>
            </div>
            <span className="text-2xl font-bold text-white">Lanka Vacations</span>
          </div>
          <div className="flex items-center gap-3">
            <ThemeToggleButton />
            {!isAuthenticated && page === 'home' && (
              <button
                onClick={() => setPage('signin')}
                className="px-6 py-2 rounded-xl bg-primary/20 backdrop-blur-sm border border-primary/30 text-white hover:bg-primary/30 transition-all"
              >
                Sign In
              </button>
            )}
          </div>
        </div>
      </header>
      <div className="pt-24">
        {page === 'home' && <HomePage onSignIn={() => setPage('signin')} />}
        {page === 'signin' && <SignInPage onBack={() => setPage('home')} onSignIn={handleSignIn} />}
      </div>
    </div>
  );
}

function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}

export default App;
