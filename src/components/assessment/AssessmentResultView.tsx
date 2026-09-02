import React from 'react';
import { useApp } from '../../context/AppContext';
import {
  Sparkles,
  TrendingUp,
  Target,
  ArrowRight,
  RotateCcw,
  CheckCircle2,
  AlertCircle,
  Award,
  BookOpen,
  Mic,
  Brain,
} from 'lucide-react';

export const AssessmentResultView: React.FC = () => {
  const {
    activeAssessmentResult,
    setCurrentView,
    currentUser,
    setAuthModalOpen,
    loginAs,
  } = useApp();

  // Fallback demo result if navigated directly
  const result = activeAssessmentResult || {
    id: 'ass-sample',
    estimatedLevel: 'A2',
    levelTitle: 'A2 — Elementary',
    scores: {
      grammar: 72,
      vocabulary: 58,
      reading: 76,
      listening: 64,
      speaking: 41,
      confidence: 35,
    },
    strengths: [
      'Reading comprehension sangat baik dalam memahami konteks email/instruksi tertulis.',
      'Fondasi grammar dasar dan susunan kalimat sudah dipahami.',
    ],
    weaknesses: [
      'Ragu dan sering "blank" saat harus berbicara spontan di depan orang lain.',
      'Perbendaharaan kosakata aktif saat speaking masih terbatas.',
    ],
    primaryFocus: 'Speaking Confidence',
    recommendedPath: '30-Day Speaking Confidence Path',
    reasoning:
      'Berdasarkan hasil assessment, kamu tidak perlu mengulang semua materi dari awal. Fokus utama kamu adalah mengubah English yang sudah kamu pahami menjadi English yang bisa kamu gunakan secara spontan.',
    answers: {},
  };

  const dimensionLabels: Record<string, { label: string; desc: string }> = {
    grammar: { label: 'Grammar Structure', desc: 'Pemahaman tata bahasa praktis' },
    vocabulary: { label: 'Practical Vocabulary', desc: 'Kosakata aktif komunikasi' },
    reading: { label: 'Reading Comprehension', desc: 'Pemahaman konteks tertulis' },
    listening: { label: 'Listening Comprehension', desc: 'Menangkap intonasi & audio' },
    speaking: { label: 'Speaking Formulation', desc: 'Merumuskan kalimat spontan' },
    confidence: { label: 'Speaking Confidence', desc: 'Kenyamanan berbicara tanpa panik' },
  };

  const handleProceed = () => {
    if (currentUser) {
      if (!currentUser.onboardingCompleted) {
        setCurrentView('onboarding');
      } else {
        setCurrentView('dashboard');
      }
    } else {
      // Prompt quick registration / login
      setAuthModalOpen(true);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10 space-y-10">
      {/* Top Banner */}
      <div className="text-center space-y-3">
        <div className="inline-flex items-center space-x-2 bg-amber-100 text-amber-900 border border-amber-300/80 px-3.5 py-1 rounded-full text-xs font-semibold">
          <Sparkles className="w-3.5 h-3.5 text-amber-600" />
          <span>Analisis Profil Selesai</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-['Outfit',sans-serif] font-extrabold text-stone-900 tracking-tight">
          Here's Your English Profile
        </h1>
        <p className="text-stone-600 max-w-lg mx-auto text-sm sm:text-base">
          Hasil diagnostik objektif kemampuan bahasa Inggrismu dan peta rekomendasi untuk melatih reflek berbicara.
        </p>
      </div>

      {/* Main Result Card */}
      <div className="bg-white rounded-[32px] border-2 border-[#1A1A1A] p-6 sm:p-10 shadow-[10px_10px_0px_0px_#1A1A1A] space-y-8">
        {/* Estimated Level Highlight */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between p-6 sm:p-8 rounded-[24px] bg-[#1A1A1A] text-white border-2 border-[#FF5733] shadow-[6px_6px_0px_0px_#FF5733] gap-4">
          <div className="space-y-1">
            <span className="text-[11px] font-black uppercase tracking-widest text-[#FF5733] block">
              Dream Academy Estimated Level
            </span>
            <div className="text-3xl sm:text-4xl font-black italic tracking-tight">
              {result.estimatedLevel} — {result.levelTitle || 'Elementary'}
            </div>
            <p className="text-xs text-stone-300 font-medium">
              Perkiraan level berbasis performa diagnostik (A1/A2/B1/B2/C1).
            </p>
          </div>

          <div className="flex sm:flex-col items-center sm:items-end justify-between border-t sm:border-t-0 sm:border-l-2 border-white/20 pt-3 sm:pt-0 sm:pl-6">
            <span className="text-xs text-stone-400 font-bold uppercase tracking-wider">Status:</span>
            <span className="text-sm font-black text-[#FF5733] uppercase tracking-wider">Siap Berlatih Aktif</span>
          </div>
        </div>

        {/* 6-Dimension Score Visualizer */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-base font-black text-[#1A1A1A] uppercase tracking-tight flex items-center space-x-2">
              <Award className="w-5 h-5 text-[#FF5733]" />
              <span>Skor 6 Dimensi Kemampuan (0–100)</span>
            </h3>
            <span className="text-xs font-bold text-[#4A4A4A] uppercase tracking-wider">Normalized Scale</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {Object.entries(result.scores).map(([key, rawVal]) => {
              const score = typeof rawVal === 'number' ? rawVal : Number(rawVal) || 0;
              const meta = dimensionLabels[key] || { label: key, desc: '' };
              const isOpportunity = score < 55;
              return (
                <div
                  key={key}
                  className="bg-[#FDFCFB] border-2 border-[#1A1A1A] rounded-2xl p-4 flex flex-col justify-between shadow-[3px_3px_0px_0px_#1A1A1A]"
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-black text-[#1A1A1A] uppercase tracking-wide">{meta.label}</span>
                    <span
                      className={`text-sm font-black ${
                        isOpportunity ? 'text-[#FF5733]' : 'text-[#1A1A1A]'
                      }`}
                    >
                      {score}/100
                    </span>
                  </div>

                  <div className="w-full bg-[#F3F3F1] border border-[#1A1A1A]/20 rounded-full h-2.5 mb-2 overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all duration-500 ${
                        isOpportunity ? 'bg-[#FF5733]' : 'bg-[#1A1A1A]'
                      }`}
                      style={{ width: `${Math.min(100, Math.max(10, score))}%` }}
                    />
                  </div>

                  <p className="text-[11px] font-semibold text-[#4A4A4A]">{meta.desc}</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Strongest Skill & Biggest Opportunity Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-5 rounded-2xl bg-[#F3F3F1] border-2 border-[#1A1A1A] shadow-[4px_4px_0px_0px_#1A1A1A]">
            <div className="flex items-center space-x-2 text-[#1A1A1A] font-black text-xs uppercase tracking-wider mb-2">
              <CheckCircle2 className="w-4 h-4 text-[#FF5733]" />
              <span>Your Strongest Skill</span>
            </div>
            <ul className="space-y-1.5 text-xs sm:text-sm text-[#1A1A1A] font-semibold">
              {result.strengths.map((str, idx) => (
                <li key={idx} className="flex items-start space-x-1.5">
                  <span className="text-[#FF5733] font-black">•</span>
                  <span>{str}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="p-5 rounded-2xl bg-[#FFF0EB] border-2 border-[#FF5733] shadow-[4px_4px_0px_0px_#FF5733]">
            <div className="flex items-center space-x-2 text-[#FF5733] font-black text-xs uppercase tracking-wider mb-2">
              <Target className="w-4 h-4 text-[#FF5733]" />
              <span>Your Biggest Opportunity</span>
            </div>
            <ul className="space-y-1.5 text-xs sm:text-sm text-[#1A1A1A] font-semibold">
              {result.weaknesses.map((w, idx) => (
                <li key={idx} className="flex items-start space-x-1.5">
                  <span className="text-[#FF5733] font-black">•</span>
                  <span>{w}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Recommended Path & Friendly Reasoning */}
        <div className="p-6 rounded-2xl bg-[#F3F3F1] border-2 border-[#1A1A1A] shadow-[4px_4px_0px_0px_#1A1A1A] space-y-3">
          <div className="flex items-center space-x-2 text-[#1A1A1A] font-black text-sm uppercase tracking-tight">
            <BookOpen className="w-4 h-4 text-[#FF5733]" />
            <span>Rekomendasi Jalur Belajar: {result.recommendedPath}</span>
          </div>

          <p className="text-xs sm:text-sm text-[#4A4A4A] font-semibold leading-relaxed">
            {result.reasoning}
          </p>

          <div className="pt-3 border-t-2 border-[#1A1A1A]/10 flex flex-wrap items-center justify-between text-xs font-black text-[#1A1A1A] gap-2">
            <span>Fokus Utama: <strong className="text-[#FF5733]">{result.primaryFocus}</strong></span>
            <span>Target Durasi: <strong>15 Menit / Hari</strong></span>
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t-2 border-[#1A1A1A]/10">
          <button
            onClick={() => setCurrentView('assessment')}
            className="w-full sm:w-auto px-6 py-3.5 rounded-xl border-2 border-[#1A1A1A] bg-white text-[#1A1A1A] hover:bg-[#F3F3F1] text-xs sm:text-sm font-black uppercase tracking-wider flex items-center justify-center space-x-2 shadow-[3px_3px_0px_0px_#1A1A1A] cursor-pointer"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Coba Tes Lagi</span>
          </button>

          <button
            id="btn-proceed-learning-path"
            onClick={handleProceed}
            className="w-full sm:w-auto px-8 py-4 rounded-xl bg-[#FF5733] text-white hover:bg-[#E84826] text-xs sm:text-sm font-black uppercase tracking-wider flex items-center justify-center space-x-2 shadow-[4px_4px_0px_0px_#1A1A1A] hover:translate-x-0.5 hover:translate-y-0.5 transition-all cursor-pointer"
          >
            <span>
              {currentUser ? 'Lihat Learning Path Saya' : 'Daftar & Lihat Learning Path Saya'}
            </span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
