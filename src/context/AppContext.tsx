import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  AssessmentResult,
  CourseContent,
  LessonContent,
  UserProfile,
} from '../types';
import { INITIAL_COURSES } from '../data/initialContent';
import { api } from '../services/api';

export type AppView =
  | 'landing'
  | 'assessment'
  | 'assessment-result'
  | 'onboarding'
  | 'dashboard'
  | 'lesson'
  | 'speaking-studio'
  | 'admin'
  | 'pricing';

interface AppContextType {
  currentView: AppView;
  setCurrentView: (view: AppView) => void;
  currentUser: UserProfile | null;
  setCurrentUser: (user: UserProfile | null) => void;
  courses: CourseContent[];
  setCourses: React.Dispatch<React.SetStateAction<CourseContent[]>>;
  activeLesson: LessonContent | null;
  setActiveLesson: (lesson: LessonContent | null) => void;
  activeAssessmentResult: AssessmentResult | null;
  setActiveAssessmentResult: (result: AssessmentResult | null) => void;
  authModalOpen: boolean;
  setAuthModalOpen: (open: boolean) => void;
  loginAs: (role: 'student' | 'admin' | 'guest') => void;
  logout: () => void;
  markLessonComplete: (lessonId: string) => Promise<void>;
  markQuizComplete: (lessonId: string) => Promise<void>;
  recordSpeakingSession: (lessonId?: string) => Promise<void>;
  speakText: (text: string, lang?: string) => void;
  isSpeakingAudio: boolean;
  stopAudio: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentView, setCurrentView] = useState<AppView>('landing');
  const [courses, setCourses] = useState<CourseContent[]>(() => {
    const saved = localStorage.getItem('dream_academy_courses');
    return saved ? JSON.parse(saved) : INITIAL_COURSES;
  });

  const [currentUser, setCurrentUser] = useState<UserProfile | null>(() => {
    const saved = localStorage.getItem('dream_academy_user');
    return saved ? JSON.parse(saved) : null;
  });

  const [activeLesson, setActiveLesson] = useState<LessonContent | null>(() => {
    return INITIAL_COURSES[0].modules[0].lessons[0];
  });

  const [activeAssessmentResult, setActiveAssessmentResult] = useState<AssessmentResult | null>(() => {
    const saved = localStorage.getItem('dream_academy_last_assessment');
    return saved ? JSON.parse(saved) : null;
  });

  const [authModalOpen, setAuthModalOpen] = useState<boolean>(false);
  const [isSpeakingAudio, setIsSpeakingAudio] = useState<boolean>(false);

  useEffect(() => {
    if (currentUser) {
      localStorage.setItem('dream_academy_user', JSON.stringify(currentUser));
    } else {
      localStorage.removeItem('dream_academy_user');
    }
  }, [currentUser]);

  useEffect(() => {
    if (activeAssessmentResult) {
      localStorage.setItem('dream_academy_last_assessment', JSON.stringify(activeAssessmentResult));
    }
  }, [activeAssessmentResult]);

  useEffect(() => {
    localStorage.setItem('dream_academy_courses', JSON.stringify(courses));
  }, [courses]);

  // Audio Speech Synthesis for English pronunciation & Coach voice
  const speakText = (text: string, lang = 'en-US') => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) return;
    try {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = lang;
      utterance.rate = 0.95; // slightly relaxed natural pace
      utterance.pitch = 1.0;

      utterance.onstart = () => setIsSpeakingAudio(true);
      utterance.onend = () => setIsSpeakingAudio(false);
      utterance.onerror = () => setIsSpeakingAudio(false);

      window.speechSynthesis.speak(utterance);
    } catch (e) {
      console.error('SpeechSynthesis error:', e);
      setIsSpeakingAudio(false);
    }
  };

  const stopAudio = () => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      setIsSpeakingAudio(false);
    }
  };

  const loginAs = (role: 'student' | 'admin' | 'guest') => {
    if (role === 'admin') {
      const adminUser: UserProfile = {
        id: 'admin-1',
        email: 'admin@dreamacademy.id',
        name: 'Dream Academy Admin',
        role: 'admin',
        createdAt: new Date().toISOString(),
        onboardingCompleted: true,
        learningStreak: 14,
        progressPercent: 100,
        completedLessonIds: ['les-1', 'les-2', 'les-3', 'les-4'],
        completedQuizIds: ['les-1', 'les-2', 'les-3', 'les-4'],
        speakingSessionsCount: 15,
        isPaidMember: true,
      };
      setCurrentUser(adminUser);
      setCurrentView('admin');
    } else if (role === 'student') {
      const studentUser: UserProfile = {
        id: 'student-demo',
        email: 'student@example.com',
        name: 'Rizky Pratama',
        role: 'student',
        createdAt: new Date().toISOString(),
        goal: 'Career & Workplace English',
        studyTimeMinutes: 20,
        speakingSituation: 'Work meetings with regional team',
        biggestStruggle: 'Takut salah grammar dan pikiran blank saat bicara',
        onboardingCompleted: true,
        estimatedLevel: 'A2',
        scores: {
          grammar: 72,
          vocabulary: 58,
          reading: 76,
          listening: 64,
          speaking: 41,
          confidence: 35,
        },
        strengths: ['Reading comprehension baik', 'Memahami dasar kalimat profesional'],
        weaknesses: ['Ragu saat berbicara spontan', 'Vocabulary aktif masih terbatas'],
        currentFocus: 'Speaking Confidence',
        recommendedPath: '30-Day Speaking Confidence Path',
        learningStreak: 7,
        progressPercent: 25,
        completedLessonIds: ['les-1'],
        completedQuizIds: ['les-1'],
        speakingSessionsCount: 3,
        isPaidMember: false,
      };
      setCurrentUser(studentUser);
      setCurrentView('dashboard');
    } else {
      setCurrentUser(null);
      setCurrentView('landing');
    }
  };

  const logout = () => {
    setCurrentUser(null);
    setCurrentView('landing');
  };

  const markLessonComplete = async (lessonId: string) => {
    if (!currentUser) return;
    try {
      const res = await api.updateProgress({
        userId: currentUser.id,
        lessonId,
      });
      if (res.user) {
        setCurrentUser(res.user);
      }
    } catch {
      // Local fallback
      const updated = {
        ...currentUser,
        completedLessonIds: Array.from(new Set([...currentUser.completedLessonIds, lessonId])),
      };
      updated.progressPercent = Math.min(100, Math.round((updated.completedLessonIds.length / 4) * 100));
      setCurrentUser(updated);
    }
  };

  const markQuizComplete = async (lessonId: string) => {
    if (!currentUser) return;
    try {
      const res = await api.updateProgress({
        userId: currentUser.id,
        lessonId,
        quizCompleted: true,
      });
      if (res.user) {
        setCurrentUser(res.user);
      }
    } catch {
      const updated = {
        ...currentUser,
        completedQuizIds: Array.from(new Set([...currentUser.completedQuizIds, lessonId])),
      };
      setCurrentUser(updated);
    }
  };

  const recordSpeakingSession = async (lessonId?: string) => {
    if (!currentUser) return;
    try {
      const res = await api.updateProgress({
        userId: currentUser.id,
        lessonId,
        speakingSessionDone: true,
      });
      if (res.user) {
        setCurrentUser(res.user);
      }
    } catch {
      const updated = {
        ...currentUser,
        speakingSessionsCount: currentUser.speakingSessionsCount + 1,
      };
      setCurrentUser(updated);
    }
  };

  return (
    <AppContext.Provider
      value={{
        currentView,
        setCurrentView,
        currentUser,
        setCurrentUser,
        courses,
        setCourses,
        activeLesson,
        setActiveLesson,
        activeAssessmentResult,
        setActiveAssessmentResult,
        authModalOpen,
        setAuthModalOpen,
        loginAs,
        logout,
        markLessonComplete,
        markQuizComplete,
        recordSpeakingSession,
        speakText,
        isSpeakingAudio,
        stopAudio,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
