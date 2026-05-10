import { useState } from 'react';
import { useLocation } from 'wouter';
import { Plane, Eye, EyeOff, Mail, Lock, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useAuth } from '@/contexts/AuthContext';

export default function Login() {
  const [, setLocation] = useLocation();
  const { login, signup, loginWithGoogle } = useAuth();
  const [mode, setMode] = useState<'login' | 'signup'>('login');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPw, setShowPw] = useState(false);
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [error, setError] = useState('');

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    setLoading(true);
    const result = mode === 'login'
      ? await login(email, password)
      : await signup(name, email, password);
    setLoading(false);
    if (result.success) {
      setLocation('/dashboard');
    } else {
      setError(result.error || 'Something went wrong.');
    }
  }

  async function handleGoogle() {
    setError('');
    setGoogleLoading(true);
    const result = await loginWithGoogle();
    setGoogleLoading(false);
    if (result.success) {
      setLocation('/dashboard');
    } else {
      setError(result.error || 'Google sign-in failed.');
    }
  }

  return (
    <div className="min-h-screen gradient-hero flex items-center justify-center p-4 relative overflow-hidden">
      {/* Decorative orbs */}
      <div className="absolute top-20 left-10 w-64 h-64 rounded-full bg-purple-500/20 blur-3xl float-animation" />
      <div className="absolute bottom-20 right-10 w-96 h-96 rounded-full bg-indigo-500/20 blur-3xl float-animation-delay" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-violet-600/10 blur-3xl" />

      <div className="w-full max-w-md relative z-10 fade-in-up">
        {/* Logo */}
        <div className="text-center mb-8">
          <div
            className="inline-flex items-center gap-2 cursor-pointer"
            onClick={() => setLocation('/')}
            data-testid="link-logo"
          >
            <Plane className="h-8 w-8 text-violet-300" />
            <span className="text-3xl font-bold gradient-text">VoyageCraft</span>
          </div>
          <p className="text-white/60 mt-2 text-sm">Your AI travel companion</p>
        </div>

        <div className="glass rounded-3xl p-8 shadow-2xl border border-white/20">
          {/* Tabs */}
          <div className="flex rounded-2xl bg-white/10 p-1 mb-8">
            <button
              onClick={() => { setMode('login'); setError(''); }}
              className={`flex-1 py-2.5 rounded-xl text-sm font-semibold transition-all ${mode === 'login' ? 'bg-white text-purple-900' : 'text-white/70 hover:text-white'}`}
              data-testid="tab-login"
            >
              Sign In
            </button>
            <button
              onClick={() => { setMode('signup'); setError(''); }}
              className={`flex-1 py-2.5 rounded-xl text-sm font-semibold transition-all ${mode === 'signup' ? 'bg-white text-purple-900' : 'text-white/70 hover:text-white'}`}
              data-testid="tab-signup"
            >
              Create Account
            </button>
          </div>

          {/* Google Button */}
          <button
            onClick={handleGoogle}
            disabled={googleLoading}
            className="w-full flex items-center justify-center gap-3 bg-white hover:bg-gray-50 text-gray-800 font-semibold py-3 px-4 rounded-xl mb-6 transition-all hover:shadow-lg disabled:opacity-60"
            data-testid="button-google-login"
          >
            {googleLoading ? (
              <div className="w-5 h-5 border-2 border-gray-400 border-t-transparent rounded-full animate-spin" />
            ) : (
              <svg width="20" height="20" viewBox="0 0 48 48">
                <path fill="#4285F4" d="M44.5 20H24v8.5h11.8C34.7 33.9 29.1 37 24 37c-7.2 0-13-5.8-13-13s5.8-13 13-13c3.1 0 5.9 1.1 8.1 2.9l6.4-6.4C34.6 4.1 29.6 2 24 2 11.8 2 2 11.8 2 24s9.8 22 22 22c11 0 21-8 21-22 0-1.3-.2-2.7-.5-4z"/>
                <path fill="#34A853" d="M6.3 14.7l7 5.1C15.1 16.1 19.2 13 24 13c3.1 0 5.9 1.1 8.1 2.9l6.4-6.4C34.6 4.1 29.6 2 24 2c-7.7 0-14.4 4.4-17.7 10.7z" opacity=".5"/>
              </svg>
            )}
            {googleLoading ? 'Signing in with Google...' : 'Continue with Google'}
          </button>

          <div className="flex items-center gap-3 mb-6">
            <div className="flex-1 h-px bg-white/20" />
            <span className="text-white/40 text-xs">or continue with email</span>
            <div className="flex-1 h-px bg-white/20" />
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {mode === 'signup' && (
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-white/40" />
                <Input
                  value={name}
                  onChange={e => setName(e.target.value)}
                  placeholder="Full name"
                  className="pl-11 bg-white/10 border-white/20 text-white placeholder:text-white/40 focus:border-violet-400 h-12"
                  data-testid="input-name"
                />
              </div>
            )}
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-white/40" />
              <Input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="Email address"
                className="pl-11 bg-white/10 border-white/20 text-white placeholder:text-white/40 focus:border-violet-400 h-12"
                data-testid="input-email"
              />
            </div>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-white/40" />
              <Input
                type={showPw ? 'text' : 'password'}
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="Password"
                className="pl-11 pr-11 bg-white/10 border-white/20 text-white placeholder:text-white/40 focus:border-violet-400 h-12"
                data-testid="input-password"
              />
              <button
                type="button"
                onClick={() => setShowPw(!showPw)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-white/40 hover:text-white"
                data-testid="button-toggle-password"
              >
                {showPw ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>

            {error && (
              <div className="bg-red-500/20 border border-red-500/30 rounded-xl px-4 py-3 text-red-300 text-sm" data-testid="text-error">
                {error}
              </div>
            )}

            <Button
              type="submit"
              disabled={loading || !email || !password}
              className="w-full h-12 gradient-purple glow-button text-white border-0 font-semibold text-base"
              data-testid="button-submit-auth"
            >
              {loading ? (
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                  {mode === 'login' ? 'Signing in...' : 'Creating account...'}
                </div>
              ) : (
                mode === 'login' ? 'Sign In' : 'Create Account'
              )}
            </Button>
          </form>

          {mode === 'login' && (
            <p className="text-center text-white/40 text-xs mt-4">
              Demo: Create an account then sign in, or use Google
            </p>
          )}
        </div>

        <p className="text-center text-white/40 text-sm mt-6">
          By continuing, you agree to VoyageCraft's Terms of Service and Privacy Policy
        </p>
      </div>
    </div>
  );
}
