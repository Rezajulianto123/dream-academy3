import React from 'react';
import { useApp } from '../../context/AppContext';
import { CheckCircle2, ArrowRight, ShieldCheck, Sparkles } from 'lucide-react';

export const PricingView: React.FC = () => {
  const { setCurrentView } = useApp();

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-12 space-y-12">
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <div className="inline-flex items-center space-x-1.5 bg-[#FFF0EB] border-2 border-[#FF5733] text-[#FF5733] px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-widest shadow-[2px_2px_0px_0px_#FF5733]">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Biaya Transparan & Terjangkau</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-black text-[#1A1A1A] tracking-tight">
          Investasi untuk Kemampuan Nyata
        </h1>
        <p className="text-[#4A4A4A] text-sm sm:text-base font-semibold">
          Mulai dengan tes kemampuan gratis, lalu tingkatkan ke paket Core untuk latihan bicara harian bersama AI Coach.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Card 1: Free Assessment */}
        <div className="bg-white rounded-[28px] border-2 border-[#1A1A1A] p-8 flex flex-col justify-between shadow-[6px_6px_0px_0px_#1A1A1A]">
          <div>
            <div className="text-xs font-black uppercase tracking-widest text-[#4A4A4A] mb-2">
              Free Tier
            </div>
            <h3 className="text-2xl font-black text-[#1A1A1A] mb-2">English Diagnostic</h3>
            <div className="text-3xl font-black text-[#1A1A1A] mb-4">Rp 0</div>
            <p className="text-xs text-[#4A4A4A] font-semibold mb-6 leading-relaxed">
              Tes lengkap untuk memetakan level CEFR, 6 dimensi kemampuan, serta kelemahan spesifikmu.
            </p>
            <ul className="space-y-3 text-xs font-bold text-[#1A1A1A] mb-8">
              <li className="flex items-center space-x-2">
                <CheckCircle2 className="w-4 h-4 text-[#FF5733] shrink-0" />
                <span>Tes 6 Dimensi Kemampuan</span>
              </li>
              <li className="flex items-center space-x-2">
                <CheckCircle2 className="w-4 h-4 text-[#FF5733] shrink-0" />
                <span>Analisis AI Kekuatan & Peluang</span>
              </li>
              <li className="flex items-center space-x-2">
                <CheckCircle2 className="w-4 h-4 text-[#FF5733] shrink-0" />
                <span>Estimasi CEFR Level</span>
              </li>
              <li className="flex items-center space-x-2">
                <CheckCircle2 className="w-4 h-4 text-[#FF5733] shrink-0" />
                <span>Rekomendasi Jalur Belajar</span>
              </li>
            </ul>
          </div>
          <button
            onClick={() => setCurrentView('assessment')}
            className="w-full py-3.5 rounded-xl border-2 border-[#1A1A1A] bg-white hover:bg-[#F3F3F1] text-xs font-black uppercase tracking-wider text-[#1A1A1A] shadow-[3px_3px_0px_0px_#1A1A1A] transition-all cursor-pointer"
          >
            Mulai Tes Gratis
          </button>
        </div>

        {/* Card 2: Core System */}
        <div className="bg-[#1A1A1A] text-white rounded-[28px] border-2 border-[#FF5733] p-8 flex flex-col justify-between relative shadow-[8px_8px_0px_0px_#FF5733]">
          <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-[#FF5733] text-white text-[10px] font-black uppercase tracking-widest px-4 py-1 rounded-full border-2 border-white shadow-[2px_2px_0px_0px_#1A1A1A]">
            Rekomendasi Utama
          </div>
          <div>
            <div className="text-xs font-black uppercase tracking-widest text-[#FF5733] mb-2">
              Membership
            </div>
            <h3 className="text-2xl font-black text-white mb-2">Dream Academy Core</h3>
            <div className="flex items-baseline space-x-1 mb-4">
              <span className="text-3xl font-black text-white">Rp 199.000</span>
              <span className="text-xs text-stone-300 font-bold">/ bulan</span>
            </div>
            <p className="text-xs text-stone-300 font-medium mb-6 leading-relaxed">
              Sistem harian 15 menit untuk melatih reflek berbicara tanpa rasa takut dan malu.
            </p>
            <ul className="space-y-3 text-xs text-stone-200 font-semibold mb-8">
              <li className="flex items-center space-x-2">
                <CheckCircle2 className="w-4 h-4 text-[#FF5733] shrink-0" />
                <span>Semua fitur Free Assessment</span>
              </li>
              <li className="flex items-center space-x-2">
                <CheckCircle2 className="w-4 h-4 text-[#FF5733] shrink-0" />
                <span>Kurikulum 30-Day Speaking Path</span>
              </li>
              <li className="flex items-center space-x-2">
                <CheckCircle2 className="w-4 h-4 text-[#FF5733] shrink-0" />
                <span>Latihan AI Speaking Coach Maya</span>
              </li>
              <li className="flex items-center space-x-2">
                <CheckCircle2 className="w-4 h-4 text-[#FF5733] shrink-0" />
                <span>Instant Feedback & Koreksi Ramah</span>
              </li>
              <li className="flex items-center space-x-2">
                <CheckCircle2 className="w-4 h-4 text-[#FF5733] shrink-0" />
                <span>Pelacakan Streak & Daily Mission</span>
              </li>
            </ul>
          </div>
          <button
            onClick={() => setCurrentView('assessment')}
            className="w-full py-4 rounded-xl bg-[#FF5733] text-white hover:bg-[#E84826] text-xs font-black uppercase tracking-wider transition-all shadow-[4px_4px_0px_0px_white] hover:translate-x-0.5 hover:translate-y-0.5 cursor-pointer"
          >
            Mulai Coba Sekarang
          </button>
        </div>

        {/* Card 3: Premium */}
        <div className="bg-white rounded-[28px] border-2 border-[#1A1A1A] p-8 flex flex-col justify-between shadow-[6px_6px_0px_0px_#1A1A1A] opacity-90">
          <div>
            <div className="text-xs font-black uppercase tracking-widest text-[#4A4A4A] mb-2">
              Mentorship (Coming Soon)
            </div>
            <h3 className="text-2xl font-black text-[#1A1A1A] mb-2">Core + Human Coach</h3>
            <div className="flex items-baseline space-x-1 mb-4">
              <span className="text-3xl font-black text-stone-700">Rp 499.000</span>
              <span className="text-xs text-stone-400 font-bold">/ bulan</span>
            </div>
            <p className="text-xs text-[#4A4A4A] font-semibold mb-6 leading-relaxed">
              Kombinasi latihan mandiri berbasis AI dengan sesi konsultasi 1-on-1 bersama mentor manusia.
            </p>
            <ul className="space-y-3 text-xs text-[#4A4A4A] font-semibold mb-8">
              <li className="flex items-center space-x-2">
                <CheckCircle2 className="w-4 h-4 text-stone-400 shrink-0" />
                <span>Semua fitur Dream Academy Core</span>
              </li>
              <li className="flex items-center space-x-2">
                <CheckCircle2 className="w-4 h-4 text-stone-400 shrink-0" />
                <span>1-on-1 Mock Interview Session</span>
              </li>
              <li className="flex items-center space-x-2">
                <CheckCircle2 className="w-4 h-4 text-stone-400 shrink-0" />
                <span>Review Aksen & Pelafalan Mendalam</span>
              </li>
            </ul>
          </div>
          <div className="w-full py-3.5 rounded-xl bg-[#F3F3F1] border-2 border-[#1A1A1A] text-[#1A1A1A] text-center text-xs font-black uppercase tracking-wider">
            Daftar Waiting List
          </div>
        </div>
      </div>
    </div>
  );
};
