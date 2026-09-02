import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { api } from '../../services/api';
import {
  Briefcase,
  Users,
  Compass,
  GraduationCap,
  Sparkles,
  Clock,
  ArrowRight,
  Target,
  CheckCircle2,
} from 'lucide-react';

export const OnboardingView: React.FC = () => {
  const { currentUser, setCurrentUser, setCurrentView } = useApp();

  const [step, setStep] = useState(1);
  const [goal, setGoal] = useState('Career & Job Opportunities');
  const [studyTimeMinutes, setStudyTimeMinutes] = useState(15);
  const [speakingSituation, setSpeakingSituation] = useState('Work meetings with regional colleagues');
  const [biggestStruggle, setBiggestStruggle] = useState('Takut salah grammar dan pikiran mendadak blank');
  const [saving, setSaving] = useState(false);

  const goals = [
    { id: 'Career', title: 'Karir & Pekerjaan', desc: 'Presentasi kantor, meeting dengan ekspat, dan komunikasi profesional' },
    { id: 'Job interview', title: 'Persiapan Job Interview', desc: 'Menjawab pertanyaan interview dalam bahasa Inggris dengan percaya diri' },
    { id: 'Daily conversation', title: 'Percakapan Harian', desc: 'Ngobrol santai tanpa rasa canggung dengan teman mancanegara' },
    { id: 'Confidence', title: 'Membangun Kepercayaan Diri', desc: 'Mengatasi mental block dan berhenti minder saat berbicara' },
    { id: 'Study', title: 'Studi & Beasiswa', desc: 'Persiapan kuliah ke luar negeri atau program pertukaran' },
  ];

  const times = [
    { minutes: 10, label: '10 Menit / Hari', badge: 'Ringan & Konsisten' },
    { minutes: 15, label: '15 Menit / Hari', badge: 'Rekomendasi Terbaik' },
    { minutes: 30, label: '30 Menit / Hari', badge: 'Akselerasi Cepat' },
  ];

  const situations = [
    'Online meeting dengan tim regional / global',
    'Menjawab pertanyaan spontan dari manajer atau klien asing',
    'Casual small talk sebelum meeting atau saat jam istirahat',
    'Travelling dan memesan makanan / hotel di luar negeri',
  ];

  const struggles = [
    'Takut salah grammar dan pikiran mendadak blank saat giliran bicara',
    'Tahu apa yang mau diomongin, tapi butuh waktu lama menerjemahkan di kepala',
    'Kurang kosakata aktif dan selalu mengulang kata-kata yang itu-itu saja',
    'Takut dihakimi atau dinilai jelek oleh rekan kerja',
  ];

  const handleFinish = async () => {
    if (!currentUser) return;
    setSaving(true);

    try {
      const updatedUser = {
        ...currentUser,
        goal,
        studyTimeMinutes,
        speakingSituation,
        biggestStruggle,
        onboardingCompleted: true,
      };

      const res = await api.saveUser(updatedUser);
      if (res.user) {
        setCurrentUser(res.user);
      } else {
        setCurrentUser(updatedUser);
      }
      setCurrentView('dashboard');
    } catch (e) {
      console.error('Onboarding save failed:', e);
      setCurrentView('dashboard');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-10 space-y-8">
      {/* Progress Dots */}
      <div className="flex items-center justify-between text-xs font-black uppercase tracking-wider text-[#4A4A4A]">
        <span className="text-[#FF5733]">Personalisasi Sistem Belajar</span>
        <span>Langkah {step} dari 4</span>
      </div>

      <div className="w-full bg-[#F3F3F1] border-2 border-[#1A1A1A] rounded-full h-3.5 overflow-hidden p-0.5">
        <div
          className="bg-[#FF5733] h-full transition-all duration-300 rounded-full"
          style={{ width: `${(step / 4) * 100}%` }}
        />
      </div>

      {/* STEP 1: Main Goal */}
      {step === 1 && (
        <div className="bg-white rounded-[32px] p-6 sm:p-10 border-2 border-[#1A1A1A] shadow-[8px_8px_0px_0px_#1A1A1A] space-y-6">
          <div>
            <h2 className="text-2xl sm:text-3xl font-black text-[#1A1A1A] tracking-tight">
              Apa target utama yang ingin kamu capai?
            </h2>
            <p className="text-xs sm:text-sm text-[#4A4A4A] font-semibold mt-1">
              AI akan menyesuaikan topik materi dan simulasi roleplay sesuai kebutuhanmu.
            </p>
          </div>

          <div className="space-y-3">
            {goals.map((g) => {
              const selected = goal === g.title;
              return (
                <button
                  key={g.id}
                  onClick={() => setGoal(g.title)}
                  className={`w-full text-left p-4 rounded-2xl border-2 transition-all cursor-pointer flex items-start space-x-3 ${
                    selected
                      ? 'border-[#FF5733] bg-[#FFF0EB] shadow-[4px_4px_0px_0px_#FF5733]'
                      : 'border-[#1A1A1A] bg-white hover:bg-[#F3F3F1] shadow-[2px_2px_0px_0px_#1A1A1A]'
                  }`}
                >
                  <div
                    className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 mt-0.5 border-2 ${
                      selected ? 'bg-[#FF5733] border-[#FF5733] text-white' : 'border-[#1A1A1A]'
                    }`}
                  >
                    {selected && <CheckCircle2 className="w-3.5 h-3.5" />}
                  </div>
                  <div>
                    <span className="text-sm font-black text-[#1A1A1A] block">{g.title}</span>
                    <span className="text-xs font-semibold text-[#4A4A4A]">{g.desc}</span>
                  </div>
                </button>
              );
            })}
          </div>

          <div className="flex justify-end pt-4">
            <button
              onClick={() => setStep(2)}
              className="px-7 py-3.5 rounded-xl bg-[#FF5733] text-white hover:bg-[#E84826] text-xs sm:text-sm font-black uppercase tracking-wider flex items-center space-x-2 cursor-pointer border-2 border-[#1A1A1A] shadow-[4px_4px_0px_0px_#1A1A1A] hover:translate-x-0.5 hover:translate-y-0.5 transition-all"
            >
              <span>Lanjut</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* STEP 2: Study Time */}
      {step === 2 && (
        <div className="bg-white rounded-[32px] p-6 sm:p-10 border-2 border-[#1A1A1A] shadow-[8px_8px_0px_0px_#1A1A1A] space-y-6">
          <div>
            <h2 className="text-2xl sm:text-3xl font-black text-[#1A1A1A] tracking-tight">
              Berapa lama waktu yang bisa kamu luangkan per hari?
            </h2>
            <p className="text-xs sm:text-sm text-[#4A4A4A] font-semibold mt-1">
              Konsistensi harian 15 menit jauh lebih efektif daripada belajar 3 jam seminggu sekali.
            </p>
          </div>

          <div className="space-y-3">
            {times.map((t) => {
              const selected = studyTimeMinutes === t.minutes;
              return (
                <button
                  key={t.minutes}
                  onClick={() => setStudyTimeMinutes(t.minutes)}
                  className={`w-full p-5 rounded-2xl border-2 transition-all cursor-pointer flex items-center justify-between ${
                    selected
                      ? 'border-[#FF5733] bg-[#FFF0EB] shadow-[4px_4px_0px_0px_#FF5733]'
                      : 'border-[#1A1A1A] bg-white hover:bg-[#F3F3F1] shadow-[2px_2px_0px_0px_#1A1A1A]'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <Clock className="w-5 h-5 text-[#FF5733]" />
                    <span className="text-sm font-black text-[#1A1A1A]">{t.label}</span>
                  </div>
                  <span className="text-xs font-black uppercase tracking-wider px-3 py-1 rounded-full bg-white border-2 border-[#1A1A1A] text-[#1A1A1A]">
                    {t.badge}
                  </span>
                </button>
              );
            })}
          </div>

          <div className="flex items-center justify-between pt-4">
            <button
              onClick={() => setStep(1)}
              className="text-xs font-black uppercase tracking-wider text-[#4A4A4A] hover:text-[#1A1A1A] cursor-pointer"
            >
              Kembali
            </button>
            <button
              onClick={() => setStep(3)}
              className="px-7 py-3.5 rounded-xl bg-[#FF5733] text-white hover:bg-[#E84826] text-xs sm:text-sm font-black uppercase tracking-wider flex items-center space-x-2 cursor-pointer border-2 border-[#1A1A1A] shadow-[4px_4px_0px_0px_#1A1A1A] hover:translate-x-0.5 hover:translate-y-0.5 transition-all"
            >
              <span>Lanjut</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* STEP 3: Speaking Situation */}
      {step === 3 && (
        <div className="bg-white rounded-[32px] p-6 sm:p-10 border-2 border-[#1A1A1A] shadow-[8px_8px_0px_0px_#1A1A1A] space-y-6">
          <div>
            <h2 className="text-2xl sm:text-3xl font-black text-[#1A1A1A] tracking-tight">
              Di situasi mana kamu paling butuh berbicara bahasa Inggris?
            </h2>
            <p className="text-xs sm:text-sm text-[#4A4A4A] font-semibold mt-1">
              Pilih situasi nyata yang paling mendesak untukmu:
            </p>
          </div>

          <div className="space-y-3">
            {situations.map((sit, idx) => {
              const selected = speakingSituation === sit;
              return (
                <button
                  key={idx}
                  onClick={() => setSpeakingSituation(sit)}
                  className={`w-full text-left p-4 rounded-2xl border-2 transition-all cursor-pointer flex items-center space-x-3 ${
                    selected
                      ? 'border-[#FF5733] bg-[#FFF0EB] shadow-[4px_4px_0px_0px_#FF5733]'
                      : 'border-[#1A1A1A] bg-white hover:bg-[#F3F3F1] shadow-[2px_2px_0px_0px_#1A1A1A]'
                  }`}
                >
                  <div
                    className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 border-2 ${
                      selected ? 'bg-[#FF5733] border-[#FF5733] text-white' : 'border-[#1A1A1A]'
                    }`}
                  >
                    {selected && <CheckCircle2 className="w-3.5 h-3.5" />}
                  </div>
                  <span className="text-sm font-black text-[#1A1A1A]">{sit}</span>
                </button>
              );
            })}
          </div>

          <div className="flex items-center justify-between pt-4">
            <button
              onClick={() => setStep(2)}
              className="text-xs font-black uppercase tracking-wider text-[#4A4A4A] hover:text-[#1A1A1A] cursor-pointer"
            >
              Kembali
            </button>
            <button
              onClick={() => setStep(4)}
              className="px-7 py-3.5 rounded-xl bg-[#FF5733] text-white hover:bg-[#E84826] text-xs sm:text-sm font-black uppercase tracking-wider flex items-center space-x-2 cursor-pointer border-2 border-[#1A1A1A] shadow-[4px_4px_0px_0px_#1A1A1A] hover:translate-x-0.5 hover:translate-y-0.5 transition-all"
            >
              <span>Lanjut</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* STEP 4: Biggest Struggle */}
      {step === 4 && (
        <div className="bg-white rounded-[32px] p-6 sm:p-10 border-2 border-[#1A1A1A] shadow-[8px_8px_0px_0px_#1A1A1A] space-y-6">
          <div>
            <h2 className="text-2xl sm:text-3xl font-black text-[#1A1A1A] tracking-tight">
              Apa yang membuatmu paling kesulitan saat ini?
            </h2>
            <p className="text-xs sm:text-sm text-[#4A4A4A] font-semibold mt-1">
              Ini membantu AI Coach memberikan feedback yang empatik dan tidak mengintimidasi.
            </p>
          </div>

          <div className="space-y-3">
            {struggles.map((st, idx) => {
              const selected = biggestStruggle === st;
              return (
                <button
                  key={idx}
                  onClick={() => setBiggestStruggle(st)}
                  className={`w-full text-left p-4 rounded-2xl border-2 transition-all cursor-pointer flex items-center space-x-3 ${
                    selected
                      ? 'border-[#FF5733] bg-[#FFF0EB] shadow-[4px_4px_0px_0px_#FF5733]'
                      : 'border-[#1A1A1A] bg-white hover:bg-[#F3F3F1] shadow-[2px_2px_0px_0px_#1A1A1A]'
                  }`}
                >
                  <div
                    className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 border-2 ${
                      selected ? 'bg-[#FF5733] border-[#FF5733] text-white' : 'border-[#1A1A1A]'
                    }`}
                  >
                    {selected && <CheckCircle2 className="w-3.5 h-3.5" />}
                  </div>
                  <span className="text-sm font-bold text-[#1A1A1A]">{st}</span>
                </button>
              );
            })}
          </div>

          <div className="flex items-center justify-between pt-4">
            <button
              onClick={() => setStep(3)}
              className="text-xs font-black uppercase tracking-wider text-[#4A4A4A] hover:text-[#1A1A1A] cursor-pointer"
            >
              Kembali
            </button>
            <button
              onClick={handleFinish}
              disabled={saving}
              className="px-7 py-3.5 rounded-xl bg-[#FF5733] text-white hover:bg-[#E84826] text-xs sm:text-sm font-black uppercase tracking-wider flex items-center space-x-2 border-2 border-[#1A1A1A] shadow-[4px_4px_0px_0px_#1A1A1A] hover:translate-x-0.5 hover:translate-y-0.5 transition-all cursor-pointer"
            >
              <span>{saving ? 'Menyimpan...' : 'Masuk Dashboard Belajar'}</span>
              <Sparkles className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
