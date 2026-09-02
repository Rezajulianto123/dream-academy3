import { AssessmentResult, SpeakingFeedback, UserProfile } from '../types';

export const api = {
  async getHealth() {
    const res = await fetch('/api/health');
    return res.json();
  },

  async analyzeAssessment(data: {
    answers: Record<string, string | number>;
    rawScores: Record<string, number>;
    userNotes?: string;
  }): Promise<AssessmentResult> {
    try {
      const res = await fetch('/api/ai/analyze-assessment', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (res.ok) {
        const result = await res.json();
        return result;
      }
    } catch (e) {
      console.warn('Network error in analyzeAssessment, using fallback:', e);
    }

    const g = Number(data.rawScores?.grammar ?? 65);
    const v = Number(data.rawScores?.vocabulary ?? 60);
    const r = Number(data.rawScores?.reading ?? 70);
    const l = Number(data.rawScores?.listening ?? 65);
    const s = Number(data.rawScores?.speaking ?? 45);
    const c = Number(data.rawScores?.confidence ?? 40);
    return {
      id: `ass-${Date.now()}`,
      createdAt: new Date().toISOString(),
      answers: data.answers,
      estimatedLevel: 'A2',
      levelTitle: 'A2 — Elementary',
      scores: { grammar: g, vocabulary: v, reading: r, listening: l, speaking: s, confidence: c },
      strengths: ['Pemahaman membaca konteks baik', 'Mampu menangkap maksud umum percakapan'],
      weaknesses: ['Kecenderungan menerjemahkan di kepala sebelum bicara', 'Kosakata aktif untuk variasi ide'],
      primaryFocus: 'Speaking Confidence',
      recommendedPath: '30-Day Speaking Confidence Path',
      reasoning: 'Berdasarkan assessment, kamu sudah mengerti dasar bahasa Inggris namun membutuhkan latihan aktif untuk mengatasi rasa ragu saat berbicara.',
    };
  },

  async speakingChat(data: {
    scenario: string;
    messages: { sender: 'ai' | 'user'; text: string }[];
    userLevel?: string;
  }): Promise<{ reply: string }> {
    try {
      const res = await fetch('/api/ai/speaking-chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (res.ok) {
        return await res.json();
      }
    } catch (e) {
      console.warn('Network error in speakingChat, using fallback:', e);
    }
    return {
      reply: 'That sounds really great! Could you share a bit more about your everyday responsibilities?',
    };
  },

  async speakingFeedback(data: {
    scenario: string;
    studentUtterances: string[];
    scenarioGoal?: string;
  }): Promise<SpeakingFeedback> {
    try {
      const res = await fetch('/api/ai/speaking-feedback', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (res.ok) {
        return await res.json();
      }
    } catch (e) {
      console.warn('Network error in speakingFeedback, using fallback:', e);
    }
    return {
      overallEncouragement: 'Kerja bagus! Kamu sudah berani merespons percakapan dengan ide yang jelas tanpa rasa ragu.',
      whatYouDidWell: [
        'Pesan dan maksud utama kalimat berhasil tersampaikan dengan baik.',
        'Percaya diri merespons topik tanpa keraguan yang panjang.',
      ],
      improveThis: {
        userSaid: data.studentUtterances?.[0] || 'I am work in tech company',
        betterAlternative: 'I work in a tech company',
        explanation: 'Gunakan bentuk Present Simple tanpa menambahkan "am" sebelum kata kerja.',
      },
      naturalVersion: 'Hi! I work at a technology company, and currently I am focusing on digital product development.',
      oneThingToPractice: 'Berlatih menggunakan pola "I work as [posisi]" langsung tanpa jeda atau kata "am".',
      overallScore: 78,
    };
  },

  async saveAssessment(result: AssessmentResult) {
    const res = await fetch('/api/data/assessment', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(result),
    });
    return res.json();
  },

  async saveUser(user: Partial<UserProfile>): Promise<{ success: boolean; user: UserProfile }> {
    const res = await fetch('/api/data/user', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(user),
    });
    return res.json();
  },

  async updateProgress(data: {
    userId: string;
    lessonId?: string;
    quizCompleted?: boolean;
    speakingSessionDone?: boolean;
  }): Promise<{ success: boolean; user: UserProfile }> {
    const res = await fetch('/api/data/progress', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    return res.json();
  },

  async getAdminAnalytics() {
    const res = await fetch('/api/admin/analytics');
    return res.json();
  },
};
