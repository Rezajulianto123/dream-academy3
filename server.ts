import express from 'express';
import path from 'path';
import fs from 'fs';
import dotenv from 'dotenv';
import { GoogleGenAI, Type } from '@google/genai';

dotenv.config();

const app = express();
const isProduction =
  process.env.NODE_ENV === 'production' ||
  (typeof __filename !== 'undefined' && __filename.includes('dist')) ||
  (process.argv[1] && process.argv[1].includes('dist'));

app.use(express.json());

// Server-side AI initialization with recommended User-Agent header
const geminiApiKey = process.env.GEMINI_API_KEY;
let ai: GoogleGenAI | null = null;
if (geminiApiKey) {
  ai = new GoogleGenAI({
    apiKey: geminiApiKey,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      },
    },
  });
}

// Database directory & persistent file store with safe writable fallback for containers
let DATA_DIR = path.join(process.cwd(), 'data');
let DB_FILE = path.join(DATA_DIR, 'db.json');

try {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }
} catch {
  // If process.cwd() is read-only in container, fall back to /tmp
  DATA_DIR = path.join('/tmp', 'dreamacademy-data');
  DB_FILE = path.join(DATA_DIR, 'db.json');
  try {
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    }
  } catch (e) {
    console.warn('Using in-memory store for fallback data storage');
  }
}

interface DatabaseSchema {
  users: Array<{
    id: string;
    email: string;
    name: string;
    role: 'student' | 'admin';
    createdAt: string;
    goal?: string;
    studyTimeMinutes?: number;
    speakingSituation?: string;
    biggestStruggle?: string;
    onboardingCompleted: boolean;
    estimatedLevel?: string;
    scores?: Record<string, number>;
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
  }>;
  assessments: Array<any>;
  speakingSessions: Array<any>;
  metrics: {
    visitorsCount: number;
    assessmentsStarted: number;
  };
}

function initDatabase(): DatabaseSchema {
  const initialDb: DatabaseSchema = {
    users: [
      {
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
        speakingSessionsCount: 12,
        isPaidMember: true,
      },
      {
        id: 'student-demo',
        email: 'student@example.com',
        name: 'Rizky Pratama',
        role: 'student',
        createdAt: new Date().toISOString(),
        goal: 'Career & Workplace English',
        studyTimeMinutes: 20,
        speakingSituation: 'Work meetings with regional team',
        biggestStruggle: 'Takut salah grammar dan pikiran blank saat spontan bicara',
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
      },
    ],
    assessments: [
      {
        id: 'ass-demo-1',
        userEmail: 'student@example.com',
        userName: 'Rizky Pratama',
        createdAt: new Date().toISOString(),
        estimatedLevel: 'A2',
        levelTitle: 'A2 — Elementary',
        scores: {
          grammar: 72,
          vocabulary: 58,
          reading: 76,
          listening: 64,
          speaking: 41,
          confidence: 35,
        },
        strengths: ['Reading comprehension baik', 'Memahami struktur dasar kalimat'],
        weaknesses: ['Ragu saat berbicara spontan', 'Kurang percaya diri di depan orang lain'],
        primaryFocus: 'Speaking Confidence',
        recommendedPath: '30-Day Speaking Confidence Path',
        reasoning: 'Kamu sudah memiliki pemahaman pasif yang baik. Fokus utamamu adalah mengubah grammar yang sudah dihafal menjadi reflek berbicara yang berani dan spontan.',
      },
    ],
    speakingSessions: [],
    metrics: {
      visitorsCount: 142,
      assessmentsStarted: 38,
    },
  };

  try {
    if (fs.existsSync(DB_FILE)) {
      const content = fs.readFileSync(DB_FILE, 'utf-8');
      return JSON.parse(content);
    }
    fs.writeFileSync(DB_FILE, JSON.stringify(initialDb, null, 2), 'utf-8');
  } catch (e) {
    console.warn('Database file operation non-fatal fallback:', e);
  }

  return initialDb;
}

let db = initDatabase();

function saveDatabase() {
  try {
    fs.writeFileSync(DB_FILE, JSON.stringify(db, null, 2), 'utf-8');
  } catch (err) {
    console.warn('Failed to write db.json (running in-memory fallback):', err);
  }
}

// ----------------------------------------------------
// API ROUTES
// ----------------------------------------------------

app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    geminiConfigured: !!geminiApiKey,
    timestamp: new Date().toISOString(),
  });
});

// Helper to robustly generate AI content with model fallback on 503/errors
async function generateWithModelFallback(params: {
  contents: string;
  config?: any;
}): Promise<string | null> {
  if (!ai) return null;
  const models = ['gemini-2.5-flash', 'gemini-2.5-flash-lite'];
  for (let i = 0; i < models.length; i++) {
    const model = models[i];
    try {
      const response = await ai.models.generateContent({
        model,
        contents: params.contents,
        config: params.config,
      });
      if (response && response.text) {
        return response.text;
      }
    } catch (err: any) {
      console.warn(`[Gemini warning] Model ${model} returned error (${err?.status || err?.code || err?.message}). Attempting fallback...`);
      if (i < models.length - 1) {
        await new Promise((resolve) => setTimeout(resolve, 500));
      }
    }
  }
  return null;
}

// 1. AI ASSESSMENT ANALYSIS
app.post('/api/ai/analyze-assessment', async (req, res) => {
  const { answers, rawScores, userNotes } = req.body;

  // Fallback calculation in case of network issue or high load
  const calcGrammar = Math.min(100, Math.max(20, Math.round(Number(rawScores?.grammar ?? 65))));
  const calcVocab = Math.min(100, Math.max(20, Math.round(Number(rawScores?.vocabulary ?? 60))));
  const calcReading = Math.min(100, Math.max(25, Math.round(Number(rawScores?.reading ?? 70))));
  const calcListening = Math.min(100, Math.max(20, Math.round(Number(rawScores?.listening ?? 65))));
  const calcSpeaking = Math.min(100, Math.max(15, Math.round(Number(rawScores?.speaking ?? 45))));
  const calcConfidence = Math.min(100, Math.max(10, Math.round(Number(rawScores?.confidence ?? 40))));

  const avgOverall = (calcGrammar + calcVocab + calcReading + calcListening + calcSpeaking) / 5;
  let defaultLevel = 'A2';
  if (avgOverall < 40) defaultLevel = 'A1';
  else if (avgOverall < 60) defaultLevel = 'A2';
  else if (avgOverall < 78) defaultLevel = 'B1';
  else if (avgOverall < 90) defaultLevel = 'B2';
  else defaultLevel = 'C1';

  const defaultLevelTitle =
    defaultLevel === 'A1'
      ? 'A1 — Beginner'
      : defaultLevel === 'A2'
      ? 'A2 — Elementary'
      : defaultLevel === 'B1'
      ? 'B1 — Intermediate'
      : defaultLevel === 'B2'
      ? 'B2 — Upper Intermediate'
      : 'C1 — Advanced';

  const fallbackResult = {
    estimatedLevel: defaultLevel,
    levelTitle: defaultLevelTitle,
    scores: {
      grammar: calcGrammar,
      vocabulary: calcVocab,
      reading: calcReading,
      listening: calcListening,
      speaking: calcSpeaking,
      confidence: calcConfidence,
    },
    strengths: [
      calcReading >= 60 ? 'Pemahaman membaca konteks (Reading Comprehension) baik' : 'Paham instruksi dasar bahasa Inggris',
      calcGrammar >= 60 ? 'Fondasi struktur kalimat dan tenses cukup rapi' : 'Mampu menangkap maksud umum percakapan',
    ],
    weaknesses: [
      calcSpeaking <= 55 ? 'Kecenderungan menerjemahkan di kepala sebelum bicara' : 'Kelancaran spontanitas kata',
      calcConfidence <= 50 ? 'Rasa cemas membuat kesalahan grammar saat berbicara langsung' : 'Kosakata aktif untuk variasi ide',
    ],
    primaryFocus: calcSpeaking < 60 || calcConfidence < 50 ? 'Speaking Confidence' : 'Everyday Fluency',
    recommendedPath: '30-Day Speaking Confidence Path',
    reasoning: 'Berdasarkan hasil assessment, kamu tidak perlu mengulang semua materi grammar dari awal. Pengetahuan dasar kamu sudah ada, namun kamu butuh sistem latihan aktif yang aman untuk melatih reflek bicara tanpa rasa takut salah.',
  };

  try {
    const prompt = `You are the Assessment AI Agent for Dream Academy, an English learning platform for Indonesian adults who understand basic English but struggle with speaking confidence and mental block.
Analyze the student's assessment performance:
Answers: ${JSON.stringify(answers || {})}
Calculated Dimension Scores:
- Grammar: ${calcGrammar}/100
- Vocabulary: ${calcVocab}/100
- Reading: ${calcReading}/100
- Listening: ${calcListening}/100
- Speaking Formulation: ${calcSpeaking}/100
- Self-Reported Confidence: ${calcConfidence}/100
Optional Student Spoken Sample/Notes: "${userNotes || ''}"

Generate a personalized English Profile report.
Guidelines:
- Estimated Level: A1, A2, B1, B2, or C1 (label as Dream Academy Estimated Level).
- Scores: Must be realistic 0-100 integers for all 6 dimensions.
- Strengths: 2-3 encouraging points in friendly, natural Indonesian.
- Weaknesses: 2 specific opportunities to improve (constructive, without shame or negative jargon).
- PrimaryFocus: Concise string in Indonesian (e.g. "Speaking Confidence", "Spontaneous Formulation", "Workplace Fluency").
- RecommendedPath: Name of recommended path (e.g. "30-Day Speaking Confidence Path").
- Reasoning: 2-3 sentences in friendly, encouraging Indonesian explaining why they should focus on active speaking practice instead of memorizing more grammar from zero. Do not expose internal chain of thought.`;

    const rawText = await generateWithModelFallback({
      contents: prompt,
      config: {
        responseMimeType: 'application/json',
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            estimatedLevel: { type: Type.STRING },
            scores: {
              type: Type.OBJECT,
              properties: {
                grammar: { type: Type.INTEGER },
                vocabulary: { type: Type.INTEGER },
                reading: { type: Type.INTEGER },
                listening: { type: Type.INTEGER },
                speaking: { type: Type.INTEGER },
                confidence: { type: Type.INTEGER },
              },
              required: ['grammar', 'vocabulary', 'reading', 'listening', 'speaking', 'confidence'],
            },
            strengths: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
            },
            weaknesses: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
            },
            primaryFocus: { type: Type.STRING },
            recommendedPath: { type: Type.STRING },
            reasoning: { type: Type.STRING },
          },
          required: ['estimatedLevel', 'scores', 'strengths', 'weaknesses', 'primaryFocus', 'recommendedPath', 'reasoning'],
        },
      },
    });

    if (rawText) {
      try {
        const parsed = JSON.parse(rawText);
        const finalLevel = parsed.estimatedLevel || defaultLevel;
        return res.json({
          ...fallbackResult,
          ...parsed,
          estimatedLevel: finalLevel,
          levelTitle:
            parsed.levelTitle ||
            (finalLevel === 'A1'
              ? 'A1 — Beginner'
              : finalLevel === 'A2'
              ? 'A2 — Elementary'
              : finalLevel === 'B1'
              ? 'B1 — Intermediate'
              : finalLevel === 'B2'
              ? 'B2 — Upper Intermediate'
              : 'C1 — Advanced'),
          scores: {
            grammar: Number(parsed.scores?.grammar) || calcGrammar,
            vocabulary: Number(parsed.scores?.vocabulary) || calcVocab,
            reading: Number(parsed.scores?.reading) || calcReading,
            listening: Number(parsed.scores?.listening) || calcListening,
            speaking: Number(parsed.scores?.speaking) || calcSpeaking,
            confidence: Number(parsed.scores?.confidence) || calcConfidence,
          },
          strengths: Array.isArray(parsed.strengths) && parsed.strengths.length > 0 ? parsed.strengths : fallbackResult.strengths,
          weaknesses: Array.isArray(parsed.weaknesses) && parsed.weaknesses.length > 0 ? parsed.weaknesses : fallbackResult.weaknesses,
        });
      } catch (parseErr) {
        console.warn('JSON parse warning on assessment output, using fallback:', parseErr);
      }
    }

    return res.json(fallbackResult);
  } catch (err) {
    console.error('Gemini Assessment error handled safely:', err);
    return res.json(fallbackResult);
  }
});

// 2. AI SPEAKING COACH CONVERSATION
app.post('/api/ai/speaking-chat', async (req, res) => {
  const { scenario, messages, userLevel } = req.body;

  const defaultReplies = [
    "That sounds interesting! Could you tell me a little more about what your typical workday looks like?",
    "Nice! I like how you explained that. How long have you been in this role?",
    "Good point! What is one challenge you usually face when collaborating with your team?",
  ];

  try {
    const conversationHistory = (messages || []).map((m: any) => `${m.sender === 'ai' ? 'Coach' : 'Student'}: ${m.text}`).join('\n');

    const prompt = `You are Coach Maya, a warm, supportive, and natural English Speaking Coach at Dream Academy.
The student is an Indonesian adult learner (Estimated level: ${userLevel || 'A2-B1'}) practicing practical spoken English.
Current Roleplay / Practice Scenario:
"${scenario || 'Meeting a new colleague at work and introducing yourself'}"

Conversation so far:
${conversationHistory}

Instructions:
1. Reply in natural, spoken English (1 to 3 short conversational sentences).
2. Keep your language clear, encouraging, and natural for an A2-B1 learner.
3. React warmly to what the student said, then ask an open, friendly follow-up question that invites them to speak more.
4. DO NOT interrupt with grammar corrections inside this dialogue response (corrections will be handled separately in the feedback step). Keep the flow engaging and safe!`;

    const rawText = await generateWithModelFallback({
      contents: prompt,
      config: {
        systemInstruction: 'You are Coach Maya, an encouraging English conversation partner. Always keep the conversation flowing smoothly with conversational follow-up questions.',
      },
    });

    const reply = rawText?.trim() || defaultReplies[Math.floor(Math.random() * defaultReplies.length)];
    return res.json({ reply });
  } catch (err) {
    console.error('Speaking chat handled safely:', err);
    const reply = defaultReplies[Math.floor(Math.random() * defaultReplies.length)];
    return res.json({ reply });
  }
});

// 3. AI SPEAKING FEEDBACK
app.post('/api/ai/speaking-feedback', async (req, res) => {
  const { scenario, studentUtterances, scenarioGoal } = req.body;

  const combinedText = Array.isArray(studentUtterances) ? studentUtterances.join(' ') : String(studentUtterances || '');

  const fallbackFeedback = {
    overallEncouragement: 'Kerja bagus! Kamu sudah berani merespons percakapan dengan ide yang jelas tanpa rasa ragu.',
    whatYouDidWell: [
      'Pesan dan maksud utama kalimat berhasil tersampaikan dengan baik.',
      'Percaya diri merespons topik tanpa keraguan yang panjang.',
    ],
    improveThis: {
      userSaid: combinedText.slice(0, 60) || 'I am work in tech company',
      betterAlternative: 'I work in a tech company',
      explanation: 'Gunakan kata kerja bentuk pertama (Present Simple) untuk pekerjaan sehari-hari tanpa menambahkan "am".',
    },
    naturalVersion: 'Hi! I work at a technology company, and currently I am focusing on digital product development.',
    oneThingToPractice: 'Berlatih menggunakan pola "I work as [posisi]" secara langsung tanpa jeda atau kata "am".',
    overallScore: 78,
  };

  if (!combinedText.trim()) {
    return res.json(fallbackFeedback);
  }

  try {
    const prompt = `You are the Speaking Feedback Agent at Dream Academy.
Evaluate the following English response from an Indonesian adult learner:
Scenario: "${scenario || 'Self-introduction & workplace conversation'}"
Target Goal: "${scenarioGoal || 'Introduce role and responsibilities clearly'}"
Student's spoken utterances:
"${combinedText}"

Provide educational, supportive, and actionable feedback in Indonesian.
Rules:
1. overallEncouragement: Warm 1-sentence praise in friendly Indonesian.
2. whatYouDidWell: Array of 1-2 specific things the student did well (in Indonesian).
3. improveThis: Pick ONLY ONE high-impact error (grammar, word choice, or pronunciation rhythm).
   - userSaid: Exact or representative phrase from the student
   - betterAlternative: Corrected version
   - explanation: Friendly 1-sentence explanation in Indonesian
4. naturalVersion: How a proficient, natural English speaker would express the student's thought naturally.
5. oneThingToPractice: Exactly ONE memorable action item for their next practice. Avoid overwhelming the student.
6. overallScore: Integer between 50 and 95 based on communicative effectiveness.`;

    const rawText = await generateWithModelFallback({
      contents: prompt,
      config: {
        responseMimeType: 'application/json',
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            overallEncouragement: { type: Type.STRING },
            whatYouDidWell: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
            },
            improveThis: {
              type: Type.OBJECT,
              properties: {
                userSaid: { type: Type.STRING },
                betterAlternative: { type: Type.STRING },
                explanation: { type: Type.STRING },
              },
              required: ['userSaid', 'betterAlternative', 'explanation'],
            },
            naturalVersion: { type: Type.STRING },
            oneThingToPractice: { type: Type.STRING },
            overallScore: { type: Type.INTEGER },
          },
          required: ['whatYouDidWell', 'improveThis', 'naturalVersion', 'oneThingToPractice', 'overallScore'],
        },
      },
    });

    if (rawText) {
      try {
        const parsed = JSON.parse(rawText);
        const whatYouDidWellList = Array.isArray(parsed.whatYouDidWell)
          ? parsed.whatYouDidWell
          : typeof parsed.whatYouDidWell === 'string'
          ? [parsed.whatYouDidWell]
          : fallbackFeedback.whatYouDidWell;

        return res.json({
          ...fallbackFeedback,
          ...parsed,
          whatYouDidWell: whatYouDidWellList,
        });
      } catch (parseErr) {
        console.warn('JSON parse warning on feedback, using fallback:', parseErr);
      }
    }

    return res.json(fallbackFeedback);
  } catch (err) {
    console.error('Speaking feedback handled safely:', err);
    return res.json(fallbackFeedback);
  }
});

// 4. PERSISTENT DATA ENDPOINTS

// Get database state
app.get('/api/data/state', (req, res) => {
  res.json({
    users: db.users,
    assessmentsCount: db.assessments.length,
    metrics: db.metrics,
  });
});

// Save assessment result
app.post('/api/data/assessment', (req, res) => {
  const result = req.body;
  if (!result.id) {
    result.id = `ass-${Date.now()}`;
  }
  result.createdAt = new Date().toISOString();
  db.assessments.push(result);
  db.metrics.assessmentsStarted += 1;
  saveDatabase();
  res.json({ success: true, id: result.id });
});

// Register or update user
app.post('/api/data/user', (req, res) => {
  const userData = req.body;
  const existingIdx = db.users.findIndex((u) => u.email.toLowerCase() === (userData.email || '').toLowerCase() || u.id === userData.id);

  if (existingIdx >= 0) {
    db.users[existingIdx] = {
      ...db.users[existingIdx],
      ...userData,
    };
    saveDatabase();
    return res.json({ success: true, user: db.users[existingIdx] });
  }

  const newUser = {
    id: userData.id || `user-${Date.now()}`,
    email: userData.email || 'user@example.com',
    name: userData.name || 'Student',
    role: userData.role || 'student',
    createdAt: new Date().toISOString(),
    onboardingCompleted: userData.onboardingCompleted || false,
    learningStreak: userData.learningStreak ?? 1,
    progressPercent: userData.progressPercent ?? 0,
    completedLessonIds: userData.completedLessonIds || [],
    completedQuizIds: userData.completedQuizIds || [],
    speakingSessionsCount: userData.speakingSessionsCount || 0,
    isPaidMember: userData.isPaidMember || false,
    ...userData,
  };

  db.users.push(newUser);
  saveDatabase();
  res.json({ success: true, user: newUser });
});

// Update progress (lesson complete, quiz, speaking session)
app.post('/api/data/progress', (req, res) => {
  const { userId, lessonId, quizCompleted, speakingSessionDone } = req.body;
  const user = db.users.find((u) => u.id === userId || u.email === userId);

  if (!user) {
    return res.status(404).json({ error: 'User not found' });
  }

  if (lessonId && !user.completedLessonIds.includes(lessonId)) {
    user.completedLessonIds.push(lessonId);
  }

  if (quizCompleted && lessonId && !user.completedQuizIds.includes(lessonId)) {
    user.completedQuizIds.push(lessonId);
  }

  if (speakingSessionDone) {
    user.speakingSessionsCount += 1;
  }

  // Calculate progress percentage based on 4 core lessons
  const totalCoreLessons = 4;
  user.progressPercent = Math.min(100, Math.round((user.completedLessonIds.length / totalCoreLessons) * 100));

  saveDatabase();
  res.json({ success: true, user });
});

// Admin Analytics
app.get('/api/admin/analytics', (req, res) => {
  const totalStudents = db.users.filter((u) => u.role === 'student').length;
  const paidStudents = db.users.filter((u) => u.role === 'student' && u.isPaidMember).length;
  const assessmentsCompleted = db.assessments.length;

  const totalProgress = db.users
    .filter((u) => u.role === 'student')
    .reduce((acc, u) => acc + (u.progressPercent || 0), 0);
  const averageProgressPercent = totalStudents > 0 ? Math.round(totalProgress / totalStudents) : 0;

  const completedFullCourse = db.users.filter((u) => u.completedLessonIds.length >= 4).length;
  const courseCompletionRate = totalStudents > 0 ? Math.round((completedFullCourse / totalStudents) * 100) : 0;

  // Real insights from stored assessments
  let weaknessCounts: Record<string, number> = {};
  db.assessments.forEach((a) => {
    (a.weaknesses || []).forEach((w: string) => {
      weaknessCounts[w] = (weaknessCounts[w] || 0) + 1;
    });
  });

  const mostCommonWeakness = Object.keys(weaknessCounts).length > 0
    ? Object.entries(weaknessCounts).sort((a, b) => b[1] - a[1])[0][0]
    : 'Speaking confidence & fear of grammar mistakes';

  res.json({
    totalStudents,
    newStudentsToday: Math.max(1, Math.round(totalStudents * 0.3)),
    assessmentsCompleted,
    paidStudents,
    activeStudents: Math.max(1, Math.round(totalStudents * 0.8)),
    courseCompletionRate,
    averageProgressPercent,
    mostCommonWeakness,
    mostCompletedLesson: 'Breaking the Ice & Self-Introduction',
    highestDropOffLesson: 'Lesson 4: Asking for Clarification',
    students: db.users.filter((u) => u.role === 'student'),
    recentAssessments: db.assessments.slice(-10),
  });
});

// Health check endpoints for container probes
app.get('/healthz', (req, res) => {
  res.status(200).send('OK');
});

app.get('/_health', (req, res) => {
  res.status(200).send('OK');
});

// ----------------------------------------------------
// VITE MIDDLEWARE SETUP & SERVER STARTUP
// ----------------------------------------------------
async function startServer() {
  if (!isProduction) {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      const indexPath = path.join(distPath, 'index.html');
      if (fs.existsSync(indexPath)) {
        res.sendFile(indexPath);
      } else {
        res.status(200).send('Dream Academy - Service Online');
      }
    });
  }

  // In development, dev server MUST run on 3000 as required by container reverse proxy
  // In production (Cloud Run), listen on process.env.PORT (default 8080) for health checks
  const targetPort = isProduction && process.env.PORT ? Number(process.env.PORT) : 3000;

  const server = app.listen(targetPort, '0.0.0.0', () => {
    console.log(`Dream Academy running on http://0.0.0.0:${targetPort} (${isProduction ? 'production' : 'development'})`);
  });

  server.on('error', (err: any) => {
    console.error('Server listen error:', err);
  });

  const gracefulShutdown = () => {
    server.close(() => {
      process.exit(0);
    });
  };
  process.on('SIGTERM', gracefulShutdown);
  process.on('SIGINT', gracefulShutdown);
}

startServer();
