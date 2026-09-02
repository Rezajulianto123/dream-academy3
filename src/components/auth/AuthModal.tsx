import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { api } from '../../services/api';
import { UserProfile } from '../../types';
import { X, Sparkles, User, ShieldCheck, Mail, Lock, ArrowRight } from 'lucide-react';

export const AuthModal: React.FC = () => {
  const {
    authModalOpen,
    setAuthModalOpen,
    setCurrentUser,
    setCurrentView,
    loginAs,
    activeAssessmentResult,
  } = useApp();

  const [mode, setMode] = useState<'register' | 'login'>('register');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!authModalOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const userPayload: Partial<UserProfile> = {
        name: name || (email.split('@')[0] || 'Student'),
        email: email.trim().toLowerCase(),
        role: 'student',
        onboardingCompleted: false,
        learningStreak: 1,
        progressPercent: 0,
        completedLessonIds: [],
        completedQuizIds: [],
        speakingSessionsCount: 0,
        isPaidMember: false,
      };

      if (activeAssessmentResult) {
        userPayload.estimatedLevel = activeAssessmentResult.estimatedLevel;
        userPayload.scores = activeAssessmentResult.scores;
        userPayload.strengths = activeAssessmentResult.strengths;
        userPayload.weaknesses = activeAssessmentResult.weaknesses;
        userPayload.currentFocus = activeAssessmentResult.primaryFocus;
        userPayload.recommendedPath = activeAssessmentResult.recommendedPath;
      }

      const res = await api.saveUser(userPayload);
      if (res.user) {
        setCurrentUser(res.user);
        setAuthModalOpen(false);
        if (!res.user.onboardingCompleted) {
          setCurrentView('onboarding');
        } else {
          setCurrentView('dashboard');
        }
      }
    } catch (err: any) {
      setError(err.message || 'Gagal menyimpan profil akun.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/70 backdrop-blur-xs">
      <div className="bg-white rounded-[32px] max-w-md w-full p-6 sm:p-8 border-2 border-[#1A1A1A] shadow-[10px_10px_0px_0px_#1A1A1A] relative">
        <button
          onClick={() => setAuthModalOpen(false)}
          className="absolute top-5 right-5 text-[#1A1A1A] hover:text-[#FF5733] p-1 rounded-lg border-2 border-[#1A1A1A] bg-[#F3F3F1] cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="text-center mb-6">
          <div className="w-12 h-12 bg-[#FFF0EB] border-2 border-[#FF5733] text-[#FF5733] rounded-2xl flex items-center justify-center mx-auto mb-3 shadow-[3px_3px_0px_0px_#FF5733]">
            <Sparkles className="w-6 h-6" />
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-[#1A1A1A] tracking-tight">
            {mode === 'register' ? 'Mulai Perjalanan English' : 'Masuk ke Dream Academy'}
          </h2>
          <p className="text-xs text-[#4A4A4A] font-semibold mt-1">
            Simpan hasil diagnostik dan mulai latihan harian dengan AI Coach.
          </p>
        </div>

        {/* Quick Demo Login Option */}
        <div className="bg-[#F3F3F1] border-2 border-[#1A1A1A] rounded-2xl p-4 mb-5 text-left shadow-[3px_3px_0px_0px_#1A1A1A]">
          <span className="text-[10px] font-black uppercase tracking-widest text-[#4A4A4A] block mb-2">
            Akses Cepat (Demo Preview)
          </span>
          <div className="grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={() => {
                loginAs('student');
                setAuthModalOpen(false);
              }}
              className="px-3 py-2 bg-[#FFF0EB] hover:bg-[#FFE2D9] border-2 border-[#FF5733] text-[#FF5733] rounded-xl text-xs font-black uppercase tracking-wider flex items-center justify-center space-x-1.5 transition-colors cursor-pointer"
            >
              <User className="w-3.5 h-3.5" />
              <span>Siswa (A2)</span>
            </button>
            <button
              type="button"
              onClick={() => {
                loginAs('admin');
                setAuthModalOpen(false);
              }}
              className="px-3 py-2 bg-white hover:bg-[#FDFCFB] border-2 border-[#1A1A1A] text-[#1A1A1A] rounded-xl text-xs font-black uppercase tracking-wider flex items-center justify-center space-x-1.5 transition-colors cursor-pointer"
            >
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Admin Demo</span>
            </button>
          </div>
        </div>

        <div className="flex items-center justify-center space-x-6 border-b-2 border-[#1A1A1A]/10 pb-3 mb-4 text-xs font-black uppercase tracking-wider">
          <button
            type="button"
            onClick={() => setMode('register')}
            className={`pb-1 transition-colors cursor-pointer ${
              mode === 'register' ? 'text-[#FF5733] border-b-2 border-[#FF5733]' : 'text-stone-400'
            }`}
          >
            Daftar Akun Baru
          </button>
          <button
            type="button"
            onClick={() => setMode('login')}
            className={`pb-1 transition-colors cursor-pointer ${
              mode === 'login' ? 'text-[#FF5733] border-b-2 border-[#FF5733]' : 'text-stone-400'
            }`}
          >
            Masuk Akun
          </button>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-red-100 border-2 border-red-500 text-red-900 text-xs font-bold rounded-xl">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {mode === 'register' && (
            <div>
              <label className="block text-xs font-black uppercase tracking-wider text-[#1A1A1A] mb-1">
                Nama Lengkap
              </label>
              <input
                type="text"
                required
                placeholder="Contoh: Sarah Andini"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border-2 border-[#1A1A1A] text-xs sm:text-sm font-semibold text-[#1A1A1A] focus:outline-none focus:border-[#FF5733]"
              />
            </div>
          )}

          <div>
            <label className="block text-xs font-black uppercase tracking-wider text-[#1A1A1A] mb-1">
              Email
            </label>
            <input
              type="email"
              required
              placeholder="nama@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl border-2 border-[#1A1A1A] text-xs sm:text-sm font-semibold text-[#1A1A1A] focus:outline-none focus:border-[#FF5733]"
            />
          </div>

          <div>
            <label className="block text-xs font-black uppercase tracking-wider text-[#1A1A1A] mb-1">
              Kata Sandi
            </label>
            <input
              type="password"
              required
              placeholder="Minimal 6 karakter"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl border-2 border-[#1A1A1A] text-xs sm:text-sm font-semibold text-[#1A1A1A] focus:outline-none focus:border-[#FF5733]"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 rounded-xl bg-[#FF5733] hover:bg-[#E84826] text-white text-xs font-black uppercase tracking-wider transition-all cursor-pointer flex items-center justify-center space-x-2 border-2 border-[#1A1A1A] shadow-[4px_4px_0px_0px_#1A1A1A] hover:translate-x-0.5 hover:translate-y-0.5 mt-2"
          >
            <span>{loading ? 'Memproses...' : mode === 'register' ? 'Daftar & Masuk' : 'Masuk Akun'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>
      </div>
    </div>
  );
};
