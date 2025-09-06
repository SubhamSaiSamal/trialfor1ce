import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { X, Eye, EyeOff, Loader } from 'lucide-react';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

type AuthMode = 'login' | 'register' | 'braille_code' | 'forgot';

export default function AuthModal({ isOpen, onClose }: AuthModalProps) {
  const { login, loginWithBrailleCode, register } = useAuth();
  const [mode, setMode] = useState<AuthMode>('login');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    fullName: '',
    brailleCode: ''
  });

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      let success = false;

      switch (mode) {
        case 'login':
          success = await login({
            email: formData.email,
            password: formData.password
          });
          if (!success) {
            setError('Invalid email or password. Try: demo@braille.com / demo123');
          }
          break;

        case 'braille_code':
          success = await loginWithBrailleCode(formData.brailleCode);
          if (!success) {
            setError('Invalid Braille code. Try: ABC123XY');
          }
          break;

        case 'register':
          if (formData.password !== formData.confirmPassword) {
            setError('Passwords do not match');
            setLoading(false);
            return;
          }
          success = await register(formData);
          if (success) {
            setMode('login');
            setError('');
          }
          break;
      }

      if (success && mode !== 'register') {
        onClose();
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const renderLoginForm = () => (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
          Email Address
        </label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleInputChange}
          className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 dark:bg-slate-700 dark:text-white"
          placeholder="Enter your email"
          required
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
          Password
        </label>
        <div className="relative">
          <input
            type={showPassword ? 'text' : 'password'}
            name="password"
            value={formData.password}
            onChange={handleInputChange}
            className="w-full px-3 py-2 pr-10 border border-slate-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 dark:bg-slate-700 dark:text-white"
            placeholder="Enter your password"
            required
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-slate-600"
          >
            {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
          </button>
        </div>
      </div>
    </div>
  );

  const renderBrailleCodeForm = () => (
    <div className="space-y-4">
      <div className="text-center mb-6">
        <p className="text-sm text-slate-600 dark:text-slate-400">
          Enter the unique code from your Braille printer or purchase documentation
        </p>
      </div>
      <div>
        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
          Braille Printer Code
        </label>
        <input
          type="text"
          name="brailleCode"
          value={formData.brailleCode}
          onChange={(e) => {
            const value = e.target.value.toUpperCase().replace(/[^A-Z0-9]/g, '').slice(0, 8);
            setFormData(prev => ({ ...prev, brailleCode: value }));
          }}
          className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 dark:bg-slate-700 dark:text-white text-center text-lg font-mono"
          placeholder="ABC123XY"
          maxLength={8}
          required
        />
        <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
          8-character alphanumeric code
        </p>
      </div>
    </div>
  );

  const renderRegisterForm = () => (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
          Full Name
        </label>
        <input
          type="text"
          name="fullName"
          value={formData.fullName}
          onChange={handleInputChange}
          className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 dark:bg-slate-700 dark:text-white"
          placeholder="Enter your full name"
          required
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
          Email Address
        </label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleInputChange}
          className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 dark:bg-slate-700 dark:text-white"
          placeholder="Enter your email"
          required
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
          Password
        </label>
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleInputChange}
          className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 dark:bg-slate-700 dark:text-white"
          placeholder="Create a password"
          required
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
          Confirm Password
        </label>
        <input
          type="password"
          name="confirmPassword"
          value={formData.confirmPassword}
          onChange={handleInputChange}
          className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 dark:bg-slate-700 dark:text-white"
          placeholder="Confirm your password"
          required
        />
      </div>
    </div>
  );

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-slate-800 rounded-xl shadow-xl w-full max-w-md">
        <div className="flex items-center justify-between p-6 border-b border-slate-200 dark:border-slate-700">
          <h2 className="text-xl font-bold text-slate-900 dark:text-white">
            {mode === 'login' && 'Sign In'}
            {mode === 'register' && 'Create Account'}
            {mode === 'braille_code' && 'Braille Authentication'}
            {mode === 'forgot' && 'Reset Password'}
          </h2>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-300"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {mode === 'login' && renderLoginForm()}
          {mode === 'braille_code' && renderBrailleCodeForm()}
          {mode === 'register' && renderRegisterForm()}

          {error && (
            <div className="p-3 bg-red-100 dark:bg-red-900/30 border border-red-200 dark:border-red-800 rounded-lg">
              <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full flex items-center justify-center px-4 py-2 bg-emerald-600 hover:bg-emerald-700 disabled:bg-emerald-400 text-white font-medium rounded-lg transition-colors"
          >
            {loading ? (
              <Loader className="w-4 h-4 animate-spin mr-2" />
            ) : null}
            {mode === 'login' && 'Sign In'}
            {mode === 'register' && 'Create Account'}
            {mode === 'braille_code' && 'Authenticate'}
            {mode === 'forgot' && 'Send Reset Link'}
          </button>

          <div className="space-y-3">
            {mode !== 'braille_code' && (
              <button
                type="button"
                onClick={() => setMode('braille_code')}
                className="w-full px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors"
              >
                Use Braille Printer Code
              </button>
            )}

            <div className="flex items-center justify-center space-x-4 text-sm">
              {mode === 'login' && (
                <>
                  <button
                    type="button"
                    onClick={() => setMode('register')}
                    className="text-emerald-600 hover:text-emerald-700 dark:text-emerald-400 font-medium"
                  >
                    Create Account
                  </button>
                  <span className="text-slate-400">•</span>
                  <button
                    type="button"
                    onClick={() => setMode('forgot')}
                    className="text-slate-600 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-200"
                  >
                    Forgot Password?
                  </button>
                </>
              )}
              
              {(mode === 'register' || mode === 'braille_code' || mode === 'forgot') && (
                <button
                  type="button"
                  onClick={() => setMode('login')}
                  className="text-emerald-600 hover:text-emerald-700 dark:text-emerald-400 font-medium"
                >
                  ← Back to Sign In
                </button>
              )}
            </div>
          </div>
        </form>

        {mode === 'login' && (
          <div className="px-6 pb-6">
            <div className="bg-slate-50 dark:bg-slate-700 rounded-lg p-4">
              <p className="text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Demo Credentials:</p>
              <p className="text-xs text-slate-600 dark:text-slate-400">
                Email: demo@braille.com<br />
                Password: demo123<br />
                Braille Code: ABC123XY
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}