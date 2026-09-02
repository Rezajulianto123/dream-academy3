export type CEFRLevel = 'A1' | 'A2' | 'B1' | 'B2' | 'C1' | 'C2';

export interface AssessmentScores {
  grammar: number;
  vocabulary: number;
  reading: number;
  listening: number;
  speaking: number;
  confidence: number;
}

export interface AssessmentResult {
  id: string;
  userId?: string;
  userEmail?: string;
  userName?: string;
  createdAt: string;
  estimatedLevel: CEFRLevel;
  levelTitle: string;
  scores: AssessmentScores;
  strengths: string[];
  weaknesses: string[];
  primaryFocus: string;
  recommendedPath: string;
  reasoning: string;
  answers: Record<string, string | number>;
}

export type AssessmentDimension = 'grammar' | 'vocabulary' | 'reading' | 'listening' | 'speaking' | 'confidence';

export interface AssessmentQuestion {
  id: string;
  dimension: AssessmentDimension;
  title: string;
  subtitle?: string;
  audioPrompt?: string; // Text to speak via TTS or audio hint
  scenario?: string;
  options?: {
    id: string;
    label: string;
    text: string;
    scoreValue?: number; // 0-100
  }[];
  type: 'multiple-choice' | 'scale' | 'speaking-prompt';
  speakingSamplePrompt?: string;
}

export interface UserProfile {
  id: string;
  email: string;
  name: string;
  role: 'student' | 'admin';
  createdAt: string;
  avatar?: string;
  goal?: string;
  studyTimeMinutes?: number;
  speakingSituation?: string;
  biggestStruggle?: string;
  onboardingCompleted: boolean;
  estimatedLevel?: CEFRLevel;
  scores?: AssessmentScores;
  strengths?: string[];
  weaknesses?: string[];
  currentFocus?: string;
  recommendedPath?: string;
  learningStreak: number;
  progressPercent: number;
  completedLessonIds: string[];
  completedQuizIds: string[];
  speakingSessionsCount: number;
  isPaidMember: boolean;
}

export interface LessonContent {
  id: string;
  moduleId: string;
  courseId: string;
  title: string;
  subtitle: string;
  durationMinutes: number;
  youtubeId: string; // YouTube Video ID
  youtubeVideoId?: string;
  videoTitle: string;
  focusArea?: string;
  objective?: string;
  keyTakeaways: string[];
  vocabularyNotes: {
    phrase: string;
    meaningId: string;
    exampleSentence: string;
  }[];
  notesMarkdown: string;
  contentNotes?: string;
  quizQuestions: {
    id: string;
    question: string;
    options: string[];
    correctIndex: number;
    explanation: string;
  }[];
  speakingPrompt: {
    id: string;
    scenario: string;
    goal?: string;
    aiStartingMessage: string;
    starterMessage?: string;
    guideBulletPoints: string[];
    expectedPhrases: string[];
  };
}

export interface ModuleContent {
  id: string;
  courseId: string;
  title: string;
  weekNumber: number;
  description: string;
  lessons: LessonContent[];
}

export interface CourseContent {
  id: string;
  title: string;
  tagline: string;
  targetLevel: string;
  modules: ModuleContent[];
}

export interface SpeakingMessage {
  id: string;
  sender: 'ai' | 'user';
  text: string;
  timestamp: string;
  audioDurationSeconds?: number;
}

export interface SpeakingFeedback {
  id?: string;
  sessionId?: string;
  userId?: string;
  lessonId?: string;
  scenarioTitle?: string;
  createdAt?: string;
  overallEncouragement?: string;
  whatYouDidWell: string | string[];
  improveThis: {
    userSaid: string;
    betterAlternative: string;
    explanation: string;
  };
  naturalVersion: string;
  oneThingToPractice: string;
  overallScore: number;
}

export interface AdminAnalyticsSummary {
  totalStudents: number;
  newStudentsToday: number;
  assessmentsCompleted: number;
  paidStudents: number;
  activeStudents: number;
  courseCompletionRate: number;
  averageProgressPercent: number;
  mostCommonWeakness: string;
  mostCompletedLesson: string;
  highestDropOffLesson: string;
}
