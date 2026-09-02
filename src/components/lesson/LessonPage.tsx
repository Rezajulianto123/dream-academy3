import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  ArrowLeft,
  ArrowRight,
  Play,
  Volume2,
  CheckCircle2,
  AlertCircle,
  BookOpen,
  Mic,
  Award,
  Sparkles,
  HelpCircle,
} from 'lucide-react';

export const LessonPage: React.FC = () => {
  const {
    activeLesson,
    setCurrentView,
    markLessonComplete,
    markQuizComplete,
    currentUser,
    courses,
    setActiveLesson,
    speakText,
    isSpeakingAudio,
  } = useApp();

  const [activeTab, setActiveTab] = useState<'watch' | 'learn' | 'quiz' | 'speak'>('watch');
  const [selectedQuizAnswers, setSelectedQuizAnswers] = useState<Record<string, string>>({});
  const [showQuizResults, setShowQuizResults] = useState(false);
  const [isCompletedState, setIsCompletedState] = useState(false);

  if (!activeLesson) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-20 text-center">
        <p className="text-stone-500 mb-4">Pelajaran tidak ditemukan.</p>
        <button
          onClick={() => setCurrentView('dashboard')}
          className="px-4 py-2 bg-stone-900 text-white rounded-xl text-xs font-bold"
        >
          Kembali ke Dashboard
        </button>
      </div>
    );
  }

  const isAlreadyCompleted = (currentUser?.completedLessonIds || []).includes(activeLesson.id);

  const handleSelectQuiz = (quizId: string, optionId: string) => {
    setSelectedQuizAnswers((prev) => ({
      ...prev,
      [quizId]: optionId,
    }));
  };

  const handleFinishQuiz = async () => {
    setShowQuizResults(true);
    await markQuizComplete(activeLesson.id);
  };

  const handleMarkComplete = async () => {
    await markLessonComplete(activeLesson.id);
    setIsCompletedState(true);
  };

  // Find next lesson
  const allLessons = courses[0].modules.flatMap((m) => m.lessons);
  const currentIndex = allLessons.findIndex((l) => l.id === activeLesson.id);
  const nextLesson = currentIndex >= 0 && currentIndex < allLessons.length - 1 ? allLessons[currentIndex + 1] : null;

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 space-y-8">
      {/* Navigation Top Bar */}
      <div className="flex items-center justify-between pb-4 border-b-2 border-[#1A1A1A]/10">
        <button
          onClick={() => setCurrentView('dashboard')}
          className="flex items-center space-x-1.5 text-xs font-black uppercase tracking-wider text-[#1A1A1A] hover:text-[#FF5733] transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Kembali ke Dashboard</span>
        </button>

        <div className="flex items-center space-x-2">
          {isAlreadyCompleted || isCompletedState ? (
            <span className="flex items-center space-x-1 text-xs font-black uppercase tracking-wider text-emerald-800 bg-emerald-100 px-3.5 py-1.5 rounded-full border-2 border-[#1A1A1A] shadow-[2px_2px_0px_0px_#1A1A1A]">
              <CheckCircle2 className="w-4 h-4 text-emerald-700" />
              <span>Pelajaran Selesai</span>
            </span>
          ) : (
            <button
              onClick={handleMarkComplete}
              className="text-xs font-black uppercase tracking-wider px-4 py-2 rounded-xl bg-[#1A1A1A] text-white hover:bg-black transition-all cursor-pointer flex items-center space-x-1.5 border-2 border-[#1A1A1A] shadow-[3px_3px_0px_0px_#1A1A1A] hover:translate-x-0.5 hover:translate-y-0.5"
            >
              <CheckCircle2 className="w-4 h-4 text-[#FF5733]" />
              <span>Tandai Selesai</span>
            </button>
          )}
        </div>
      </div>

      {/* Lesson Header Intro */}
      <div className="space-y-3">
        <div className="flex items-center space-x-2 text-xs font-black uppercase tracking-widest text-[#FF5733]">
          <span>{activeLesson.focusArea || 'Praktek Berbicara Spontan'}</span>
          <span>•</span>
          <span>Durasi ~{activeLesson.durationMinutes} Menit</span>
        </div>
        <h1 className="text-2xl sm:text-4xl font-black text-[#1A1A1A] tracking-tight">
          {activeLesson.title}
        </h1>
        <p className="text-sm sm:text-base text-[#4A4A4A] font-semibold leading-relaxed">
          {activeLesson.subtitle}
        </p>

        {/* Goal Callout */}
        <div className="bg-[#FFF0EB] border-2 border-[#FF5733] rounded-[24px] p-5 flex items-start space-x-3.5 text-xs sm:text-sm font-semibold shadow-[4px_4px_0px_0px_#FF5733]">
          <Sparkles className="w-5 h-5 text-[#FF5733] shrink-0 mt-0.5" />
          <div>
            <strong className="block text-[#FF5733] text-xs font-black uppercase tracking-wider mb-0.5">
              Target Kemampuan Hari Ini:
            </strong>
            <span className="text-[#1A1A1A]">{activeLesson.objective || activeLesson.subtitle}</span>
          </div>
        </div>
      </div>

      {/* Sub-Navigation Tabs */}
      <div className="flex items-center space-x-2 border-b-2 border-[#1A1A1A]/10 text-xs sm:text-sm font-black uppercase tracking-wider overflow-x-auto pb-1">
        <button
          onClick={() => setActiveTab('watch')}
          className={`pb-3 px-3 transition-colors cursor-pointer flex items-center space-x-1.5 whitespace-nowrap ${
            activeTab === 'watch'
              ? 'border-b-2 border-[#FF5733] text-[#FF5733]'
              : 'text-[#4A4A4A] hover:text-[#1A1A1A]'
          }`}
        >
          <Play className="w-4 h-4" />
          <span>1. Watch Video</span>
        </button>

        <button
          onClick={() => setActiveTab('learn')}
          className={`pb-3 px-3 transition-colors cursor-pointer flex items-center space-x-1.5 whitespace-nowrap ${
            activeTab === 'learn'
              ? 'border-b-2 border-[#FF5733] text-[#FF5733]'
              : 'text-[#4A4A4A] hover:text-[#1A1A1A]'
          }`}
        >
          <BookOpen className="w-4 h-4" />
          <span>2. Vocabulary & Notes</span>
        </button>

        <button
          onClick={() => setActiveTab('quiz')}
          className={`pb-3 px-3 transition-colors cursor-pointer flex items-center space-x-1.5 whitespace-nowrap ${
            activeTab === 'quiz'
              ? 'border-b-2 border-[#FF5733] text-[#FF5733]'
              : 'text-[#4A4A4A] hover:text-[#1A1A1A]'
          }`}
        >
          <HelpCircle className="w-4 h-4" />
          <span>3. Quick Quiz</span>
        </button>

        <button
          onClick={() => setActiveTab('speak')}
          className={`pb-3 px-3 transition-colors cursor-pointer flex items-center space-x-1.5 whitespace-nowrap ${
            activeTab === 'speak'
              ? 'border-b-2 border-[#FF5733] text-[#FF5733]'
              : 'text-[#4A4A4A] hover:text-[#1A1A1A]'
          }`}
        >
          <Mic className="w-4 h-4 text-[#FF5733]" />
          <span>4. Speaking Practice</span>
        </button>
      </div>

      {/* TAB 1: WATCH VIDEO */}
      {activeTab === 'watch' && (
        <div className="space-y-6">
          <div className="aspect-video w-full rounded-[24px] overflow-hidden bg-black shadow-[6px_6px_0px_0px_#1A1A1A] border-2 border-[#1A1A1A]">
            <iframe
              className="w-full h-full"
              src={`https://www.youtube-nocookie.com/embed/${activeLesson.youtubeId || (activeLesson as any).youtubeVideoId || 'd84hU4xR4vQ'}?rel=0&modestbranding=1`}
              title={activeLesson.title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>

          <div className="bg-white rounded-[24px] p-6 sm:p-8 border-2 border-[#1A1A1A] shadow-[6px_6px_0px_0px_#1A1A1A] space-y-4">
            <h3 className="text-lg font-black text-[#1A1A1A] tracking-tight">
              Poin Kunci Pelajaran Ini (Key Takeaways):
            </h3>
            <ul className="space-y-2 text-sm font-semibold text-[#4A4A4A] leading-relaxed">
              {(activeLesson.keyTakeaways || []).map((point, idx) => (
                <li key={idx} className="flex items-start space-x-2">
                  <span className="text-[#FF5733] font-black">•</span>
                  <span>{point}</span>
                </li>
              ))}
            </ul>

            <div className="pt-4 flex justify-end">
              <button
                onClick={() => setActiveTab('learn')}
                className="px-6 py-3 rounded-xl bg-[#FF5733] text-white hover:bg-[#E84826] text-xs font-black uppercase tracking-wider flex items-center space-x-2 cursor-pointer border-2 border-[#1A1A1A] shadow-[3px_3px_0px_0px_#1A1A1A] hover:translate-x-0.5 hover:translate-y-0.5 transition-all"
              >
                <span>Lanjut ke Vocabulary & Pola Kalimat</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: LEARN VOCABULARY & FRAMEWORKS */}
      {activeTab === 'learn' && (
        <div className="space-y-6">
          <div className="bg-white rounded-[24px] p-6 sm:p-8 border-2 border-[#1A1A1A] shadow-[6px_6px_0px_0px_#1A1A1A] space-y-4">
            <h3 className="text-lg font-black text-[#1A1A1A] tracking-tight">
              Kosakata Praktis (Active Vocabulary)
            </h3>
            <p className="text-xs text-[#4A4A4A] font-semibold">
              Klik tombol audio di setiap kartu untuk mendengarkan pelafalan natural native speaker.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
              {(activeLesson.vocabularyNotes || []).map((vocab, idx) => (
                <div
                  key={idx}
                  className="p-5 rounded-2xl border-2 border-[#1A1A1A] bg-[#FDFCFB] hover:bg-[#F3F3F1] transition-all flex flex-col justify-between shadow-[3px_3px_0px_0px_#1A1A1A]"
                >
                  <div>
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="font-black text-[#1A1A1A] text-sm sm:text-base">{vocab.phrase}</span>
                      <button
                        onClick={() => speakText(vocab.phrase)}
                        title="Dengarkan pengucapan"
                        className="p-1.5 text-[#FF5733] bg-[#FFF0EB] border-2 border-[#FF5733] rounded-lg transition-colors cursor-pointer shadow-[2px_2px_0px_0px_#FF5733]"
                      >
                        <Volume2 className="w-4 h-4" />
                      </button>
                    </div>
                    <span className="text-xs font-semibold text-[#4A4A4A] block mb-3">{vocab.meaningId}</span>
                  </div>

                  <div className="pt-2 border-t-2 border-[#1A1A1A]/10">
                    <span className="text-[10px] font-black uppercase tracking-wider text-[#4A4A4A] block mb-0.5">Contoh Kalimat:</span>
                    <p className="text-xs text-[#1A1A1A] italic font-semibold">"{vocab.exampleSentence}"</p>
                  </div>
                </div>
              ))}
            </div>

            {activeLesson.notesMarkdown && (
              <div className="mt-6 p-6 rounded-2xl bg-[#FDFCFB] border-2 border-[#1A1A1A] text-xs sm:text-sm leading-relaxed text-[#1A1A1A] space-y-2 whitespace-pre-line shadow-[2px_2px_0px_0px_#1A1A1A]">
                {activeLesson.notesMarkdown}
              </div>
            )}
          </div>

          <div className="flex items-center justify-between pt-2">
            <button
              onClick={() => setActiveTab('watch')}
              className="text-xs font-black uppercase tracking-wider text-[#4A4A4A] hover:text-[#1A1A1A] cursor-pointer"
            >
              Kembali ke Video
            </button>
            <button
              onClick={() => setActiveTab('quiz')}
              className="px-6 py-3 rounded-xl bg-[#FF5733] text-white hover:bg-[#E84826] text-xs font-black uppercase tracking-wider flex items-center space-x-2 cursor-pointer border-2 border-[#1A1A1A] shadow-[3px_3px_0px_0px_#1A1A1A] hover:translate-x-0.5 hover:translate-y-0.5 transition-all"
            >
              <span>Uji Pemahaman (Quick Quiz)</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* TAB 3: QUIZ */}
      {activeTab === 'quiz' && (
        <div className="space-y-6">
          <div className="space-y-6">
            {(activeLesson.quizQuestions || []).map((q, idx) => {
              const selectedAnswer = selectedQuizAnswers[q.id];
              return (
                <div key={q.id} className="bg-white rounded-[24px] p-6 sm:p-8 border-2 border-[#1A1A1A] shadow-[6px_6px_0px_0px_#1A1A1A] space-y-4">
                  <div className="flex items-center justify-between text-xs text-[#FF5733] font-black uppercase tracking-wider">
                    <span>Pertanyaan {idx + 1} dari {(activeLesson.quizQuestions || []).length}</span>
                  </div>

                  <h3 className="text-base sm:text-lg font-black text-[#1A1A1A]">{q.question}</h3>

                  <div className="space-y-3">
                    {(q.options || []).map((optText, optIdx) => {
                      const optId = String(optIdx);
                      const isOptionSelected = selectedAnswer === optId;
                      const isCorrect = optIdx === q.correctIndex;
                      let optionStyle = 'border-2 border-[#1A1A1A] bg-white hover:bg-[#F3F3F1] shadow-[2px_2px_0px_0px_#1A1A1A] font-semibold text-[#1A1A1A]';

                      if (showQuizResults) {
                        if (isCorrect) {
                          optionStyle = 'border-2 border-emerald-600 bg-emerald-100 text-emerald-950 font-black shadow-[3px_3px_0px_0px_emerald-700]';
                        } else if (isOptionSelected && !isCorrect) {
                          optionStyle = 'border-2 border-red-500 bg-red-100 text-red-950 font-black';
                        }
                      } else if (isOptionSelected) {
                        optionStyle = 'border-2 border-[#FF5733] bg-[#FFF0EB] shadow-[4px_4px_0px_0px_#FF5733] font-black text-[#1A1A1A]';
                      }

                      return (
                        <button
                          key={optIdx}
                          disabled={showQuizResults}
                          onClick={() => handleSelectQuiz(q.id, optId)}
                          className={`w-full text-left p-4 rounded-xl text-xs sm:text-sm transition-all cursor-pointer flex items-center justify-between ${optionStyle}`}
                        >
                          <span>{optText}</span>
                          {showQuizResults && isCorrect && (
                            <CheckCircle2 className="w-5 h-5 text-emerald-700 shrink-0" />
                          )}
                          {showQuizResults && isOptionSelected && !isCorrect && (
                            <AlertCircle className="w-5 h-5 text-red-600 shrink-0" />
                          )}
                        </button>
                      );
                    })}
                  </div>

                  {showQuizResults && (
                    <div className="mt-4 p-4 rounded-xl bg-[#F3F3F1] border-2 border-[#1A1A1A] text-xs font-semibold text-[#1A1A1A] leading-relaxed">
                      <strong className="font-black text-[#FF5733] uppercase tracking-wider block mb-1">Penjelasan:</strong>
                      {q.explanation}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          <div className="flex items-center justify-between pt-2">
            {!showQuizResults ? (
              <button
                onClick={handleFinishQuiz}
                disabled={Object.keys(selectedQuizAnswers).length === 0}
                className="px-7 py-3.5 rounded-xl bg-[#1A1A1A] text-white hover:bg-black text-xs font-black uppercase tracking-wider cursor-pointer disabled:opacity-50 border-2 border-[#1A1A1A] shadow-[4px_4px_0px_0px_#1A1A1A] hover:translate-x-0.5 hover:translate-y-0.5 transition-all"
              >
                Periksa Jawaban
              </button>
            ) : (
              <div className="flex flex-col sm:flex-row items-center space-y-3 sm:space-y-0 sm:space-x-3 w-full justify-between">
                <span className="text-xs text-emerald-800 font-black uppercase tracking-wider flex items-center space-x-1.5">
                  <CheckCircle2 className="w-5 h-5 text-emerald-700" />
                  <span>Kuis Selesai! Saatnya Praktik Bicara.</span>
                </span>
                <button
                  onClick={() => setActiveTab('speak')}
                  className="px-7 py-3.5 rounded-xl bg-[#FF5733] text-white hover:bg-[#E84826] text-xs font-black uppercase tracking-wider flex items-center space-x-2 cursor-pointer border-2 border-[#1A1A1A] shadow-[4px_4px_0px_0px_#1A1A1A] hover:translate-x-0.5 hover:translate-y-0.5 transition-all"
                >
                  <span>Mulai Praktik dengan AI Coach</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* TAB 4: SPEAKING PRACTICE */}
      {activeTab === 'speak' && (
        <div className="space-y-6">
          <div className="bg-[#1A1A1A] text-white rounded-[28px] p-6 sm:p-8 space-y-6 border-2 border-[#FF5733] shadow-[8px_8px_0px_0px_#FF5733]">
            <div className="inline-flex items-center space-x-1.5 bg-[#FF5733] text-white px-3.5 py-1 rounded-full text-xs font-black uppercase tracking-widest border-2 border-white shadow-[2px_2px_0px_0px_#1A1A1A]">
              <Mic className="w-3.5 h-3.5" />
              <span>Simulasi Roleplay Berbicara</span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              {activeLesson.speakingPrompt?.scenario || 'Simulasi Percakapan Bahasa Inggris'}
            </h2>

            <div className="space-y-3 bg-[#242424] p-5 rounded-2xl border-2 border-stone-700">
              <span className="text-xs font-black uppercase tracking-widest text-[#FF5733] block">
                Target Praktik Kamu:
              </span>
              <ul className="space-y-1.5 text-sm text-stone-200 font-semibold">
                {(activeLesson.speakingPrompt?.guideBulletPoints || []).map((pt, i) => (
                  <li key={i} className="flex items-start space-x-2">
                    <span className="text-[#FF5733] font-black">•</span>
                    <span>{pt}</span>
                  </li>
                ))}
              </ul>

              {activeLesson.speakingPrompt?.aiStartingMessage && (
                <div className="pt-2 border-t border-stone-700">
                  <span className="text-xs text-stone-400 font-semibold block mb-1">
                    Contoh Kalimat Pembuka AI Coach:
                  </span>
                  <p className="text-xs text-amber-300 italic font-mono font-semibold">
                    "{activeLesson.speakingPrompt.aiStartingMessage}"
                  </p>
                </div>
              )}
            </div>

            <div className="pt-2 flex flex-col sm:flex-row items-center gap-3">
              <button
                id="btn-launch-ai-coach"
                onClick={() => setCurrentView('speaking-studio')}
                className="w-full sm:w-auto px-7 py-4 rounded-xl bg-[#FF5733] text-white hover:bg-[#E84826] font-black text-xs sm:text-sm uppercase tracking-wider flex items-center justify-center space-x-2 cursor-pointer shadow-[4px_4px_0px_0px_white] hover:translate-x-0.5 hover:translate-y-0.5 transition-all"
              >
                <Mic className="w-4 h-4" />
                <span>Masuk ke AI Speaking Studio</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={handleMarkComplete}
                className="w-full sm:w-auto px-5 py-3.5 rounded-xl border-2 border-stone-600 text-stone-200 hover:bg-stone-800 text-xs font-black uppercase tracking-wider transition-colors cursor-pointer"
              >
                Selesaikan Pelajaran Ini
              </button>
            </div>
          </div>

          {/* Next Lesson Recommendation Card */}
          {nextLesson && (
            <div className="p-6 rounded-[24px] bg-white border-2 border-[#1A1A1A] flex items-center justify-between shadow-[4px_4px_0px_0px_#1A1A1A]">
              <div>
                <span className="text-[10px] font-black uppercase tracking-widest text-[#FF5733] block mb-1">
                  Pelajaran Berikutnya
                </span>
                <h4 className="text-base font-black text-[#1A1A1A]">{nextLesson.title}</h4>
                <p className="text-xs text-[#4A4A4A] font-semibold">{nextLesson.subtitle}</p>
              </div>
              <button
                onClick={() => {
                  setActiveLesson(nextLesson);
                  setActiveTab('watch');
                  setShowQuizResults(false);
                  setSelectedQuizAnswers({});
                }}
                className="px-5 py-3 rounded-xl bg-[#1A1A1A] text-white hover:bg-black text-xs font-black uppercase tracking-wider flex items-center space-x-2 cursor-pointer shrink-0 border-2 border-[#1A1A1A] shadow-[3px_3px_0px_0px_#1A1A1A] hover:translate-x-0.5 hover:translate-y-0.5 transition-all"
              >
                <span>Buka Pelajaran</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
