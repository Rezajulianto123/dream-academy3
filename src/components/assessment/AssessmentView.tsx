import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { ASSESSMENT_QUESTIONS } from '../../data/initialContent';
import { AssessmentQuestion } from '../../types';
import { api } from '../../services/api';
import {
  Volume2,
  Mic,
  MicOff,
  ArrowRight,
  ArrowLeft,
  Sparkles,
  CheckCircle2,
  AlertCircle,
  Clock,
  Loader2,
} from 'lucide-react';

export const AssessmentView: React.FC = () => {
  const {
    setCurrentView,
    setActiveAssessmentResult,
    speakText,
    isSpeakingAudio,
    stopAudio,
    currentUser,
  } = useApp();

  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string | number>>({});
  const [spokenInput, setSpokenInput] = useState<string>('');
  const [isRecording, setIsRecording] = useState<boolean>(false);
  const [isAnalyzing, setIsAnalyzing] = useState<boolean>(false);
  const [analysisStep, setAnalysisStep] = useState<string>('Memulai analisis diagnostik...');
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const currentQuestion: AssessmentQuestion = ASSESSMENT_QUESTIONS[currentIndex];
  const totalQuestions = ASSESSMENT_QUESTIONS.length;
  const progressPercent = Math.round(((currentIndex + 1) / totalQuestions) * 100);

  // Web Speech Recognition for the speaking prompt question
  useEffect(() => {
    let recognition: any = null;
    if (typeof window !== 'undefined') {
      const SpeechRecognition =
        (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      if (SpeechRecognition && isRecording) {
        try {
          recognition = new SpeechRecognition();
          recognition.continuous = true;
          recognition.interimResults = true;
          recognition.lang = 'en-US';

          recognition.onresult = (event: any) => {
            let current = '';
            for (let i = 0; i < event.results.length; i++) {
              current += event.results[i][0].transcript + ' ';
            }
            setSpokenInput(current.trim());
          };

          recognition.onerror = (err: any) => {
            console.error('Speech recognition error:', err);
            setIsRecording(false);
          };

          recognition.onend = () => {
            setIsRecording(false);
          };

          recognition.start();
        } catch (e) {
          console.error('Speech recognition start failed:', e);
          setIsRecording(false);
        }
      }
    }

    return () => {
      if (recognition) {
        try {
          recognition.stop();
        } catch {}
      }
    };
  }, [isRecording]);

  const handleSelectOption = (optionId: string, scoreValue?: number) => {
    setAnswers((prev) => ({
      ...prev,
      [currentQuestion.id]: optionId,
      [`${currentQuestion.id}_score`]: scoreValue ?? 50,
    }));
  };

  const handleNext = async () => {
    stopAudio();
    if (currentIndex < totalQuestions - 1) {
      setCurrentIndex((prev) => prev + 1);
    } else {
      await submitAssessment();
    }
  };

  const handlePrev = () => {
    stopAudio();
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
    }
  };

  const submitAssessment = async () => {
    setIsAnalyzing(true);
    setErrorMsg(null);

    // Dynamic analysis steps to reassure user
    const steps = [
      'Menghitung skor 6 dimensi (Grammar, Vocab, Reading, Listening, Speaking, Confidence)...',
      'Menganalisis kecenderungan mental block & speaking barrier...',
      'Merumuskan Dream Academy Estimated CEFR Level...',
      'Menyusun rekomendasi kurikulum personal 30 hari...',
    ];

    let stepIndex = 0;
    const interval = setInterval(() => {
      stepIndex = (stepIndex + 1) % steps.length;
      setAnalysisStep(steps[stepIndex]);
    }, 900);

    try {
      // Aggregate raw scores per dimension
      let dimScores: Record<string, number[]> = {
        grammar: [],
        vocabulary: [],
        reading: [],
        listening: [],
        speaking: [],
        confidence: [],
      };

      ASSESSMENT_QUESTIONS.forEach((q) => {
        const val = answers[`${q.id}_score`];
        if (typeof val === 'number') {
          dimScores[q.dimension].push(val);
        }
      });

      const calcAverage = (arr: number[]) => {
        if (!arr.length) return 50;
        return Math.round(arr.reduce((a, b) => a + b, 0) / arr.length);
      };

      const rawScores = {
        grammar: calcAverage(dimScores.grammar),
        vocabulary: calcAverage(dimScores.vocabulary),
        reading: calcAverage(dimScores.reading),
        listening: calcAverage(dimScores.listening),
        speaking: calcAverage(dimScores.speaking),
        confidence: calcAverage(dimScores.confidence),
      };

      const result = await api.analyzeAssessment({
        answers,
        rawScores,
        userNotes: spokenInput,
      });

      // Attach user info
      result.id = `ass-${Date.now()}`;
      result.createdAt = new Date().toISOString();
      result.answers = answers;
      if (currentUser) {
        result.userId = currentUser.id;
        result.userEmail = currentUser.email;
        result.userName = currentUser.name;
      }

      await api.saveAssessment(result);
      setActiveAssessmentResult(result);

      clearInterval(interval);
      setIsAnalyzing(false);
      setCurrentView('assessment-result');
    } catch (err: any) {
      clearInterval(interval);
      setIsAnalyzing(false);
      setErrorMsg(err.message || 'Terjadi kendala saat menganalisis hasil assessment.');
    }
  };

  const isCurrentAnswered = () => {
    if (currentQuestion.type === 'speaking-prompt') {
      return true; // Optional spoken prompt
    }
    return answers[currentQuestion.id] !== undefined;
  };

  if (isAnalyzing) {
    return (
      <div className="max-w-xl mx-auto px-4 py-20 text-center">
        <div className="bg-white rounded-[32px] p-10 border-2 border-[#1A1A1A] shadow-[10px_10px_0px_0px_#1A1A1A] space-y-6">
          <div className="w-16 h-16 bg-[#FFF0EB] text-[#FF5733] border-2 border-[#FF5733] rounded-2xl flex items-center justify-center mx-auto animate-bounce">
            <Sparkles className="w-8 h-8" />
          </div>

          <h2 className="text-2xl sm:text-3xl font-black text-[#1A1A1A] tracking-tight">
            ANALYZING YOUR ENGLISH PROFILE...
          </h2>

          <p className="text-sm font-bold text-[#4A4A4A] max-w-sm mx-auto leading-relaxed">
            {analysisStep}
          </p>

          <div className="w-full bg-[#F3F3F1] border-2 border-[#1A1A1A] rounded-full h-3 overflow-hidden p-0.5">
            <div className="bg-[#FF5733] h-full w-2/3 animate-[pulse_1s_ease-in-out_infinite] rounded-full" />
          </div>

          <p className="text-xs font-bold text-[#1A1A1A]/60 uppercase tracking-wider">
            Mohon tunggu sebentar, AI sedang memetakan kekuatan & peluang latihanmu.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-8">
      {/* Header & Progress Indicator */}
      <div className="mb-8">
        <div className="flex items-center justify-between text-xs font-black uppercase tracking-widest text-[#1A1A1A] mb-3">
          <span className="text-[#FF5733] bg-[#FFF0EB] border border-[#FF5733] px-3 py-1 rounded-md">
            Dimensi: {currentQuestion.dimension}
          </span>
          <span className="text-[#4A4A4A]">
            Pertanyaan {currentIndex + 1} / {totalQuestions}
          </span>
        </div>

        <div className="w-full bg-[#F3F3F1] border-2 border-[#1A1A1A] rounded-full h-3 overflow-hidden">
          <div
            className="bg-[#FF5733] h-full transition-all duration-300"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </div>

      {errorMsg && (
        <div className="mb-6 p-4 rounded-2xl bg-red-50 border-2 border-red-500 text-red-900 text-sm flex items-center justify-between shadow-[4px_4px_0px_0px_red]">
          <div className="flex items-center space-x-2">
            <AlertCircle className="w-5 h-5 shrink-0 text-red-600" />
            <span className="font-bold">{errorMsg}</span>
          </div>
          <button
            onClick={submitAssessment}
            className="px-3 py-1.5 bg-red-600 text-white rounded-xl text-xs font-black uppercase tracking-wider cursor-pointer"
          >
            Coba Lagi
          </button>
        </div>
      )}

      {/* Main Question Card */}
      <div className="bg-white rounded-[32px] p-6 sm:p-10 border-2 border-[#1A1A1A] shadow-[8px_8px_0px_0px_#1A1A1A] space-y-6">
        <div>
          <h2 className="text-xl sm:text-2xl font-black text-[#1A1A1A] leading-snug tracking-tight">
            {currentQuestion.title}
          </h2>
          {currentQuestion.subtitle && (
            <p className="text-sm font-semibold text-[#4A4A4A] mt-2">{currentQuestion.subtitle}</p>
          )}
        </div>

        {/* Audio Player for Listening dimension */}
        {currentQuestion.audioPrompt && (
          <div className="bg-[#FFF0EB] border-2 border-[#FF5733] rounded-2xl p-5 flex items-center justify-between">
            <div className="space-y-1">
              <span className="text-xs font-black uppercase tracking-wider text-[#FF5733] block">
                Audio Listening
              </span>
              <p className="text-xs font-bold text-[#1A1A1A]">
                Klik tombol di samping untuk mendengarkan pelafalan audio penutur.
              </p>
            </div>
            <button
              onClick={() => {
                if (isSpeakingAudio) {
                  stopAudio();
                } else if (currentQuestion.audioPrompt) {
                  speakText(currentQuestion.audioPrompt);
                }
              }}
              className={`px-4 py-2.5 rounded-xl font-black text-xs uppercase tracking-wider flex items-center space-x-2 transition-all cursor-pointer shadow-[3px_3px_0px_0px_#1A1A1A] ${
                isSpeakingAudio
                  ? 'bg-[#FF5733] text-white animate-pulse'
                  : 'bg-[#1A1A1A] text-white hover:bg-black'
              }`}
            >
              <Volume2 className="w-4 h-4" />
              <span>{isSpeakingAudio ? 'Memutar...' : 'Putar Audio'}</span>
            </button>
          </div>
        )}

        {/* Scenario / Reading Passage */}
        {currentQuestion.scenario && (
          <div className="bg-[#F3F3F1] border-2 border-[#1A1A1A] rounded-2xl p-5 font-mono text-xs sm:text-sm text-[#1A1A1A] whitespace-pre-line leading-relaxed font-semibold">
            {currentQuestion.scenario}
          </div>
        )}

        {/* Options (Multiple Choice or Scale) */}
        {currentQuestion.options && (
          <div className="space-y-3">
            {currentQuestion.options.map((option) => {
              const isSelected = answers[currentQuestion.id] === option.id;
              return (
                <button
                  key={option.id}
                  onClick={() => handleSelectOption(option.id, option.scoreValue)}
                  className={`w-full text-left p-4 sm:p-5 rounded-2xl border-2 transition-all cursor-pointer flex items-start space-x-3.5 ${
                    isSelected
                      ? 'border-[#FF5733] bg-[#FFF0EB] shadow-[4px_4px_0px_0px_#FF5733]'
                      : 'border-[#1A1A1A] bg-white hover:bg-[#F3F3F1] shadow-[3px_3px_0px_0px_#1A1A1A]'
                  }`}
                >
                  <div
                    className={`w-7 h-7 rounded-lg border-2 border-[#1A1A1A] flex items-center justify-center text-xs font-black shrink-0 transition-colors ${
                      isSelected
                        ? 'bg-[#FF5733] text-white'
                        : 'bg-[#F3F3F1] text-[#1A1A1A]'
                    }`}
                  >
                    {option.label}
                  </div>
                  <span className="text-sm sm:text-base text-[#1A1A1A] font-bold leading-relaxed">
                    {option.text}
                  </span>
                </button>
              );
            })}
          </div>
        )}

        {/* Speaking Sample Formulation Input */}
        {currentQuestion.type === 'speaking-prompt' && (
          <div className="space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <span className="text-xs font-black text-[#1A1A1A] uppercase tracking-wider">
                Latihan Suara (Opsional): Gunakan mic atau ketik
              </span>
              <button
                type="button"
                onClick={() => setIsRecording(!isRecording)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-black uppercase tracking-wider flex items-center space-x-1.5 border-2 border-[#1A1A1A] shadow-[2px_2px_0px_0px_#1A1A1A] transition-colors cursor-pointer ${
                  isRecording
                    ? 'bg-red-500 text-white animate-pulse'
                    : 'bg-[#F3F3F1] text-[#1A1A1A] hover:bg-stone-200'
                }`}
              >
                {isRecording ? <MicOff className="w-3.5 h-3.5" /> : <Mic className="w-3.5 h-3.5" />}
                <span>{isRecording ? 'Berhenti' : 'Rekam Suara'}</span>
              </button>
            </div>

            <textarea
              rows={3}
              value={spokenInput}
              onChange={(e) => setSpokenInput(e.target.value)}
              placeholder={currentQuestion.speakingSamplePrompt || 'Ketik kalimat bicaramu di sini...'}
              className="w-full rounded-2xl border-2 border-[#1A1A1A] p-4 text-sm font-semibold text-[#1A1A1A] focus:outline-none focus:ring-2 focus:ring-[#FF5733]"
            />

            <div className="flex items-center space-x-2">
              <button
                type="button"
                onClick={() =>
                  setSpokenInput(
                    currentQuestion.speakingSamplePrompt ||
                      'Hi, my name is Alex. I work in product design in Jakarta. I want to speak English more confidently.'
                  )
                }
                className="text-xs font-black text-[#FF5733] hover:underline cursor-pointer uppercase tracking-wider"
              >
                Gunakan contoh template praktis
              </button>
            </div>
          </div>
        )}

        {/* Navigation Buttons */}
        <div className="pt-6 border-t-2 border-[#1A1A1A]/10 flex items-center justify-between">
          <button
            onClick={handlePrev}
            disabled={currentIndex === 0}
            className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-black uppercase tracking-wider flex items-center space-x-1.5 transition-colors ${
              currentIndex === 0
                ? 'opacity-30 cursor-not-allowed text-[#4A4A4A]'
                : 'text-[#1A1A1A] hover:bg-[#F3F3F1] cursor-pointer'
            }`}
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Sebelumnya</span>
          </button>

          <button
            id="btn-assessment-next"
            onClick={handleNext}
            disabled={!isCurrentAnswered()}
            className={`px-6 py-3.5 rounded-xl font-black text-xs sm:text-sm uppercase tracking-wider flex items-center space-x-2 transition-all ${
              isCurrentAnswered()
                ? 'bg-[#FF5733] text-white hover:bg-[#E84826] shadow-[3px_3px_0px_0px_#1A1A1A] hover:translate-x-0.5 hover:translate-y-0.5 cursor-pointer'
                : 'bg-stone-200 text-stone-400 cursor-not-allowed border border-[#1A1A1A]/20'
            }`}
          >
            <span>{currentIndex === totalQuestions - 1 ? 'Selesai & Analisis Hasil' : 'Lanjut'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
