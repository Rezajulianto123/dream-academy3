import React, { useState, useEffect, useRef } from 'react';
import { useApp } from '../../context/AppContext';
import { api } from '../../services/api';
import { SpeakingFeedback } from '../../types';
import {
  Mic,
  MicOff,
  Send,
  Volume2,
  Sparkles,
  CheckCircle2,
  AlertCircle,
  RotateCcw,
  ArrowRight,
  User,
  Bot,
  Brain,
  Award,
  BookOpen,
} from 'lucide-react';

interface ChatMessage {
  id: string;
  sender: 'ai' | 'user';
  text: string;
  timestamp: string;
}

const PRESET_SCENARIOS = [
  {
    id: 'sc-intro',
    title: 'Perkenalan Profesional di Kantor',
    scenario: 'Introducing yourself to international colleagues on your first day',
    goal: 'Perkenalkan nama, peran pekerjaan, dan antusiasmemu bergabung dalam 2-3 kalimat natural.',
    starter: "Hi there! Welcome to the global team. I'm Maya from Product. What's your name and what will you be working on?",
  },
  {
    id: 'sc-smalltalk',
    title: 'Small Talk Santai di Pantry',
    scenario: 'Casual small talk while waiting for coffee with an expat colleague',
    goal: 'Buka obrolan santai tentang akhir pekan atau kopi tanpa rasa canggung.',
    starter: "Hey! Good morning. Are you also waiting for the espresso machine? How was your weekend?",
  },
  {
    id: 'sc-meeting-update',
    title: 'Memberikan Update di Daily Standup',
    scenario: 'Sharing your progress update in a quick team sync',
    goal: 'Sampaikan apa yang sudah selesai kemarin dan apa rencanamu hari ini.',
    starter: "Alright team, let's go around the room for quick updates. Could you share what you worked on yesterday?",
  },
  {
    id: 'sc-clarification',
    title: 'Meminta Klarifikasi saat Meeting',
    scenario: 'Asking a speaker to clarify a point during a virtual presentation',
    goal: 'Gunakan frasa sopan untuk meminta pembicara mengulang atau menjelaskan bagian slide.',
    starter: "We're moving quickly through this slide. Does anyone have any questions or need clarification before we continue?",
  },
];

export const SpeakingStudio: React.FC = () => {
  const {
    activeLesson,
    currentUser,
    recordSpeakingSession,
    speakText,
    isSpeakingAudio,
    stopAudio,
    setCurrentView,
  } = useApp();

  const [selectedScenarioIndex, setSelectedScenarioIndex] = useState(0);
  const currentScenario = PRESET_SCENARIOS[selectedScenarioIndex];

  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'init-1',
      sender: 'ai',
      text: currentScenario.starter,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    },
  ]);

  const [inputText, setInputText] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [isAiReplying, setIsAiReplying] = useState(false);
  const [feedback, setFeedback] = useState<SpeakingFeedback | null>(null);
  const [isGeneratingFeedback, setIsGeneratingFeedback] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom of chat
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isAiReplying]);

  // Handle Web Speech Recognition
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
            let transcript = '';
            for (let i = 0; i < event.results.length; i++) {
              transcript += event.results[i][0].transcript + ' ';
            }
            setInputText(transcript.trim());
          };

          recognition.onerror = (e: any) => {
            console.error('Speech recognition error:', e);
            setIsRecording(false);
          };

          recognition.onend = () => {
            setIsRecording(false);
          };

          recognition.start();
        } catch (e) {
          console.error('Speech recognition setup failed:', e);
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

  const handleSendMessage = async () => {
    if (!inputText.trim() || isAiReplying) return;

    stopAudio();
    const userMsgText = inputText.trim();
    const userMsg: ChatMessage = {
      id: `usr-${Date.now()}`,
      sender: 'user',
      text: userMsgText,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    const updated = [...messages, userMsg];
    setMessages(updated);
    setInputText('');
    setIsRecording(false);
    setIsAiReplying(true);

    try {
      const res = await api.speakingChat({
        scenario: currentScenario.scenario,
        userLevel: currentUser?.estimatedLevel || 'A2',
        messages: updated.map((m) => ({ sender: m.sender, text: m.text })),
      });

      const aiReply: ChatMessage = {
        id: `ai-${Date.now()}`,
        sender: 'ai',
        text: res.reply,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };

      setMessages((prev) => [...prev, aiReply]);
      // Speak AI response automatically for realistic immersive roleplay
      speakText(res.reply);
    } catch (err) {
      console.error('AI chat failed:', err);
      const fallbackReply: ChatMessage = {
        id: `ai-err-${Date.now()}`,
        sender: 'ai',
        text: "That sounds great! How long have you been in this role, and what are you most excited to tackle first?",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages((prev) => [...prev, fallbackReply]);
      speakText(fallbackReply.text);
    } finally {
      setIsAiReplying(false);
    }
  };

  const handleRequestFeedback = async () => {
    const studentUtterances = messages
      .filter((m) => m.sender === 'user')
      .map((m) => m.text);

    if (studentUtterances.length === 0) {
      alert('Kirim minimal 1 respons suara atau kalimat sebelum meminta feedback.');
      return;
    }

    setIsGeneratingFeedback(true);
    try {
      const fb = await api.speakingFeedback({
        scenario: currentScenario.scenario,
        scenarioGoal: currentScenario.goal,
        studentUtterances,
      });

      setFeedback(fb);
      await recordSpeakingSession(activeLesson?.id);
    } catch (err: any) {
      console.error('Feedback error:', err);
      // Construct fallback constructive feedback
      setFeedback({
        overallEncouragement: 'Usaha yang sangat bagus! Kamu sudah berani merespons dengan struktur yang mudah dipahami.',
        whatYouDidWell: [
          'Percaya diri merespons poin utama lawan bicara tanpa keraguan panjang.',
          'Pilihan kata yang digunakan sudah tepat sasaran dan komunikatif.',
        ],
        improveThis: {
          userSaid: studentUtterances[0] || "I work in Jakarta since two years.",
          betterAlternative: "I've been working in Jakarta for two years.",
          explanation: 'Gunakan present perfect continuous ("have been working") untuk kegiatan yang dimulai di masa lalu dan masih berlangsung saat ini.',
        },
        naturalVersion: "Hi Maya! Nice to meet you. I'm joining the team as a designer, and I've been working in tech for two years.",
        oneThingToPractice: 'Latihlah pola "I\'ve been working on..." saat menceritakan aktivitas pekerjaanmu.',
      });
      await recordSpeakingSession(activeLesson?.id);
    } finally {
      setIsGeneratingFeedback(false);
    }
  };

  const handleResetChat = (scenarioIdx: number) => {
    stopAudio();
    setSelectedScenarioIndex(scenarioIdx);
    const newSc = PRESET_SCENARIOS[scenarioIdx];
    setMessages([
      {
        id: `init-${Date.now()}`,
        sender: 'ai',
        text: newSc.starter,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      },
    ]);
    setFeedback(null);
    setInputText('');
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8 space-y-8">
      {/* Studio Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b-2 border-[#1A1A1A]/10">
        <div>
          <div className="flex items-center space-x-2 text-xs font-black uppercase tracking-widest text-[#FF5733] mb-1">
            <Mic className="w-4 h-4 text-[#FF5733]" />
            <span>AI Speaking Coach Studio</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-black text-[#1A1A1A] tracking-tight">
            Latihan Berbicara Tanpa Rasa Malu
          </h1>
          <p className="text-xs sm:text-sm font-medium text-[#4A4A4A] mt-1">
            Partner bicara AI Maya yang selalu sabar, siap merespons suara, dan memberikan feedback natural.
          </p>
        </div>

        <div className="flex items-center space-x-2">
          <button
            onClick={() => setCurrentView('dashboard')}
            className="px-4 py-2.5 rounded-xl border-2 border-[#1A1A1A] bg-white hover:bg-[#F3F3F1] text-xs font-black uppercase tracking-wider text-[#1A1A1A] shadow-[3px_3px_0px_0px_#1A1A1A] transition-all cursor-pointer"
          >
            Dashboard
          </button>
        </div>
      </div>

      {/* Scenario Selector Pills */}
      <div className="flex items-center space-x-2 overflow-x-auto pb-2 scrollbar-none">
        <span className="text-xs font-black uppercase tracking-wider text-[#1A1A1A] shrink-0">
          Pilih Situasi:
        </span>
        {PRESET_SCENARIOS.map((sc, idx) => (
          <button
            key={sc.id}
            onClick={() => handleResetChat(idx)}
            className={`px-4 py-2 rounded-full text-xs font-black uppercase tracking-wider whitespace-nowrap transition-all cursor-pointer border-2 border-[#1A1A1A] ${
              selectedScenarioIndex === idx
                ? 'bg-[#FF5733] text-white shadow-[3px_3px_0px_0px_#1A1A1A]'
                : 'bg-white text-[#1A1A1A] hover:bg-[#F3F3F1]'
            }`}
          >
            {sc.title}
          </button>
        ))}
      </div>

      {/* Scenario Brief Card */}
      <div className="bg-[#FFF0EB] border-2 border-[#FF5733] rounded-[24px] p-5 sm:p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-[4px_4px_0px_0px_#FF5733]">
        <div className="space-y-1">
          <span className="text-[10px] font-black uppercase tracking-widest text-[#FF5733] block">
            Situasi & Target: {currentScenario.scenario}
          </span>
          <p className="text-xs sm:text-sm text-[#1A1A1A] font-bold">
            🎯 {currentScenario.goal}
          </p>
        </div>

        <div className="flex items-center space-x-2">
          <button
            onClick={() => handleResetChat(selectedScenarioIndex)}
            className="px-4 py-2 rounded-xl bg-white border-2 border-[#1A1A1A] text-[#1A1A1A] text-xs font-black uppercase tracking-wider hover:bg-[#F3F3F1] shadow-[2px_2px_0px_0px_#1A1A1A] transition-colors flex items-center space-x-1.5 cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Mulai Ulang Percakapan</span>
          </button>
        </div>
      </div>

      {/* Main Studio Grid: Chat on Left, Feedback on Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* CHAT SESSION BOX (8 cols on lg) */}
        <div className="lg:col-span-7 bg-white rounded-[28px] border-2 border-[#1A1A1A] shadow-[6px_6px_0px_0px_#1A1A1A] flex flex-col h-[580px] overflow-hidden">
          {/* Chat Header */}
          <div className="p-4 border-b-2 border-[#1A1A1A] flex items-center justify-between bg-[#F3F3F1]">
            <div className="flex items-center space-x-2.5">
              <div className="w-9 h-9 rounded-full bg-[#FF5733] text-white flex items-center justify-center font-black text-xs border-2 border-[#1A1A1A] shadow-[2px_2px_0px_0px_#1A1A1A]">
                M
              </div>
              <div>
                <span className="text-xs font-black text-[#1A1A1A] uppercase tracking-wider block">Maya — AI Coach</span>
                <span className="text-[10px] text-emerald-700 font-bold flex items-center space-x-1">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  <span>Siap mendengarkan</span>
                </span>
              </div>
            </div>

            {isSpeakingAudio && (
              <button
                onClick={stopAudio}
                className="text-[11px] font-black uppercase tracking-wider text-white bg-[#FF5733] border-2 border-[#1A1A1A] px-3 py-1 rounded-full flex items-center space-x-1 cursor-pointer shadow-[2px_2px_0px_0px_#1A1A1A]"
              >
                <Volume2 className="w-3.5 h-3.5 animate-pulse" />
                <span>Hentikan Suara</span>
              </button>
            )}
          </div>

          {/* Messages Scroll Area */}
          <div className="flex-1 p-4 sm:p-5 overflow-y-auto space-y-4">
            {messages.map((m) => {
              const isAi = m.sender === 'ai';
              return (
                <div
                  key={m.id}
                  className={`flex items-start space-x-2.5 ${
                    isAi ? 'justify-start' : 'justify-end'
                  }`}
                >
                  {isAi && (
                    <div className="w-7 h-7 rounded-full bg-[#FF5733] text-white border-2 border-[#1A1A1A] flex items-center justify-center text-xs font-black shrink-0 mt-1">
                      <Bot className="w-3.5 h-3.5" />
                    </div>
                  )}

                  <div
                    className={`max-w-[82%] p-3.5 sm:p-4 rounded-2xl text-xs sm:text-sm leading-relaxed border-2 border-[#1A1A1A] shadow-[3px_3px_0px_0px_#1A1A1A] ${
                      isAi
                        ? 'bg-[#FDFCFB] text-[#1A1A1A] rounded-tl-xs font-medium'
                        : 'bg-[#1A1A1A] text-white rounded-tr-xs font-medium'
                    }`}
                  >
                    <div className="flex items-center justify-between space-x-3 mb-1">
                      <span className="text-[10px] font-black uppercase tracking-wider opacity-70">
                        {isAi ? 'Maya' : currentUser?.name || 'You'}
                      </span>
                      <span className="text-[10px] opacity-60 font-semibold">{m.timestamp}</span>
                    </div>

                    <p className="whitespace-pre-line font-medium">{m.text}</p>

                    {isAi && (
                      <div className="pt-2 mt-2 border-t border-[#1A1A1A]/10 flex items-center justify-end">
                        <button
                          onClick={() => speakText(m.text)}
                          className="text-[11px] text-[#1A1A1A] hover:text-[#FF5733] flex items-center space-x-1 font-bold cursor-pointer"
                        >
                          <Volume2 className="w-3.5 h-3.5 text-[#FF5733]" />
                          <span>Dengar Suara</span>
                        </button>
                      </div>
                    )}
                  </div>

                  {!isAi && (
                    <div className="w-7 h-7 rounded-full bg-[#1A1A1A] text-white border-2 border-white flex items-center justify-center text-xs font-bold shrink-0 mt-1">
                      <User className="w-3.5 h-3.5" />
                    </div>
                  )}
                </div>
              );
            })}

            {isAiReplying && (
              <div className="flex items-center space-x-2 text-xs font-bold text-[#4A4A4A] p-2">
                <span className="w-2.5 h-2.5 rounded-full bg-[#FF5733] animate-ping" />
                <span>Maya sedang memikirkan respons...</span>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Voice & Input Controls */}
          <div className="p-3 sm:p-4 border-t-2 border-[#1A1A1A] bg-[#F3F3F1] space-y-2">
            {isRecording && (
              <div className="bg-red-100 border-2 border-red-500 text-red-900 px-3 py-1.5 rounded-xl text-xs font-bold flex items-center justify-between animate-pulse">
                <div className="flex items-center space-x-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-red-600" />
                  <span>Merekam suara... Silakan berbicara dalam bahasa Inggris.</span>
                </div>
                <button
                  type="button"
                  onClick={() => setIsRecording(false)}
                  className="text-xs text-red-900 underline font-black uppercase cursor-pointer"
                >
                  Selesai
                </button>
              </div>
            )}

            <div className="flex items-center space-x-2">
              <button
                type="button"
                id="btn-speaking-mic"
                onClick={() => setIsRecording(!isRecording)}
                title={isRecording ? 'Hentikan rekaman' : 'Bicara dengan mikrofon'}
                className={`p-3 rounded-xl border-2 border-[#1A1A1A] transition-all cursor-pointer shrink-0 shadow-[2px_2px_0px_0px_#1A1A1A] ${
                  isRecording
                    ? 'bg-red-500 text-white animate-pulse'
                    : 'bg-[#FF5733] text-white hover:bg-[#E84826]'
                }`}
              >
                {isRecording ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
              </button>

              <input
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') handleSendMessage();
                }}
                placeholder={isRecording ? 'Mendengarkan ucapanmu...' : 'Ketik kalimat bicaramu atau tekan mic...'}
                className="flex-1 bg-white border-2 border-[#1A1A1A] rounded-xl px-4 py-2.5 text-xs sm:text-sm text-[#1A1A1A] font-semibold focus:outline-none focus:border-[#FF5733]"
              />

              <button
                type="button"
                onClick={handleSendMessage}
                disabled={!inputText.trim() || isAiReplying}
                className="p-2.5 sm:px-5 sm:py-2.5 bg-[#1A1A1A] text-white hover:bg-black disabled:opacity-40 rounded-xl text-xs font-black uppercase tracking-wider transition-all cursor-pointer flex items-center space-x-1.5 shrink-0 border-2 border-[#1A1A1A] shadow-[2px_2px_0px_0px_#1A1A1A]"
              >
                <span className="hidden sm:inline">Kirim</span>
                <Send className="w-4 h-4 text-[#FF5733]" />
              </button>
            </div>
          </div>
        </div>

        {/* FEEDBACK & ANALYSIS PANEL (5 cols on lg) */}
        <div className="lg:col-span-5 space-y-4">
          <div className="bg-white rounded-[28px] border-2 border-[#1A1A1A] p-6 shadow-[6px_6px_0px_0px_#1A1A1A] space-y-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Brain className="w-5 h-5 text-[#FF5733]" />
                <h3 className="text-base font-black text-[#1A1A1A] uppercase tracking-tight">
                  Evaluasi Speaking AI
                </h3>
              </div>
              <span className="text-[10px] uppercase font-black tracking-wider text-[#FF5733] bg-[#FFF0EB] border border-[#FF5733] px-2 py-0.5 rounded-md">
                Actionable Feedback
              </span>
            </div>

            <p className="text-xs sm:text-sm text-[#4A4A4A] font-medium leading-relaxed">
              Setelah selesai beberapa putaran percakapan, klik tombol di bawah untuk mendapatkan analisis objektif: apa yang sudah bagus, 1 perbaikan kalimat, dan versi paling natural.
            </p>

            <button
              id="btn-get-ai-feedback"
              onClick={handleRequestFeedback}
              disabled={isGeneratingFeedback || messages.filter((m) => m.sender === 'user').length === 0}
              className="w-full py-4 rounded-xl bg-[#FF5733] hover:bg-[#E84826] text-white disabled:opacity-40 text-xs sm:text-sm font-black uppercase tracking-wider flex items-center justify-center space-x-2 border-2 border-[#1A1A1A] shadow-[4px_4px_0px_0px_#1A1A1A] hover:translate-x-0.5 hover:translate-y-0.5 transition-all cursor-pointer"
            >
              <Sparkles className="w-4 h-4" />
              <span>
                {isGeneratingFeedback ? 'Menganalisis Percakapan...' : 'Minta Feedback AI Coach'}
              </span>
            </button>

            {feedback && (
              <div className="space-y-4 pt-2 border-t-2 border-[#1A1A1A]/10 animate-fadeIn">
                {/* Encouragement */}
                {feedback.overallEncouragement && (
                  <div className="p-4 bg-[#FFF0EB] rounded-2xl border-2 border-[#FF5733] text-xs text-[#1A1A1A] font-bold shadow-[2px_2px_0px_0px_#FF5733]">
                    {feedback.overallEncouragement}
                  </div>
                )}

                {/* What You Did Well */}
                <div className="space-y-2">
                  <span className="text-xs font-black uppercase tracking-wider text-emerald-800 flex items-center space-x-1.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span>What You Did Well</span>
                  </span>
                  <ul className="space-y-1.5 text-xs text-[#1A1A1A] font-semibold bg-[#F3F3F1] p-3.5 rounded-xl border-2 border-[#1A1A1A]">
                    {(Array.isArray(feedback.whatYouDidWell)
                      ? feedback.whatYouDidWell
                      : feedback.whatYouDidWell
                      ? [feedback.whatYouDidWell]
                      : ['Pesan dan maksud utama kalimat tersampaikan dengan baik.']
                    ).map((w, i) => (
                      <li key={i} className="flex items-start space-x-1.5">
                        <span className="text-[#FF5733] font-black">•</span>
                        <span>{w}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Improve This */}
                {feedback.improveThis && (
                  <div className="space-y-2">
                    <span className="text-xs font-black uppercase tracking-wider text-[#FF5733] flex items-center space-x-1.5">
                      <AlertCircle className="w-4 h-4 text-[#FF5733]" />
                      <span>Improve This (1 Rekomendasi Utama)</span>
                    </span>

                    <div className="p-4 bg-[#FDFCFB] rounded-2xl border-2 border-[#1A1A1A] space-y-2.5 text-xs shadow-[3px_3px_0px_0px_#1A1A1A]">
                      {feedback.improveThis.userSaid && (
                        <div>
                          <span className="text-[10px] uppercase font-black text-[#4A4A4A] block">
                            Kamu bilang:
                          </span>
                          <p className="text-[#1A1A1A] font-semibold italic">"{feedback.improveThis.userSaid}"</p>
                        </div>
                      )}

                      {feedback.improveThis.betterAlternative && (
                        <div className="pt-2 border-t border-[#1A1A1A]/10">
                          <span className="text-[10px] uppercase font-black text-emerald-700 block">
                            Alternatif Lebih Natural:
                          </span>
                          <div className="flex items-center justify-between">
                            <p className="font-black text-[#1A1A1A]">
                              "{feedback.improveThis.betterAlternative}"
                            </p>
                            <button
                              onClick={() => speakText(feedback.improveThis.betterAlternative)}
                              className="p-1.5 text-[#FF5733] hover:bg-[#FFF0EB] rounded-md border border-[#FF5733] cursor-pointer"
                            >
                              <Volume2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>
                      )}

                      {feedback.improveThis.explanation && (
                        <p className="text-[11px] text-[#4A4A4A] font-medium pt-1">
                          <strong className="text-[#1A1A1A]">Mengapa:</strong> {feedback.improveThis.explanation}
                        </p>
                      )}
                    </div>
                  </div>
                )}

                {/* Natural Version */}
                <div className="p-4 bg-[#1A1A1A] text-white rounded-2xl border-2 border-[#1A1A1A] space-y-1 text-xs shadow-[3px_3px_0px_0px_#FF5733]">
                  <span className="text-[10px] uppercase font-black tracking-wider text-[#FF5733] block">
                    Full Natural Version:
                  </span>
                  <p className="italic text-stone-200 font-medium">"{feedback.naturalVersion}"</p>
                </div>

                {/* One Thing to Practice */}
                <div className="p-4 bg-[#F3F3F1] rounded-2xl border-2 border-[#1A1A1A] text-xs space-y-1 shadow-[3px_3px_0px_0px_#1A1A1A]">
                  <span className="text-[10px] uppercase font-black text-[#4A4A4A] block">
                    Target Latihan Berikutnya:
                  </span>
                  <p className="font-black text-[#1A1A1A]">
                    {feedback.oneThingToPractice}
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
