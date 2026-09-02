import React from 'react';
import { Shield, Heart } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const Footer: React.FC = () => {
  const { setCurrentView } = useApp();

  return (
    <footer className="bg-[#FDFCFB] text-[#1A1A1A] border-t-2 border-[#1A1A1A] pt-12 pb-10 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* 4-step method banner inspired by Design HTML */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 pb-12 mb-12 border-b-2 border-[#1A1A1A]/15">
          <div className="flex flex-col gap-1.5 p-4 rounded-2xl bg-[#F3F3F1] border border-[#1A1A1A]/10">
            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-[#1A1A1A]/60">01 / ASSESS</span>
            <p className="text-sm font-bold text-[#1A1A1A]">Cari tahu kemampuan English kamu.</p>
          </div>
          <div className="flex flex-col gap-1.5 p-4 rounded-2xl bg-[#F3F3F1] border border-[#1A1A1A]/10">
            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-[#1A1A1A]/60">02 / PERSONALIZE</span>
            <p className="text-sm font-bold text-[#1A1A1A]">AI menemukan kelemahan belajarmu.</p>
          </div>
          <div className="flex flex-col gap-1.5 p-4 rounded-2xl bg-[#F3F3F1] border border-[#1A1A1A]/10">
            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-[#1A1A1A]/60">03 / PRACTICE</span>
            <p className="text-sm font-bold text-[#1A1A1A]">Berlatih sesuai level dan goalsmu.</p>
          </div>
          <div className="flex flex-col gap-1.5 p-4 rounded-2xl bg-[#FFF0EB] border-2 border-[#FF5733]">
            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-[#FF5733]">04 / SPEAK</span>
            <p className="text-sm font-bold text-[#FF5733]">Bangun confidence di dunia nyata.</p>
          </div>
        </div>

        {/* Main Footer Links */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          <div className="md:col-span-2 space-y-4">
            <div className="text-2xl font-black tracking-tighter text-[#1A1A1A]">
              DREAM ACADEMY<span className="text-[#FF5733]">.</span>
            </div>
            <p className="text-[#4A4A4A] text-sm max-w-md font-medium leading-relaxed">
              Turn English Knowledge Into Real-World Confidence. Membantu orang Indonesia berhenti takut berbicara bahasa Inggris dan mulai benar-benar menggunakannya dalam karier, meeting, dan percakapan nyata.
            </p>
            <div className="flex items-center space-x-2 text-xs font-bold text-[#FF5733] bg-[#FFF0EB] border border-[#FF5733] px-3.5 py-2 rounded-xl w-fit">
              <Shield className="w-4 h-4 shrink-0 text-[#FF5733]" />
              <span>Diagnostik berbasis estimasi kemampuan mandiri (Bukan sertifikasi resmi CEFR).</span>
            </div>
          </div>

          <div>
            <h4 className="text-xs font-black uppercase tracking-[0.2em] text-[#1A1A1A] mb-4">
              Platform
            </h4>
            <ul className="space-y-2.5 text-sm font-bold">
              <li>
                <button
                  onClick={() => setCurrentView('assessment')}
                  className="hover:text-[#FF5733] transition-colors cursor-pointer"
                >
                  Tes Kemampuan Gratis
                </button>
              </li>
              <li>
                <button
                  onClick={() => setCurrentView('dashboard')}
                  className="hover:text-[#FF5733] transition-colors cursor-pointer"
                >
                  Dashboard Belajar
                </button>
              </li>
              <li>
                <button
                  onClick={() => setCurrentView('speaking-studio')}
                  className="hover:text-[#FF5733] transition-colors cursor-pointer"
                >
                  AI Speaking Coach
                </button>
              </li>
              <li>
                <button
                  onClick={() => setCurrentView('pricing')}
                  className="hover:text-[#FF5733] transition-colors cursor-pointer"
                >
                  Paket & Biaya
                </button>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-black uppercase tracking-[0.2em] text-[#1A1A1A] mb-4">
              Prinsip Belajar
            </h4>
            <ul className="space-y-2 text-xs font-bold text-[#4A4A4A]">
              <li className="flex items-center space-x-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#FF5733]"></span>
                <span>Speaking Over Memorization</span>
              </li>
              <li className="flex items-center space-x-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#FF5733]"></span>
                <span>Practice Over Passive Learning</span>
              </li>
              <li className="flex items-center space-x-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#FF5733]"></span>
                <span>Personalization Over One-Size</span>
              </li>
              <li className="flex items-center space-x-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#FF5733]"></span>
                <span>Confidence + Competence</span>
              </li>
              <li className="flex items-center space-x-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#FF5733]"></span>
                <span>Outcome Over Features</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t-2 border-[#1A1A1A]/10 pt-6 flex flex-col sm:flex-row items-center justify-between text-xs font-semibold text-[#4A4A4A]">
          <p>© {new Date().getFullYear()} Dream Academy. Seluruh hak cipta dilindungi.</p>
          <div className="flex items-center space-x-1 mt-2 sm:mt-0">
            <span>Dibuat untuk pejuang bahasa Inggris di Indonesia</span>
            <Heart className="w-3.5 h-3.5 text-[#FF5733] fill-[#FF5733] inline" />
          </div>
        </div>
      </div>
    </footer>
  );
};
