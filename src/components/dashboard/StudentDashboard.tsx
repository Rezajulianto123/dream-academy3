import React from 'react';
import { useApp } from '../../context/AppContext';
import {
  Sparkles,
  Flame,
  ArrowRight,
  CheckCircle2,
  Play,
  Mic,
  Headphones,
  BookOpen,
  Target,
  Clock,
  Award,
  ChevronRight,
} from 'lucide-react';

export const StudentDashboard: React.FC = () => {
  const {
    currentUser,
    setCurrentView,
    courses,
    setActiveLesson,
    activeAssessmentResult,
  } = useApp();

  const activeCourse = courses[0];
  const userLevel = currentUser?.estimatedLevel || activeAssessmentResult?.estimatedLevel || 'A2';
  const streakDays = currentUser?.learningStreak || 7;
  const progress = currentUser?.progressPercent ?? 25;
  const currentFocus = currentUser?.currentFocus || activeAssessmentResult?.primaryFocus || 'Speaking Confidence';

  // Find next uncompleted lesson
  const allLessons = activeCourse.modules.flatMap((m) => m.lessons);
  const nextLesson =
    allLessons.find((l) => !(currentUser?.completedLessonIds || []).includes(l.id)) ||
    allLessons[0];

  const handleStartMission = () => {
    setActiveLesson(nextLesson);
    setCurrentView('lesson');
  };

  const handleOpenLesson = (lesson: any) => {
    setActiveLesson(lesson);
    setCurrentView('lesson');
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8 space-y-8">
      {/* 1. WELCOME & JOURNEY HEADER */}
      <div className="bg-white rounded-[32px] border-2 border-[#1A1A1A] p-6 sm:p-8 shadow-[8px_8px_0px_0px_#1A1A1A]">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b-2 border-[#1A1A1A]/10">
          <div>
            <div className="flex items-center space-x-2 text-[#FF5733] text-xs font-black uppercase tracking-widest mb-1">
              <span>Selamat Belajar 👋</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-[#1A1A1A] tracking-tight">
              Good day, {currentUser?.name?.split(' ')[0] || 'Learner'}!
            </h1>
          </div>

          <div className="flex items-center space-x-3">
            <div className="flex items-center space-x-2 bg-[#FFF0EB] border-2 border-[#FF5733] px-4 py-2 rounded-2xl text-[#FF5733] font-black text-xs uppercase tracking-wider shadow-[2px_2px_0px_0px_#FF5733]">
              <Flame className="w-4 h-4 fill-[#FF5733]" />
              <span>{streakDays} Day Streak</span>
            </div>

            <div className="flex items-center space-x-2 bg-[#F3F3F1] border-2 border-[#1A1A1A] px-4 py-2 rounded-2xl text-[#1A1A1A] font-black text-xs uppercase tracking-wider shadow-[2px_2px_0px_0px_#1A1A1A]">
              <Award className="w-4 h-4 text-[#FF5733]" />
              <span>Level: {userLevel} → B1</span>
            </div>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="pt-6 space-y-2">
          <div className="flex items-center justify-between text-xs font-black uppercase tracking-wider text-[#4A4A4A]">
            <span>Progress Kursus 30 Hari</span>
            <span className="text-[#1A1A1A]">{progress}% Selesai</span>
          </div>
          <div className="w-full bg-[#F3F3F1] border-2 border-[#1A1A1A] rounded-full h-3 overflow-hidden p-0.5">
            <div
              className="bg-[#FF5733] h-full rounded-full transition-all duration-500"
              style={{ width: `${Math.max(5, progress)}%` }}
            />
          </div>
        </div>
      </div>

      {/* 2. TODAY'S MISSION (HERO ACTION) */}
      <div className="bg-[#1A1A1A] text-white rounded-[32px] p-6 sm:p-10 border-2 border-[#1A1A1A] shadow-[8px_8px_0px_0px_#FF5733] relative overflow-hidden">
        <div className="relative z-10 max-w-2xl space-y-6">
          <div className="flex items-center space-x-2">
            <span className="bg-[#FF5733] text-white text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-md">
              What should I do today?
            </span>
            <span className="text-xs text-stone-400 font-bold uppercase tracking-wider">Target Hari Ini</span>
          </div>

          <div>
            <h2 className="text-3xl sm:text-4xl font-black italic tracking-tight text-white mb-2">
              TODAY'S MISSION
            </h2>
            <p className="text-sm sm:text-base text-stone-300 font-medium leading-relaxed">
              Materi rekomendasi hari ini: <strong className="text-white">"{nextLesson.title}"</strong>. Selesaikan 1 video singkat, 1 kuis pemahaman, dan 1 sesi latihan bicara dengan AI Coach.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
            <div className="bg-white/10 border-2 border-white/20 rounded-2xl p-4 flex items-center space-x-3">
              <Headphones className="w-5 h-5 text-[#FF5733] shrink-0" />
              <div>
                <span className="text-xs text-stone-300 font-bold block">🎧 Listening</span>
                <span className="text-sm font-black text-white">10 Menit</span>
              </div>
            </div>

            <div className="bg-white/10 border-2 border-white/20 rounded-2xl p-4 flex items-center space-x-3">
              <Mic className="w-5 h-5 text-[#FF5733] shrink-0" />
              <div>
                <span className="text-xs text-stone-300 font-bold block">🗣 Speaking</span>
                <span className="text-sm font-black text-white">15 Menit</span>
              </div>
            </div>

            <div className="bg-white/10 border-2 border-white/20 rounded-2xl p-4 flex items-center space-x-3">
              <BookOpen className="w-5 h-5 text-[#FF5733] shrink-0" />
              <div>
                <span className="text-xs text-stone-300 font-bold block">📚 Vocabulary</span>
                <span className="text-sm font-black text-white">10 Menit</span>
              </div>
            </div>
          </div>

          <div className="pt-2">
            <button
              id="btn-start-todays-mission"
              onClick={handleStartMission}
              className="w-full sm:w-auto px-8 py-4 rounded-xl bg-[#FF5733] hover:bg-[#E84826] text-white font-black text-xs sm:text-sm uppercase tracking-wider flex items-center justify-center space-x-2 shadow-[4px_4px_0px_0px_white] hover:translate-x-0.5 hover:translate-y-0.5 cursor-pointer transition-all"
            >
              <Play className="w-4 h-4 fill-white" />
              <span>START TODAY'S MISSION</span>
            </button>
          </div>
        </div>
      </div>

      {/* 3. FOCUS & RECOMMENDATION WIDGETS */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Card: Your Focus */}
        <div className="bg-white rounded-[28px] border-2 border-[#1A1A1A] p-6 shadow-[5px_5px_0px_0px_#1A1A1A] flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-black uppercase tracking-wider text-[#FF5733]">
                Fokus Utama
              </span>
              <Target className="w-5 h-5 text-[#FF5733]" />
            </div>
            <h3 className="text-xl font-black text-[#1A1A1A] mb-2 tracking-tight">
              🗣 {currentFocus}
            </h3>
            <p className="text-xs sm:text-sm text-[#4A4A4A] font-medium leading-relaxed mb-4">
              AI memprioritaskan latihan yang melatih reflek spontanitas tanpa menerjemahkan satu per satu di kepala.
            </p>
          </div>
          <button
            onClick={() => setCurrentView('speaking-studio')}
            className="w-full py-3 rounded-xl bg-[#FFF0EB] border-2 border-[#FF5733] hover:bg-[#FFE2D9] text-[#FF5733] text-xs font-black uppercase tracking-wider flex items-center justify-center space-x-2 transition-all cursor-pointer"
          >
            <Mic className="w-3.5 h-3.5 text-[#FF5733]" />
            <span>Buka AI Speaking Coach</span>
          </button>
        </div>

        {/* Card: Quick Diagnostic Recall */}
        <div className="bg-white rounded-[28px] border-2 border-[#1A1A1A] p-6 shadow-[5px_5px_0px_0px_#1A1A1A] flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-black uppercase tracking-wider text-[#1A1A1A]">
                Rekomendasi Jalur
              </span>
              <Sparkles className="w-5 h-5 text-[#FF5733]" />
            </div>
            <h3 className="text-xl font-black text-[#1A1A1A] mb-2 tracking-tight">
              30-Day Speaking Confidence
            </h3>
            <p className="text-xs sm:text-sm text-[#4A4A4A] font-medium leading-relaxed mb-4">
              {currentUser?.speakingSituation
                ? `Disesuaikan untuk target: "${currentUser.speakingSituation}"`
                : 'Fokus mengubah pemahaman grammar pasif menjadi kalimat yang mengalir natural.'}
            </p>
          </div>
          <button
            onClick={() => setCurrentView('assessment-result')}
            className="w-full py-3 rounded-xl border-2 border-[#1A1A1A] bg-white hover:bg-[#F3F3F1] text-[#1A1A1A] text-xs font-black uppercase tracking-wider flex items-center justify-center space-x-1.5 transition-colors cursor-pointer"
          >
            <span>Lihat Profil Diagnostik Lengkap</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* 4. LEARNING PATH CURRICULUM SYLLABUS */}
      <div className="bg-white rounded-[32px] border-2 border-[#1A1A1A] p-6 sm:p-8 shadow-[8px_8px_0px_0px_#1A1A1A] space-y-6">
        <div>
          <div className="text-xs uppercase font-black tracking-widest text-[#FF5733] mb-1">
            Kurikulum Terstruktur
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-[#1A1A1A] tracking-tight">
            {activeCourse.title}
          </h2>
          <p className="text-xs sm:text-sm text-[#4A4A4A] font-medium mt-1">
            Selesaikan setiap modul secara berurutan. Setiap pelajaran dilengkapi video, catatan ringkas, kuis, dan latihan berbicara dengan AI.
          </p>
        </div>

        <div className="space-y-6">
          {activeCourse.modules.map((mod) => (
            <div key={mod.id} className="border-2 border-[#1A1A1A] rounded-2xl overflow-hidden shadow-[4px_4px_0px_0px_#1A1A1A]">
              <div className="bg-[#F3F3F1] px-5 py-4 border-b-2 border-[#1A1A1A] flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-black text-[#1A1A1A] uppercase tracking-wide">{mod.title}</h3>
                  <p className="text-xs text-[#4A4A4A] font-semibold mt-0.5">{mod.description}</p>
                </div>
                <span className="text-xs font-black text-[#FF5733] bg-[#FFF0EB] border border-[#FF5733] px-2.5 py-1 rounded-md shrink-0">
                  {mod.lessons.length} Pelajaran
                </span>
              </div>

              <div className="divide-y-2 divide-[#1A1A1A]/10">
                {mod.lessons.map((lesson, idx) => {
                  const isCompleted = (currentUser?.completedLessonIds || []).includes(lesson.id);
                  const isNext = nextLesson.id === lesson.id;
                  return (
                    <div
                      key={lesson.id}
                      className={`p-4 sm:p-5 flex items-center justify-between transition-colors ${
                        isNext ? 'bg-[#FFF0EB]/40' : 'hover:bg-[#FDFCFB]'
                      }`}
                    >
                      <div className="flex items-start space-x-3.5 max-w-xl">
                        <div className="mt-1 shrink-0">
                          {isCompleted ? (
                            <div className="w-6 h-6 rounded-lg bg-[#1A1A1A] text-white flex items-center justify-center">
                              <CheckCircle2 className="w-4 h-4 text-[#FF5733]" />
                            </div>
                          ) : isNext ? (
                            <div className="w-6 h-6 rounded-lg bg-[#FF5733] text-white flex items-center justify-center text-xs font-black animate-bounce">
                              <Play className="w-3 h-3 fill-white" />
                            </div>
                          ) : (
                            <div className="w-6 h-6 rounded-lg border-2 border-[#1A1A1A] bg-[#F3F3F1] text-[#1A1A1A] flex items-center justify-center text-xs font-black">
                              {idx + 1}
                            </div>
                          )}
                        </div>

                        <div>
                          <div className="flex items-center space-x-2">
                            <h4 className="text-sm font-black text-[#1A1A1A] leading-snug">
                              {lesson.title}
                            </h4>
                            {isNext && (
                              <span className="text-[10px] uppercase font-black bg-[#FF5733] text-white px-2 py-0.5 rounded-md">
                                Next Up
                              </span>
                            )}
                          </div>
                          <p className="text-xs font-medium text-[#4A4A4A] mt-1 line-clamp-1">
                            {lesson.subtitle}
                          </p>
                          <div className="flex items-center space-x-3 mt-2 text-[11px] font-bold text-[#4A4A4A]">
                            <span className="flex items-center space-x-1">
                              <Clock className="w-3 h-3" />
                              <span>{lesson.durationMinutes} menit</span>
                            </span>
                            <span>•</span>
                            <span>Video + Quiz + AI Speaking</span>
                          </div>
                        </div>
                      </div>

                      <button
                        onClick={() => handleOpenLesson(lesson)}
                        className={`px-4 py-2.5 rounded-xl text-xs font-black uppercase tracking-wider transition-all cursor-pointer flex items-center space-x-1.5 shrink-0 ${
                          isCompleted
                            ? 'bg-[#F3F3F1] border-2 border-[#1A1A1A] text-[#1A1A1A] hover:bg-stone-200'
                            : isNext
                            ? 'bg-[#FF5733] text-white hover:bg-[#E84826] shadow-[3px_3px_0px_0px_#1A1A1A]'
                            : 'border-2 border-[#1A1A1A] bg-white text-[#1A1A1A] hover:bg-[#F3F3F1]'
                        }`}
                      >
                        <span>{isCompleted ? 'Pelajari Ulang' : 'Mulai Pelajaran'}</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
