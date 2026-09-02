import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { api } from '../../services/api';
import { UserProfile, CourseContent } from '../../types';
import {
  Users,
  Award,
  TrendingUp,
  BookOpen,
  DollarSign,
  AlertCircle,
  CheckCircle2,
  Search,
  Settings,
  Edit,
  Save,
  Plus,
  Flame,
} from 'lucide-react';

export const AdminDashboard: React.FC = () => {
  const { courses, setCourses, setCurrentView } = useApp();

  const [activeTab, setActiveTab] = useState<'analytics' | 'students' | 'content'>('analytics');
  const [stats, setStats] = useState({
    totalUsers: 28,
    assessmentsCompleted: 42,
    paidMembers: 8,
    averageProgressPercent: 32,
    mostCommonWeakness: 'Speaking Confidence & Spontanitas',
    mostCompletedLesson: 'Talking About Yourself',
  });

  const [students, setStudents] = useState<UserProfile[]>([
    {
      id: 'usr-1',
      name: 'Rizky Pratama',
      email: 'rizky.pratama@gmail.com',
      role: 'student',
      createdAt: '2026-02-15',
      estimatedLevel: 'A2',
      learningStreak: 7,
      progressPercent: 25,
      completedLessonIds: ['les-1'],
      completedQuizIds: ['les-1'],
      speakingSessionsCount: 3,
      isPaidMember: false,
      onboardingCompleted: true,
    },
    {
      id: 'usr-2',
      name: 'Sarah Andini',
      email: 'sarah.andini@techcorp.id',
      role: 'student',
      createdAt: '2026-02-18',
      estimatedLevel: 'B1',
      learningStreak: 12,
      progressPercent: 75,
      completedLessonIds: ['les-1', 'les-2', 'les-3'],
      completedQuizIds: ['les-1', 'les-2', 'les-3'],
      speakingSessionsCount: 8,
      isPaidMember: true,
      onboardingCompleted: true,
    },
    {
      id: 'usr-3',
      name: 'Budi Santoso',
      email: 'budi.santoso@startup.co',
      role: 'student',
      createdAt: '2026-02-20',
      estimatedLevel: 'A1',
      learningStreak: 4,
      progressPercent: 25,
      completedLessonIds: ['les-1'],
      completedQuizIds: ['les-1'],
      speakingSessionsCount: 2,
      isPaidMember: false,
      onboardingCompleted: true,
    },
    {
      id: 'usr-4',
      name: 'Dewi Lestari',
      email: 'dewi.lestari@agency.id',
      role: 'student',
      createdAt: '2026-02-24',
      estimatedLevel: 'B1',
      learningStreak: 15,
      progressPercent: 100,
      completedLessonIds: ['les-1', 'les-2', 'les-3', 'les-4'],
      completedQuizIds: ['les-1', 'les-2', 'les-3', 'les-4'],
      speakingSessionsCount: 14,
      isPaidMember: true,
      onboardingCompleted: true,
    },
  ]);

  const [searchQuery, setSearchQuery] = useState('');
  const [editingLessonId, setEditingLessonId] = useState<string | null>(null);
  const [editYoutubeId, setEditYoutubeId] = useState('');
  const [editTitle, setEditTitle] = useState('');

  useEffect(() => {
    // Fetch live analytics from server
    api.getAdminAnalytics()
      .then((data) => {
        if (data.stats) {
          setStats((prev) => ({
            ...prev,
            totalUsers: data.stats.totalUsers || prev.totalUsers,
            assessmentsCompleted: data.stats.totalAssessments || prev.assessmentsCompleted,
          }));
        }
      })
      .catch((e) => console.log('Analytics load fallback:', e));
  }, []);

  const handleEditLesson = (lesson: any) => {
    setEditingLessonId(lesson.id);
    setEditTitle(lesson.title);
    setEditYoutubeId(lesson.youtubeVideoId);
  };

  const handleSaveLesson = () => {
    if (!editingLessonId) return;

    setCourses((prev) =>
      prev.map((course) => ({
        ...course,
        modules: course.modules.map((m) => ({
          ...m,
          lessons: m.lessons.map((l) =>
            l.id === editingLessonId
              ? { ...l, title: editTitle, youtubeVideoId: editYoutubeId }
              : l
          ),
        })),
      }))
    );
    setEditingLessonId(null);
  };

  const filteredStudents = students.filter(
    (s) =>
      s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (s.estimatedLevel || '').toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 space-y-8">
      {/* Admin Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b-2 border-[#1A1A1A]/10">
        <div>
          <div className="flex items-center space-x-2 text-xs font-black uppercase tracking-widest text-[#FF5733] mb-1">
            <span>Admin Control Center</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-[#1A1A1A] tracking-tight">
            Dream Academy Overview
          </h1>
          <p className="text-xs text-[#4A4A4A] font-semibold">
            Pantau pertumbuhan pelajar, tren kelemahan English, dan kurikulum konten.
          </p>
        </div>

        <div className="flex items-center space-x-2">
          <button
            onClick={() => setCurrentView('dashboard')}
            className="px-4 py-2.5 rounded-xl bg-white hover:bg-[#F3F3F1] border-2 border-[#1A1A1A] text-[#1A1A1A] text-xs font-black uppercase tracking-wider cursor-pointer shadow-[3px_3px_0px_0px_#1A1A1A] transition-all hover:translate-x-0.5 hover:translate-y-0.5"
          >
            Lihat Sebagai Siswa
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center space-x-4 border-b-2 border-[#1A1A1A]/10 text-xs sm:text-sm font-black uppercase tracking-wider overflow-x-auto pb-1">
        <button
          onClick={() => setActiveTab('analytics')}
          className={`pb-3 px-2 cursor-pointer transition-colors whitespace-nowrap ${
            activeTab === 'analytics'
              ? 'border-b-2 border-[#FF5733] text-[#FF5733]'
              : 'text-[#4A4A4A] hover:text-[#1A1A1A]'
          }`}
        >
          Overview & Insights
        </button>
        <button
          onClick={() => setActiveTab('students')}
          className={`pb-3 px-2 cursor-pointer transition-colors whitespace-nowrap ${
            activeTab === 'students'
              ? 'border-b-2 border-[#FF5733] text-[#FF5733]'
              : 'text-[#4A4A4A] hover:text-[#1A1A1A]'
          }`}
        >
          Daftar Siswa ({filteredStudents.length})
        </button>
        <button
          onClick={() => setActiveTab('content')}
          className={`pb-3 px-2 cursor-pointer transition-colors whitespace-nowrap ${
            activeTab === 'content'
              ? 'border-b-2 border-[#FF5733] text-[#FF5733]'
              : 'text-[#4A4A4A] hover:text-[#1A1A1A]'
          }`}
        >
          Manajemen Kurikulum & Video
        </button>
      </div>

      {/* TAB 1: OVERVIEW & INSIGHTS */}
      {activeTab === 'analytics' && (
        <div className="space-y-8">
          {/* Top Metric Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-white p-5 rounded-[24px] border-2 border-[#1A1A1A] shadow-[4px_4px_0px_0px_#1A1A1A]">
              <div className="flex items-center justify-between text-[#4A4A4A] mb-2">
                <span className="text-xs font-black uppercase tracking-wider">Total Pelajar</span>
                <Users className="w-4 h-4 text-[#FF5733]" />
              </div>
              <div className="text-2xl font-black text-[#1A1A1A]">{stats.totalUsers}</div>
              <span className="text-[11px] text-emerald-700 font-black uppercase tracking-wide">+14% minggu ini</span>
            </div>

            <div className="bg-white p-5 rounded-[24px] border-2 border-[#1A1A1A] shadow-[4px_4px_0px_0px_#1A1A1A]">
              <div className="flex items-center justify-between text-[#4A4A4A] mb-2">
                <span className="text-xs font-black uppercase tracking-wider">Assessment Selesai</span>
                <Award className="w-4 h-4 text-[#FF5733]" />
              </div>
              <div className="text-2xl font-black text-[#1A1A1A]">{stats.assessmentsCompleted}</div>
              <span className="text-[11px] text-[#4A4A4A] font-semibold">Diagnostik 6 dimensi terisi</span>
            </div>

            <div className="bg-white p-5 rounded-[24px] border-2 border-[#1A1A1A] shadow-[4px_4px_0px_0px_#1A1A1A]">
              <div className="flex items-center justify-between text-[#4A4A4A] mb-2">
                <span className="text-xs font-black uppercase tracking-wider">Siswa Berlangganan</span>
                <DollarSign className="w-4 h-4 text-[#FF5733]" />
              </div>
              <div className="text-2xl font-black text-[#1A1A1A]">{stats.paidMembers}</div>
              <span className="text-[11px] text-[#FF5733] font-black uppercase tracking-wide">Core Membership</span>
            </div>

            <div className="bg-white p-5 rounded-[24px] border-2 border-[#1A1A1A] shadow-[4px_4px_0px_0px_#1A1A1A]">
              <div className="flex items-center justify-between text-[#4A4A4A] mb-2">
                <span className="text-xs font-black uppercase tracking-wider">Rata-rata Progress</span>
                <TrendingUp className="w-4 h-4 text-[#FF5733]" />
              </div>
              <div className="text-2xl font-black text-[#1A1A1A]">{stats.averageProgressPercent}%</div>
              <span className="text-[11px] text-[#4A4A4A] font-semibold">Penyelesaian materi 30 hari</span>
            </div>
          </div>

          {/* Key Insights */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white p-6 rounded-[28px] border-2 border-[#1A1A1A] shadow-[6px_6px_0px_0px_#1A1A1A] space-y-4">
              <h3 className="text-base font-black text-[#1A1A1A] flex items-center space-x-2">
                <AlertCircle className="w-4 h-4 text-[#FF5733]" />
                <span>Learning Insights — Kelemahan Paling Umum</span>
              </h3>
              <div className="p-5 bg-[#FFF0EB] border-2 border-[#FF5733] rounded-2xl space-y-2 shadow-[3px_3px_0px_0px_#FF5733]">
                <span className="text-xs font-black text-[#FF5733] uppercase tracking-wider block">
                  Kelemahan #1: {stats.mostCommonWeakness}
                </span>
                <p className="text-xs font-semibold text-[#1A1A1A] leading-relaxed">
                  68% responden tes kemampuan memiliki skor speaking & confidence di bawah 45/100, meskipun reading score mereka di atas 70. Ini memvalidasi kebutuhan latihan AI Speaking Coach.
                </p>
              </div>
            </div>

            <div className="bg-white p-6 rounded-[28px] border-2 border-[#1A1A1A] shadow-[6px_6px_0px_0px_#1A1A1A] space-y-4">
              <h3 className="text-base font-black text-[#1A1A1A] flex items-center space-x-2">
                <BookOpen className="w-4 h-4 text-emerald-700" />
                <span>Materi Paling Sering Diselesaikan</span>
              </h3>
              <div className="p-5 bg-[#F3F3F1] border-2 border-[#1A1A1A] rounded-2xl space-y-2 shadow-[3px_3px_0px_0px_#1A1A1A]">
                <span className="text-xs font-black text-[#1A1A1A] uppercase tracking-wider block">
                  Pelajaran #1: {stats.mostCompletedLesson}
                </span>
                <p className="text-xs font-semibold text-[#4A4A4A] leading-relaxed">
                  Tingkat penyelesaian modul ini mencapai 89% dengan rata-rata 3 sesi roleplay speaking per siswa.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: STUDENTS LIST */}
      {activeTab === 'students' && (
        <div className="bg-white rounded-[28px] border-2 border-[#1A1A1A] overflow-hidden shadow-[6px_6px_0px_0px_#1A1A1A] space-y-4 p-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="relative flex-1 max-w-sm">
              <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-[#4A4A4A]" />
              <input
                type="text"
                placeholder="Cari siswa berdasarkan nama, email, level..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-4 py-2.5 rounded-xl border-2 border-[#1A1A1A] text-xs font-semibold text-[#1A1A1A] focus:outline-none focus:border-[#FF5733]"
              />
            </div>
            <span className="text-xs font-black uppercase tracking-wider text-[#4A4A4A]">
              Menampilkan {filteredStudents.length} siswa
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-[#1A1A1A]">
              <thead className="bg-[#F3F3F1] border-b-2 border-[#1A1A1A] text-[#1A1A1A] font-black uppercase tracking-wider text-[10px]">
                <tr>
                  <th className="p-3.5">Nama & Email</th>
                  <th className="p-3.5">Level CEFR</th>
                  <th className="p-3.5">Streak</th>
                  <th className="p-3.5">Progress</th>
                  <th className="p-3.5">Sesi Speaking</th>
                  <th className="p-3.5">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y-2 divide-[#1A1A1A]/10 font-semibold">
                {filteredStudents.map((s) => (
                  <tr key={s.id} className="hover:bg-[#FFF0EB]/40 transition-colors">
                    <td className="p-3.5">
                      <div className="font-black text-[#1A1A1A]">{s.name}</div>
                      <div className="text-[11px] text-[#4A4A4A]">{s.email}</div>
                    </td>
                    <td className="p-3.5">
                      <span className="px-2.5 py-1 rounded-md bg-[#FFF0EB] border-2 border-[#FF5733] font-black text-[#FF5733] text-[11px]">
                        {s.estimatedLevel || 'A2'}
                      </span>
                    </td>
                    <td className="p-3.5">
                      <span className="flex items-center space-x-1 font-black text-[#FF5733]">
                        <Flame className="w-3.5 h-3.5 fill-[#FF5733]" />
                        <span>{s.learningStreak} Hari</span>
                      </span>
                    </td>
                    <td className="p-3.5">
                      <div className="flex items-center space-x-2">
                        <div className="w-16 bg-[#F3F3F1] border border-[#1A1A1A] rounded-full h-2 overflow-hidden p-0.5">
                          <div
                            className="bg-[#FF5733] h-full rounded-full"
                            style={{ width: `${s.progressPercent}%` }}
                          />
                        </div>
                        <span className="text-[11px] font-black text-[#1A1A1A]">
                          {s.progressPercent}%
                        </span>
                      </div>
                    </td>
                    <td className="p-3.5 font-bold text-[#1A1A1A]">
                      {s.speakingSessionsCount} sesi
                    </td>
                    <td className="p-3.5">
                      <span
                        className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider border-2 border-[#1A1A1A] ${
                          s.isPaidMember
                            ? 'bg-[#FFF0EB] text-[#FF5733]'
                            : 'bg-[#F3F3F1] text-[#1A1A1A]'
                        }`}
                      >
                        {s.isPaidMember ? 'Core Member' : 'Free Tier'}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 3: CONTENT MANAGEMENT */}
      {activeTab === 'content' && (
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-[28px] border-2 border-[#1A1A1A] shadow-[6px_6px_0px_0px_#1A1A1A] space-y-4">
            <div>
              <h3 className="text-lg font-black text-[#1A1A1A] tracking-tight">
                Manajemen Materi & Video Pembelajaran
              </h3>
              <p className="text-xs text-[#4A4A4A] font-semibold mt-1">
                Edit judul pelajaran dan YouTube Video ID langsung di sini.
              </p>
            </div>

            {courses[0].modules.map((mod) => (
              <div key={mod.id} className="border-2 border-[#1A1A1A] rounded-2xl overflow-hidden mb-5 shadow-[3px_3px_0px_0px_#1A1A1A]">
                <div className="bg-[#F3F3F1] p-4 font-black text-xs uppercase tracking-wider text-[#1A1A1A] border-b-2 border-[#1A1A1A]">
                  {mod.title}
                </div>
                <div className="divide-y-2 divide-[#1A1A1A]/10">
                  {mod.lessons.map((lesson) => {
                    const isEditing = editingLessonId === lesson.id;
                    return (
                      <div key={lesson.id} className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white">
                        {isEditing ? (
                          <div className="space-y-2 flex-1">
                            <input
                              type="text"
                              value={editTitle}
                              onChange={(e) => setEditTitle(e.target.value)}
                              className="w-full text-xs font-bold border-2 border-[#1A1A1A] rounded-lg p-2.5"
                              placeholder="Judul Pelajaran"
                            />
                            <input
                              type="text"
                              value={editYoutubeId}
                              onChange={(e) => setEditYoutubeId(e.target.value)}
                              className="w-full text-xs font-mono border-2 border-[#1A1A1A] rounded-lg p-2.5"
                              placeholder="YouTube Video ID (contoh: 2o8XfL3jTrc)"
                            />
                          </div>
                        ) : (
                          <div>
                            <h4 className="text-xs font-black text-[#1A1A1A]">{lesson.title}</h4>
                            <p className="text-[11px] text-[#4A4A4A] font-semibold mt-0.5">
                              YouTube ID: <code className="bg-[#F3F3F1] border border-[#1A1A1A] px-1.5 py-0.5 rounded text-xs font-bold">{lesson.youtubeVideoId}</code>
                            </p>
                          </div>
                        )}

                        <div className="flex items-center space-x-2">
                          {isEditing ? (
                            <button
                              onClick={handleSaveLesson}
                              className="px-4 py-2 bg-[#FF5733] text-white rounded-xl text-xs font-black uppercase tracking-wider flex items-center space-x-1.5 cursor-pointer border-2 border-[#1A1A1A] shadow-[2px_2px_0px_0px_#1A1A1A]"
                            >
                              <Save className="w-3.5 h-3.5" />
                              <span>Simpan</span>
                            </button>
                          ) : (
                            <button
                              onClick={() => handleEditLesson(lesson)}
                              className="px-4 py-2 border-2 border-[#1A1A1A] hover:bg-[#F3F3F1] text-[#1A1A1A] rounded-xl text-xs font-black uppercase tracking-wider flex items-center space-x-1.5 cursor-pointer shadow-[2px_2px_0px_0px_#1A1A1A]"
                            >
                              <Edit className="w-3.5 h-3.5" />
                              <span>Edit</span>
                            </button>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
