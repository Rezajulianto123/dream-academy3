import React from 'react';
import { useApp } from '../../context/AppContext';
import {
  ArrowRight,
  Sparkles,
  Mic,
  Brain,
  CheckCircle2,
  TrendingUp,
  Compass,
  MessageSquare,
} from 'lucide-react';

export const LandingPage: React.FC = () => {
  const { setCurrentView } = useApp();

  const scrollToHowItWorks = () => {
    const el = document.getElementById('how-it-works-section');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="space-y-24 py-8 sm:py-14">
      {/* 1. HERO SECTION (Bold Typography with 2-Column Desktop Grid) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Bold Headline & CTA */}
          <div className="lg:col-span-7 flex flex-col justify-center text-left">
            <div className="inline-flex items-center space-x-2 bg-[#FFF0EB] border border-[#FF5733] px-4 py-1.5 rounded-full text-xs font-black text-[#FF5733] uppercase tracking-widest mb-6 w-fit">
              <Sparkles className="w-3.5 h-3.5 text-[#FF5733]" />
              <span>AI English Growth System Indonesia</span>
            </div>

            <h1 className="text-5xl sm:text-7xl xl:text-[84px] leading-[0.88] font-black tracking-tighter text-[#1A1A1A] mb-8">
              STOP LEARNING ENGLISH.<br />
              <span className="text-[#FF5733]">START SPEAKING IT.</span>
            </h1>

            <p className="text-lg sm:text-xl text-[#4A4A4A] font-medium max-w-xl mb-10 leading-relaxed">
              Belajar bahasa Inggris dengan sistem AI yang menyesuaikan kemampuanmu, membantu kamu berlatih setiap hari, dan membangun kepercayaan diri untuk berbicara di dunia nyata.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <button
                id="hero-btn-primary-assessment"
                onClick={() => setCurrentView('assessment')}
                className="bg-[#FF5733] hover:bg-[#E84826] text-white text-base sm:text-lg font-black px-8 sm:px-10 py-4 sm:py-5 rounded-xl shadow-[5px_5px_0px_0px_#1A1A1A] hover:shadow-[2px_2px_0px_0px_#1A1A1A] hover:translate-x-0.5 hover:translate-y-0.5 transition-all flex items-center justify-center space-x-2.5 cursor-pointer group"
              >
                <span>Tes Kemampuan Gratis</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
              <button
                id="hero-btn-secondary-how"
                onClick={scrollToHowItWorks}
                className="border-2 border-[#1A1A1A] bg-white hover:bg-[#F3F3F1] text-[#1A1A1A] text-base sm:text-lg font-black px-8 py-4 sm:py-5 rounded-xl shadow-[5px_5px_0px_0px_#1A1A1A] hover:shadow-[2px_2px_0px_0px_#1A1A1A] hover:translate-x-0.5 hover:translate-y-0.5 transition-all cursor-pointer text-center"
              >
                Lihat Cara Kerja
              </button>
            </div>

            <div className="flex flex-wrap items-center gap-6 text-xs font-bold text-[#4A4A4A]">
              <span className="flex items-center space-x-1.5">
                <CheckCircle2 className="w-4 h-4 text-[#FF5733]" />
                <span>5 Menit Gratis</span>
              </span>
              <span className="flex items-center space-x-1.5">
                <CheckCircle2 className="w-4 h-4 text-[#FF5733]" />
                <span>Analisis 6 Dimensi AI</span>
              </span>
              <span className="flex items-center space-x-1.5">
                <CheckCircle2 className="w-4 h-4 text-[#FF5733]" />
                <span>Rekomendasi Personal</span>
              </span>
            </div>
          </div>

          {/* Right Column: Hero Graphic Card from Design HTML */}
          <div className="lg:col-span-5 flex items-center justify-center">
            <div className="w-full bg-white border-2 border-[#1A1A1A] rounded-[32px] p-6 sm:p-8 shadow-[10px_10px_0px_0px_rgba(26,26,26,1)] sm:shadow-[14px_14px_0px_0px_rgba(26,26,26,1)]">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <p className="text-xs font-black text-[#FF5733] uppercase tracking-widest mb-1">
                    Estimated Level
                  </p>
                  <h2 className="text-3xl sm:text-4xl font-black italic tracking-tight text-[#1A1A1A]">
                    A2 — ELEMENTARY
                  </h2>
                </div>
                <div className="bg-[#F3F3F1] border-2 border-[#1A1A1A] p-3 rounded-2xl">
                  <MessageSquare className="w-6 h-6 text-[#1A1A1A]" />
                </div>
              </div>

              <div className="space-y-4 mb-8">
                <div>
                  <div className="flex justify-between items-end mb-1">
                    <span className="text-sm font-bold text-[#4A4A4A]">Grammar (Teori)</span>
                    <span className="text-sm font-black text-[#1A1A1A]">72%</span>
                  </div>
                  <div className="h-2.5 w-full bg-[#F3F3F1] rounded-full overflow-hidden border border-[#1A1A1A]/20">
                    <div className="h-full bg-[#1A1A1A]" style={{ width: '72%' }}></div>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between items-end mb-1">
                    <span className="text-sm font-bold text-[#4A4A4A]">Speaking Confidence</span>
                    <span className="text-sm font-black text-[#FF5733]">35%</span>
                  </div>
                  <div className="h-2.5 w-full bg-[#F3F3F1] rounded-full overflow-hidden border border-[#1A1A1A]/20">
                    <div className="h-full bg-[#FF5733]" style={{ width: '35%' }}></div>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between items-end mb-1">
                    <span className="text-sm font-bold text-[#4A4A4A]">Vocabulary Retensi</span>
                    <span className="text-sm font-black text-[#1A1A1A]">65%</span>
                  </div>
                  <div className="h-2.5 w-full bg-[#F3F3F1] rounded-full overflow-hidden border border-[#1A1A1A]/20">
                    <div className="h-full bg-[#1A1A1A]" style={{ width: '65%' }}></div>
                  </div>
                </div>
              </div>

              <div className="bg-[#FFF0EB] border-2 border-[#FF5733] border-dashed rounded-2xl p-4 sm:p-5">
                <p className="text-xs font-black uppercase text-[#FF5733] tracking-wider mb-1.5">
                  Recommended Focus
                </p>
                <p className="text-sm font-bold text-[#1A1A1A] leading-relaxed">
                  Fokus utama kamu adalah mengubah pemahaman pasif menjadi percakapan spontan dalam 30 hari.
                </p>
              </div>

              <div className="mt-6 pt-4 border-t-2 border-[#1A1A1A]/10 flex items-center justify-between">
                <span className="text-xs font-black uppercase tracking-wider text-[#4A4A4A]">
                  Diagnostik 6 Dimensi
                </span>
                <button
                  onClick={() => setCurrentView('assessment')}
                  className="text-xs font-black text-[#FF5733] hover:underline uppercase tracking-wider cursor-pointer"
                >
                  Cek Skor Kamu →
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. THE PROBLEM SECTION */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6">
        <div className="bg-[#1A1A1A] text-white rounded-[32px] p-8 sm:p-14 border-2 border-[#1A1A1A] shadow-[10px_10px_0px_0px_#FF5733] relative overflow-hidden">
          <div className="max-w-3xl space-y-6">
            <div className="inline-block text-xs uppercase font-black tracking-[0.2em] text-[#FF5733] bg-white/10 px-3 py-1 rounded-md">
              Masalah Terbesar yang Sering Kita Alami
            </div>

            <div className="text-2xl sm:text-3xl font-black tracking-tight leading-snug text-white">
              <p className="mb-2 text-stone-300">Kamu sudah belajar grammar bertahun-tahun.</p>
              <p className="mb-2 text-stone-300">Kamu sudah menghafal ratusan vocabulary.</p>
              <p className="mb-3 text-stone-300">Tapi ketika harus berbicara...</p>
              <p className="text-5xl sm:text-6xl font-black italic text-[#FF5733] tracking-tighter">
                BLANK.
              </p>
            </div>

            <div className="pt-6 border-t-2 border-white/15 text-stone-300 text-base sm:text-lg leading-relaxed font-medium">
              <p>
                Masalahmu bukan karena kamu kurang pintar atau kurang menghafal kamus. 
                Kamu hanya <strong className="text-white font-black">kurang latihan aktif yang aman</strong> tanpa takut dihakimi. 
                Dream Academy dirancang untuk mengubah pengetahuan bahasa Inggris pasif menjadi kemampuan nyata yang siap digunakan.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. HOW IT WORKS SECTION (Neo-Brutalist Cards) */}
      <section id="how-it-works-section" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="text-xs uppercase font-black tracking-[0.2em] text-[#FF5733] mb-2">
            Metode Dream Academy
          </div>
          <h2 className="text-4xl sm:text-5xl font-black text-[#1A1A1A] tracking-tighter">
            BAGAIMANA CARA KERJANYA?
          </h2>
          <p className="text-[#4A4A4A] mt-3 text-base sm:text-lg font-medium">
            Bukan sekadar menonton video pasif, tapi siklus pertumbuhan yang nyata.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white border-2 border-[#1A1A1A] rounded-[24px] p-6 shadow-[6px_6px_0px_0px_#1A1A1A] hover:translate-x-0.5 hover:translate-y-0.5 transition-transform">
            <div className="text-4xl font-black text-[#FF5733] mb-3">
              01
            </div>
            <h3 className="text-xl font-black text-[#1A1A1A] mb-2 uppercase tracking-tight">Assess</h3>
            <p className="text-sm text-[#4A4A4A] font-medium leading-relaxed">
              Cari tahu kemampuan English kamu secara objektif melalui diagnostik 6 dimensi tanpa tekanan.
            </p>
          </div>

          <div className="bg-white border-2 border-[#1A1A1A] rounded-[24px] p-6 shadow-[6px_6px_0px_0px_#1A1A1A] hover:translate-x-0.5 hover:translate-y-0.5 transition-transform">
            <div className="text-4xl font-black text-[#FF5733] mb-3">
              02
            </div>
            <h3 className="text-xl font-black text-[#1A1A1A] mb-2 uppercase tracking-tight">Personalize</h3>
            <p className="text-sm text-[#4A4A4A] font-medium leading-relaxed">
              AI menemukan kelemahan spesifikmu dan merancang kurikulum praktis yang tidak mengulang dari nol.
            </p>
          </div>

          <div className="bg-white border-2 border-[#1A1A1A] rounded-[24px] p-6 shadow-[6px_6px_0px_0px_#1A1A1A] hover:translate-x-0.5 hover:translate-y-0.5 transition-transform">
            <div className="text-4xl font-black text-[#FF5733] mb-3">
              03
            </div>
            <h3 className="text-xl font-black text-[#1A1A1A] mb-2 uppercase tracking-tight">Practice</h3>
            <p className="text-sm text-[#4A4A4A] font-medium leading-relaxed">
              Belajar konsep inti melalui video ringkas dan langsung lakukan roleplay dengan AI Speaking Coach.
            </p>
          </div>

          <div className="bg-[#FFF0EB] border-2 border-[#FF5733] rounded-[24px] p-6 shadow-[6px_6px_0px_0px_#FF5733] hover:translate-x-0.5 hover:translate-y-0.5 transition-transform">
            <div className="text-4xl font-black text-[#FF5733] mb-3">
              04
            </div>
            <h3 className="text-xl font-black text-[#FF5733] mb-2 uppercase tracking-tight">Speak</h3>
            <p className="text-sm text-[#1A1A1A] font-medium leading-relaxed">
              Dapatkan feedback konstruktif instan, hilangkan keraguan, dan bangun rasa percaya diri berbicara nyata.
            </p>
          </div>
        </div>
      </section>

      {/* 4. AI LEARNING EXPERIENCE */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#F3F3F1] border-2 border-[#1A1A1A] rounded-[32px] p-8 sm:p-14 shadow-[8px_8px_0px_0px_#1A1A1A]">
          <div className="max-w-2xl mb-12">
            <div className="text-xs uppercase font-black tracking-[0.2em] text-[#FF5733] mb-2">
              Asisten Belajar Cerdas
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-[#1A1A1A] tracking-tight">
              AI Sebagai Partner Latihan, Bukan Sekadar Teori
            </h2>
            <p className="text-[#4A4A4A] mt-3 text-base sm:text-lg font-medium leading-relaxed">
              Kami tidak mempromosikan AI sebagai jalan pintas ajaib. AI di Dream Academy bertindak sebagai asisten pribadi yang sabar melatihmu setiap hari kapan pun kamu punya waktu.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white rounded-2xl p-6 border-2 border-[#1A1A1A] shadow-[4px_4px_0px_0px_#1A1A1A]">
              <div className="w-12 h-12 rounded-xl bg-[#FFF0EB] border border-[#FF5733] text-[#FF5733] flex items-center justify-center mb-4">
                <Mic className="w-6 h-6" />
              </div>
              <h3 className="font-black text-lg text-[#1A1A1A] mb-2">AI Speaking Coach</h3>
              <p className="text-sm text-[#4A4A4A] font-medium leading-relaxed">
                Roleplay situasi nyata: perkenalan kantor, meeting harian, small talk, hingga interview tanpa rasa canggung atau malu.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-6 border-2 border-[#1A1A1A] shadow-[4px_4px_0px_0px_#1A1A1A]">
              <div className="w-12 h-12 rounded-xl bg-[#FFF0EB] border border-[#FF5733] text-[#FF5733] flex items-center justify-center mb-4">
                <Brain className="w-6 h-6" />
              </div>
              <h3 className="font-black text-lg text-[#1A1A1A] mb-2">Instant Actionable Feedback</h3>
              <p className="text-sm text-[#4A4A4A] font-medium leading-relaxed">
                Bukan menyalahkan grammar secara kaku, tapi memberi tahu apa yang sudah bagus dan 1 alternatif kalimat yang lebih natural.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-6 border-2 border-[#1A1A1A] shadow-[4px_4px_0px_0px_#1A1A1A]">
              <div className="w-12 h-12 rounded-xl bg-[#FFF0EB] border border-[#FF5733] text-[#FF5733] flex items-center justify-center mb-4">
                <TrendingUp className="w-6 h-6" />
              </div>
              <h3 className="font-black text-lg text-[#1A1A1A] mb-2">Daily Missions & Focus</h3>
              <p className="text-sm text-[#4A4A4A] font-medium leading-relaxed">
                Setiap hari dashboard menjawab satu pertanyaan sederhana: "Apa yang harus saya lakukan hari ini?" agar kamu tetap konsisten.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 5. LEARNING JOURNEY PROGRESSION */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 text-center">
        <div className="text-xs uppercase font-black tracking-[0.2em] text-[#FF5733] mb-2">
          Transformasi Pelajar
        </div>
        <h2 className="text-3xl sm:text-4xl font-black text-[#1A1A1A] mb-10 tracking-tight">
          THE DREAM ACADEMY GROWTH PATH
        </h2>

        <div className="flex flex-wrap items-center justify-center gap-3 text-xs sm:text-sm font-black">
          <div className="px-5 py-3 rounded-xl bg-white border-2 border-[#1A1A1A] shadow-[3px_3px_0px_0px_#1A1A1A] text-[#1A1A1A]">
            01 / KNOW (Teori)
          </div>
          <ArrowRight className="w-4 h-4 text-[#1A1A1A] hidden sm:inline" />
          <div className="px-5 py-3 rounded-xl bg-white border-2 border-[#1A1A1A] shadow-[3px_3px_0px_0px_#1A1A1A] text-[#1A1A1A]">
            02 / UNDERSTAND (Konteks)
          </div>
          <ArrowRight className="w-4 h-4 text-[#1A1A1A] hidden sm:inline" />
          <div className="px-5 py-3 rounded-xl bg-[#FFF0EB] border-2 border-[#FF5733] shadow-[3px_3px_0px_0px_#FF5733] text-[#FF5733]">
            03 / PRACTICE (Latihan)
          </div>
          <ArrowRight className="w-4 h-4 text-[#1A1A1A] hidden sm:inline" />
          <div className="px-5 py-3 rounded-xl bg-[#FF5733] text-white shadow-[3px_3px_0px_0px_#1A1A1A]">
            04 / SPEAK (Bicara)
          </div>
          <ArrowRight className="w-4 h-4 text-[#1A1A1A] hidden sm:inline" />
          <div className="px-5 py-3 rounded-xl bg-[#1A1A1A] text-white shadow-[3px_3px_0px_0px_#FF5733]">
            05 / CONFIDENT (Percaya Diri)
          </div>
        </div>
      </section>

      {/* 6. SOCIAL PROOF */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6">
        <div className="border-2 border-dashed border-[#1A1A1A] bg-white rounded-3xl p-6 sm:p-10 text-center shadow-[6px_6px_0px_0px_#F3F3F1]">
          <div className="inline-block bg-[#F3F3F1] border border-[#1A1A1A] text-[#1A1A1A] text-xs font-black uppercase tracking-wider px-3.5 py-1.5 rounded-full mb-4">
            Kutipan & Testimoni Pelajar (Simulasi / Placeholder Content)
          </div>
          <p className="text-xs text-[#4A4A4A] max-w-lg mx-auto mb-8 font-medium">
            Dream Academy berkomitmen pada transparansi. Kami tidak pernah memalsukan ulasan. Di bawah ini adalah contoh feedback dari peserta sesi uji coba internal kami:
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
            <div className="bg-[#FDFCFB] p-6 rounded-2xl border-2 border-[#1A1A1A] shadow-[4px_4px_0px_0px_#1A1A1A]">
              <p className="text-sm font-semibold text-[#1A1A1A] italic mb-4 leading-relaxed">
                "Biasanya saya cuma diam kalau meeting regional sama tim Singapura karena takut grammar belepotan. Latihan sama AI Coach di sini bikin saya terbiasa bikin kalimat tanpa mikir 10 detik dulu."
              </p>
              <div className="text-xs font-black text-[#FF5733] uppercase tracking-wider">
                — Peserta Uji Coba (Product Designer, Jakarta)
              </div>
            </div>

            <div className="bg-[#FDFCFB] p-6 rounded-2xl border-2 border-[#1A1A1A] shadow-[4px_4px_0px_0px_#1A1A1A]">
              <p className="text-sm font-semibold text-[#1A1A1A] italic mb-4 leading-relaxed">
                "Yang paling ngebantu adalah feedback-nya cuma ngasih 1 hal buat diperbaiki. Nggak bikin ngerasa 'wah bahasa Inggris gue parah banget', tapi justru bikin semangat nyoba lagi besok."
              </p>
              <div className="text-xs font-black text-[#FF5733] uppercase tracking-wider">
                — Peserta Uji Coba (Finance Analyst, Bandung)
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 7. PRICING SECTION */}
      <section id="pricing-section" className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="text-center max-w-xl mx-auto mb-14">
          <div className="text-xs uppercase font-black tracking-[0.2em] text-[#FF5733] mb-2">
            Investasi Kemampuan
          </div>
          <h2 className="text-4xl sm:text-5xl font-black text-[#1A1A1A] tracking-tighter">
            PILIH PAKET BELAJAR
          </h2>
          <p className="text-[#4A4A4A] mt-2 text-base font-medium">
            Harga tertera merupakan harga peluncuran awal.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Card 1: Free */}
          <div className="bg-white rounded-[28px] border-2 border-[#1A1A1A] p-7 flex flex-col justify-between shadow-[6px_6px_0px_0px_#1A1A1A]">
            <div>
              <div className="text-xs font-black uppercase tracking-widest text-[#4A4A4A] mb-2">
                Diagnostic
              </div>
              <h3 className="text-2xl font-black text-[#1A1A1A] mb-1">Free Assessment</h3>
              <div className="text-3xl font-black text-[#1A1A1A] mb-4">Rp 0</div>
              <p className="text-xs text-[#4A4A4A] font-medium mb-6">
                Evaluasi komprehensif untuk mengetahui level dan letak kendala speaking kamu.
              </p>
              <ul className="space-y-3 text-xs font-bold text-[#1A1A1A] mb-8">
                <li className="flex items-center space-x-2">
                  <CheckCircle2 className="w-4 h-4 text-[#FF5733] shrink-0" />
                  <span>Tes 6 Dimensi Kemampuan</span>
                </li>
                <li className="flex items-center space-x-2">
                  <CheckCircle2 className="w-4 h-4 text-[#FF5733] shrink-0" />
                  <span>Estimasi Level CEFR (A1-C1)</span>
                </li>
                <li className="flex items-center space-x-2">
                  <CheckCircle2 className="w-4 h-4 text-[#FF5733] shrink-0" />
                  <span>Analisis Kekuatan & Kelemahan AI</span>
                </li>
                <li className="flex items-center space-x-2">
                  <CheckCircle2 className="w-4 h-4 text-[#FF5733] shrink-0" />
                  <span>Rekomendasi Learning Path</span>
                </li>
              </ul>
            </div>
            <button
              onClick={() => setCurrentView('assessment')}
              className="w-full py-3.5 rounded-xl border-2 border-[#1A1A1A] text-[#1A1A1A] hover:bg-[#F3F3F1] text-xs font-black uppercase tracking-wider shadow-[3px_3px_0px_0px_#1A1A1A] transition-all cursor-pointer"
            >
              Mulai Tes Gratis
            </button>
          </div>

          {/* Card 2: Core (Popular) */}
          <div className="bg-[#1A1A1A] text-white rounded-[28px] border-2 border-[#FF5733] p-7 flex flex-col justify-between relative shadow-[8px_8px_0px_0px_#FF5733]">
            <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-[#FF5733] text-white text-[11px] font-black uppercase tracking-widest px-4 py-1 rounded-full shadow-xs">
              Paling Direkomendasikan
            </div>
            <div>
              <div className="text-xs font-black uppercase tracking-widest text-[#FF5733] mb-2 mt-2">
                Core System
              </div>
              <h3 className="text-2xl font-black text-white mb-1">Dream Academy Core</h3>
              <div className="flex items-baseline space-x-1 mb-4">
                <span className="text-3xl font-black text-white">Rp 199.000</span>
                <span className="text-xs text-stone-400 font-bold">/ bulan</span>
              </div>
              <p className="text-xs text-stone-300 font-medium mb-6">
                Sistem lengkap untuk mengubah pengetahuan menjadi reflek berbicara lancar.
              </p>
              <ul className="space-y-3 text-xs font-bold text-white mb-8">
                <li className="flex items-center space-x-2">
                  <CheckCircle2 className="w-4 h-4 text-[#FF5733] shrink-0" />
                  <span>Semua fitur Free Assessment</span>
                </li>
                <li className="flex items-center space-x-2">
                  <CheckCircle2 className="w-4 h-4 text-[#FF5733] shrink-0" />
                  <span>Akses Penuh 30-Day Speaking Path</span>
                </li>
                <li className="flex items-center space-x-2">
                  <CheckCircle2 className="w-4 h-4 text-[#FF5733] shrink-0" />
                  <span>AI Speaking Coach Tanpa Batas</span>
                </li>
                <li className="flex items-center space-x-2">
                  <CheckCircle2 className="w-4 h-4 text-[#FF5733] shrink-0" />
                  <span>Instant Feedback & Koreksi Ramah</span>
                </li>
                <li className="flex items-center space-x-2">
                  <CheckCircle2 className="w-4 h-4 text-[#FF5733] shrink-0" />
                  <span>Pelacakan Progress & Daily Streak</span>
                </li>
              </ul>
            </div>
            <button
              onClick={() => setCurrentView('assessment')}
              className="w-full py-4 rounded-xl bg-[#FF5733] hover:bg-[#E84826] text-white text-xs font-black uppercase tracking-wider shadow-[3px_3px_0px_0px_white] transition-all cursor-pointer"
            >
              Coba Sekarang
            </button>
          </div>

          {/* Card 3: Premium Future */}
          <div className="bg-white rounded-[28px] border-2 border-[#1A1A1A] p-7 flex flex-col justify-between shadow-[6px_6px_0px_0px_#1A1A1A] opacity-90">
            <div>
              <div className="text-xs font-black uppercase tracking-widest text-[#4A4A4A] mb-2">
                Fase Mendatang
              </div>
              <h3 className="text-2xl font-black text-[#1A1A1A] mb-1">Human Coach Prep</h3>
              <div className="flex items-baseline space-x-1 mb-4">
                <span className="text-3xl font-black text-[#1A1A1A]">Rp 499.000</span>
                <span className="text-xs text-[#4A4A4A] font-bold">/ bulan</span>
              </div>
              <p className="text-xs text-[#4A4A4A] font-medium mb-6">
                Kombinasi latihan mandiri AI dengan pendampingan live coach manusia untuk target akselerasi.
              </p>
              <ul className="space-y-3 text-xs font-bold text-[#4A4A4A] mb-8">
                <li className="flex items-center space-x-2">
                  <CheckCircle2 className="w-4 h-4 text-[#4A4A4A] shrink-0" />
                  <span>Semua fitur Core AI System</span>
                </li>
                <li className="flex items-center space-x-2">
                  <CheckCircle2 className="w-4 h-4 text-[#4A4A4A] shrink-0" />
                  <span>1-on-1 Human Coach Session</span>
                </li>
                <li className="flex items-center space-x-2">
                  <CheckCircle2 className="w-4 h-4 text-[#4A4A4A] shrink-0" />
                  <span>Personal Interview Mockup Prep</span>
                </li>
              </ul>
            </div>
            <div className="w-full py-3.5 rounded-xl bg-[#F3F3F1] border border-[#1A1A1A]/20 text-[#4A4A4A] text-center text-xs font-black uppercase tracking-wider">
              Segera Hadir
            </div>
          </div>
        </div>
      </section>

      {/* 8. FINAL CTA */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6">
        <div className="bg-[#1A1A1A] text-white rounded-[32px] p-8 sm:p-14 text-center border-2 border-[#1A1A1A] shadow-[10px_10px_0px_0px_#FF5733] relative overflow-hidden">
          <h2 className="text-4xl sm:text-6xl font-black tracking-tighter mb-4">
            YOUR ENGLISH IS WAITING TO BE USED<span className="text-[#FF5733]">.</span>
          </h2>
          <p className="max-w-xl mx-auto text-stone-300 text-base sm:text-lg mb-8 leading-relaxed font-medium">
            Berhenti menunda sampai grammar-mu 'sempurna'. Mulai cari tahu kemampuanmu sekarang dan bangun kepercayaan dirimu langkah demi langkah.
          </p>
          <button
            id="final-cta-btn"
            onClick={() => setCurrentView('assessment')}
            className="px-10 py-5 rounded-xl bg-[#FF5733] text-white hover:bg-[#E84826] font-black text-base sm:text-lg shadow-[5px_5px_0px_0px_white] hover:translate-x-0.5 hover:translate-y-0.5 transition-all cursor-pointer inline-flex items-center space-x-2"
          >
            <span>Mulai Assessment Gratis</span>
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </section>
    </div>
  );
};
