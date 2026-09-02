import { AssessmentQuestion, CourseContent } from '../types';

export const ASSESSMENT_QUESTIONS: AssessmentQuestion[] = [
  // 1. GRAMMAR
  {
    id: 'g1',
    dimension: 'grammar',
    title: 'Grammar in Action — Everyday Communication',
    subtitle: 'Pilih kalimat yang paling tepat dan natural untuk situasi di bawah ini:',
    scenario: 'Kamu ingin menceritakan bahwa kamu sudah bekerja di perusahaan saat ini selama 3 tahun.',
    options: [
      { id: 'a', label: 'A', text: 'I am working here since three years ago.', scoreValue: 30 },
      { id: 'b', label: 'B', text: 'I have been working here for three years.', scoreValue: 100 },
      { id: 'c', label: 'C', text: 'I work here already three years.', scoreValue: 20 },
      { id: 'd', label: 'D', text: 'I was worked here for three years.', scoreValue: 10 },
    ],
    type: 'multiple-choice',
  },
  {
    id: 'g2',
    dimension: 'grammar',
    title: 'Grammar in Action — Polite Requests',
    subtitle: 'Pilih cara paling tepat untuk meminta tolong kolega mengirimkan laporan:',
    scenario: 'Kamu perlu laporan sebelum jam 5 sore secara sopan namun profesional.',
    options: [
      { id: 'a', label: 'A', text: 'Would you mind sending me the report before 5 PM?', scoreValue: 100 },
      { id: 'b', label: 'B', text: 'Do you can send me report before 5 PM please?', scoreValue: 30 },
      { id: 'c', label: 'C', text: 'Must send the report to me before 5 PM.', scoreValue: 10 },
      { id: 'd', label: 'D', text: 'Are you mind to send me the report before 5 PM?', scoreValue: 25 },
    ],
    type: 'multiple-choice',
  },

  // 2. VOCABULARY
  {
    id: 'v1',
    dimension: 'vocabulary',
    title: 'Vocabulary — Workplace & Collaboration',
    subtitle: 'Pilih kata yang paling cocok untuk melengkapi kalimat berikut:',
    scenario: '"We need to ______ the meeting because our client is currently stuck in traffic."',
    options: [
      { id: 'a', label: 'A', text: 'postpone (menunda)', scoreValue: 100 },
      { id: 'b', label: 'B', text: 'prolong (memperpanjang durasi)', scoreValue: 40 },
      { id: 'c', label: 'C', text: 'dismiss (memecat/membubarkan)', scoreValue: 20 },
      { id: 'd', label: 'D', text: 'hesitate (ragu-ragu)', scoreValue: 10 },
    ],
    type: 'multiple-choice',
  },
  {
    id: 'v2',
    dimension: 'vocabulary',
    title: 'Vocabulary — Expressing Opinions',
    subtitle: 'Pilih ungkapan yang paling natural saat kamu setuju sepenuhnya dengan pendapat rekan kerjamu:',
    scenario: 'Rekanmu berkata: "I think we should simplify our presentation slide deck."',
    options: [
      { id: 'a', label: 'A', text: 'I couldn\'t agree more. That will make it punchier.', scoreValue: 100 },
      { id: 'b', label: 'B', text: 'I am fully accept your words.', scoreValue: 35 },
      { id: 'c', label: 'C', text: 'I am same thinking with you.', scoreValue: 25 },
      { id: 'd', label: 'D', text: 'I agree my mind with it.', scoreValue: 15 },
    ],
    type: 'multiple-choice',
  },

  // 3. READING
  {
    id: 'r1',
    dimension: 'reading',
    title: 'Reading Comprehension — Real Email Message',
    subtitle: 'Baca pesan singkat di bawah ini dan jawab pertanyaannya:',
    scenario: 'Email dari Sarah (Product Manager):\n"Hey team! Just a heads-up that our weekly sprint review is rescheduled from 2 PM to 4 PM this Thursday due to an urgent client sync. Please ensure your demo links are updated beforehand."',
    options: [
      { id: 'a', label: 'A', text: 'Rapat sprint review dibatalkan karena klien berhalangan hadir.', scoreValue: 10 },
      { id: 'b', label: 'B', text: 'Rapat dimundurkan 2 jam lebih lambat dan peserta harus menyiapkan link demo.', scoreValue: 100 },
      { id: 'c', label: 'C', text: 'Rapat dimajukan menjadi jam 2 pagi waktu setempat.', scoreValue: 10 },
      { id: 'd', label: 'D', text: 'Klien akan memimpin jalannya sprint review hari Kamis.', scoreValue: 20 },
    ],
    type: 'multiple-choice',
  },

  // 4. LISTENING
  {
    id: 'l1',
    dimension: 'listening',
    title: 'Listening & Audio Comprehension',
    subtitle: 'Dengarkan audio singkat di bawah ini (klik tombol Putar Suara):',
    audioPrompt: 'Hi there! Could you please double-check the budget calculation in the spreadsheet before we submit it to our director?',
    scenario: 'Audio: "Hi there! Could you please double-check the budget calculation in the spreadsheet before we submit it to our director?"\nApa yang diminta oleh pembicara?',
    options: [
      { id: 'a', label: 'A', text: 'Menghapus data pengeluaran sebelum dikirim ke direktur.', scoreValue: 10 },
      { id: 'b', label: 'B', text: 'Memeriksa ulang perhitungan anggaran di spreadsheet.', scoreValue: 100 },
      { id: 'c', label: 'C', text: 'Membuat dokumen presentasi baru untuk direktur.', scoreValue: 20 },
      { id: 'd', label: 'D', text: 'Mengirimkan email konfirmasi ke bagian finance.', scoreValue: 20 },
    ],
    type: 'multiple-choice',
  },

  // 5. SPEAKING (Practical formulation)
  {
    id: 's1',
    dimension: 'speaking',
    title: 'Speaking Simulation — Spontaneous Formulation',
    subtitle: 'Bagaimana kamu merespons situasi percakapan berikut secara spontan?',
    scenario: 'Situasi: Seorang rekan kerja asing bertanya: "Hey, what have you been working on recently?"\nManakah respons yang paling natural dan percaya diri?',
    options: [
      { id: 'a', label: 'A', text: '"Lately I\'ve been focused on refining our onboarding flow to improve user retention."', scoreValue: 100 },
      { id: 'b', label: 'B', text: '"I work on project. It is computer work. Sometime hard, but okay."', scoreValue: 40 },
      { id: 'c', label: 'C', text: '"My job is do many tasks everyday, nothing special."', scoreValue: 30 },
      { id: 'd', label: 'D', text: '"Sorry, my English is not very good... I do my regular job."', scoreValue: 15 },
    ],
    type: 'multiple-choice',
  },
  {
    id: 's2',
    dimension: 'speaking',
    title: 'Speaking Practice — Your Own Words (Optional Voice/Text)',
    subtitle: 'Coba sampaikan perkenalan singkat tentang dirimu (pekerjaan atau minatmu):',
    scenario: 'Contoh panduan: "Hi, my name is [Nama], I currently work as [Peran] and I want to improve my English because..."',
    type: 'speaking-prompt',
    speakingSamplePrompt: 'Hi, my name is Alex. I work in product design in Jakarta. I want to speak English more confidently so I can participate actively in global team meetings.',
  },

  // 6. CONFIDENCE (Self-reported diagnostic)
  {
    id: 'c1',
    dimension: 'confidence',
    title: 'Confidence Diagnostic — The Speaking Mental Block',
    subtitle: 'Apa yang paling sering kamu rasakan saat harus berbicara bahasa Inggris secara spontan?',
    options: [
      { id: 'a', label: 'A', text: 'Pikiran saya mendadak "blank" dan takut salah grammar di depan orang lain.', scoreValue: 25 },
      { id: 'b', label: 'B', text: 'Saya tahu apa yang ingin saya katakan, tapi butuh waktu lama menerjemahkannya di kepala.', scoreValue: 50 },
      { id: 'c', label: 'C', text: 'Cukup berani berbicara meski kadang ada kata yang terlewat atau tersendat.', scoreValue: 75 },
      { id: 'd', label: 'D', text: 'Sangat santai dan tidak takut salah, yang penting pesan tersampaikan.', scoreValue: 100 },
    ],
    type: 'scale',
  },
  {
    id: 'c2',
    dimension: 'confidence',
    title: 'Confidence Diagnostic — Daily Practice Habit',
    subtitle: 'Seberapa sering kamu aktif melatih kemampuan berbicara bahasa Inggris dalam kehidupan nyata?',
    options: [
      { id: 'a', label: 'A', text: 'Hampir tidak pernah sama sekali karena tidak ada partner bicara.', scoreValue: 20 },
      { id: 'b', label: 'B', text: 'Hanya sesekali saat terpaksa (misal meeting kantor atau interview).', scoreValue: 45 },
      { id: 'c', label: 'C', text: 'Seminggu sekali mencoba menonton atau membaca materi berbahasa Inggris.', scoreValue: 60 },
      { id: 'd', label: 'D', text: 'Hampir setiap hari aktif mendengarkan dan mencoba self-talk / speaking.', scoreValue: 90 },
    ],
    type: 'scale',
  },
];

export const INITIAL_COURSES: CourseContent[] = [
  {
    id: 'c-spk-30',
    title: '30-Day Speaking Confidence Path',
    tagline: 'Ubah pemahaman pasif menjadi kelancaran berbicara di tempat kerja dan percakapan nyata.',
    targetLevel: 'A2 → B1 Intermediate',
    modules: [
      {
        id: 'mod-1',
        courseId: 'c-spk-30',
        title: 'Week 1 — Build Speaking Confidence & Overcoming Mental Block',
        weekNumber: 1,
        description: 'Lepaskan rasa takut salah grammar dan bangun fondasi perkenalan diri yang luwes dan berbobot.',
        lessons: [
          {
            id: 'les-1',
            moduleId: 'mod-1',
            courseId: 'c-spk-30',
            title: 'Breaking the Ice & Introducing Yourself with Confidence',
            subtitle: 'Cara memperkenalkan diri tanpa terkesan kaku seperti membaca CV',
            durationMinutes: 15,
            youtubeId: 'd84hU4xR4vQ', // "How to Introduce Yourself in English"
            videoTitle: 'How to Introduce Yourself Professionally in English',
            keyTakeaways: [
              'Gunakan formula: Present (posisi saat ini) + Past (latar belakang ringkas) + Future (tujuan/minat).',
              'Hindari membuka dengan kalimat permintaan maaf seperti "Sorry for my bad English".',
              'Gunakan intonasi ramah dan tempo bicara yang tenang agar tidak terburu-buru.',
            ],
            vocabularyNotes: [
              {
                phrase: 'I specialize in...',
                meaningId: 'Keahlian/fokus utama saya adalah...',
                exampleSentence: 'I specialize in user experience research and digital interface design.',
              },
              {
                phrase: 'Currently, I am working on...',
                meaningId: 'Saat ini saya sedang mengerjakan...',
                exampleSentence: 'Currently, I am working on expanding our mobile payment features.',
              },
              {
                phrase: 'It is a pleasure to meet you.',
                meaningId: 'Senang sekali bisa bertemu dengan Anda.',
                exampleSentence: 'It is a pleasure to meet you all in person today.',
              },
            ],
            notesMarkdown: `### 🎯 The 3-Part Introduction Framework

Banyak orang Indonesia merasa cemas saat diminta *"Tell me about yourself"* karena mencoba mengingat seluruh riwayat hidup dalam bahasa Inggris. 

Gunakan kerangka 3 langkah yang ringkas ini:

1. **The Hook & Current Role:**
   > *"Hi everyone, I'm [Name]. I work as a [Role] at [Company], focusing on [Main Responsibility]."*
2. **The Key Passion or Project:**
   > *"Right now, I'm really excited about our initiative to improve customer satisfaction."*
3. **The Open Bridge:**
   > *"I'm looking forward to collaborating with everyone here."*

💡 **Pro-Tip:** Kunci percaya diri adalah **clarity over perfection**. Jangan biarkan keinginan membuat kalimat yang rumit membuatmu terdiam.`,
            quizQuestions: [
              {
                id: 'q1-1',
                question: 'Apa rumus 3 bagian yang direkomendasikan saat memperkenalkan diri?',
                options: [
                  'Curriculum Vitae lengkap dari SD sampai kuliah',
                  'Present Role + Key Passion/Project + Open Bridge',
                  'Meminta maaf atas kemampuan bahasa Inggris + nama + hobi',
                  'Menyebutkan seluruh gaji dan rencana resign',
                ],
                correctIndex: 1,
                explanation: 'Kerangka Present + Passion/Project + Open Bridge membuat perkenalan mengalir natural, profesional, dan to the point.',
              },
              {
                id: 'q1-2',
                question: 'Pilihlah kalimat pembuka yang paling percaya diri saat meeting online:',
                options: [
                  'Sorry for my English, but I try to introduce myself.',
                  'Good morning team, great to meet everyone. My name is Maya, and I handle client accounts.',
                  'Hello, I am Maya. You hear me? My English very broken.',
                  'I must introduce now because manager told me.',
                ],
                correctIndex: 1,
                explanation: 'Selalu mulai dengan sapaan positif dan sebutkan peranmu secara jelas tanpa merendahkan kemampuan diri sendiri.',
              },
            ],
            speakingPrompt: {
              id: 'sp-les-1',
              scenario: 'Bayangkan kamu baru bergabung ke tim internasional atau bertemu kolega baru di kantor. Berikan perkenalan diri singkat (nama, pekerjaan, dan hal yang sedang kamu kerjakan).',
              aiStartingMessage: 'Hi there! Welcome to the team. It is great to meet you! Would you mind introducing yourself briefly?',
              guideBulletPoints: [
                'Sebutkan namamu dan peranmu saat ini.',
                'Ceritakan 1 hal menarik yang sedang kamu kerjakan.',
                'Tutup dengan sapaan ramah bahwa kamu senang bisa berkenalan.',
              ],
              expectedPhrases: ['My name is', 'I work as', 'Currently I am', 'Nice to meet you'],
            },
          },
          {
            id: 'les-2',
            moduleId: 'mod-1',
            courseId: 'c-spk-30',
            title: 'Talking About Your Daily Routine & Work Updates',
            subtitle: 'Menjelaskan apa yang kamu kerjakan dalam daily stand-up meeting tanpa kaku',
            durationMinutes: 18,
            youtubeId: 'w6E3CXM6eI4', // Daily English routine
            videoTitle: 'Talking About Work and Daily Routine in English',
            keyTakeaways: [
              'Gunakan Present Simple untuk kebiasaan harian ("I usually start with...").',
              'Gunakan Present Continuous untuk hal yang sedang berlangsung hari ini ("Today I am coordinating with...").',
              'Sebutkan blocker atau hambatan dengan santun menggunakan "We are waiting on...".',
            ],
            vocabularyNotes: [
              {
                phrase: 'On a daily basis...',
                meaningId: 'Secara keseharian / setiap harinya...',
                exampleSentence: 'On a daily basis, I review incoming customer inquiries and allocate tasks.',
              },
              {
                phrase: 'I am currently stuck on...',
                meaningId: 'Saya sedang mengalami kendala pada...',
                exampleSentence: 'I am currently stuck on the data export bug, so I may need a quick hand from engineering.',
              },
            ],
            notesMarkdown: `### 🗓 Standup Meeting Mastery

Dalam update kerja harian, buat laporanmu berstruktur 3 poin:
1. **What I finished yesterday:** *"Yesterday, I wrapped up the initial draft of the presentation."*
2. **What I'm tackling today:** *"Today, I'm diving into the analytics numbers."*
3. **Any blockers:** *"No major blockers on my side, everything is running on track."*`,
            quizQuestions: [
              {
                id: 'q2-1',
                question: 'Tense mana yang paling tepat untuk menceritakan rutinitas harian yang biasa kamu lakukan?',
                options: [
                  'Past Continuous',
                  'Present Simple',
                  'Future Perfect',
                  'Past Perfect',
                ],
                correctIndex: 1,
                explanation: 'Present Simple digunakan untuk kebiasaan, rutinitas, dan fakta umum (contoh: "I usually start my day at 9 AM").',
              },
            ],
            speakingPrompt: {
              id: 'sp-les-2',
              scenario: 'Rekan kerjamu di tim global bertanya: "Hey, what are you focusing on today?" Berikan update kerjamu dalam 2-3 kalimat santai.',
              aiStartingMessage: "Hey! Good morning. What's on your agenda for today?",
              guideBulletPoints: [
                'Sebutkan 1-2 tugas prioritasmu hari ini.',
                'Sebutkan jika ada meeting atau deadline penting.',
              ],
              expectedPhrases: ['Today I am focusing on', 'I have a meeting with', 'Hopefully finish by'],
            },
          },
        ],
      },
      {
        id: 'mod-2',
        courseId: 'c-spk-30',
        title: 'Week 2 — Everyday Workplace Conversations & Small Talk',
        weekNumber: 2,
        description: 'Bangun obrolan santai sebelum meeting dimulai dan pelajari cara meminta klarifikasi tanpa panik.',
        lessons: [
          {
            id: 'les-3',
            moduleId: 'mod-2',
            courseId: 'c-spk-30',
            title: 'Mastering Casual Small Talk with Global Colleagues',
            subtitle: 'Menghilangkan keheningan canggung (awkward silence) sebelum zoom meeting',
            durationMinutes: 15,
            youtubeId: 'q_Qy1v1J_E0',
            videoTitle: 'Small Talk in English: How to Start and Keep a Conversation Going',
            keyTakeaways: [
              'Topik aman untuk small talk: cuaca, rencana akhir pekan, kopi/makanan, dan kabar kota setempat.',
              'Gunakan open-ended questions agar lawan bicara senang bercerita.',
              'Gunakan "echo technique" (mengulang kata kunci) untuk menunjukkan kamu menyimak.',
            ],
            vocabularyNotes: [
              {
                phrase: 'How was your weekend?',
                meaningId: 'Bagaimana akhir pekanmu kemarin?',
                exampleSentence: 'Hey Tom, how was your weekend? Did you get a chance to relax?',
              },
              {
                phrase: 'Any exciting plans for the holidays?',
                meaningId: 'Ada rencana seru untuk liburan nanti?',
                exampleSentence: 'The holidays are coming up fast. Any exciting plans?',
              },
            ],
            notesMarkdown: `### ☕ The Art of Casual Small Talk

Banyak orang Indonesia merasa cemas jika ada 5 menit jeda sebelum meeting online dimulai. 
Alih-alih mematikan kamera dan diam, gunakan momen ini untuk membangun koneksi hangat:
- *"How is the weather over there in Singapore today?"*
- *"Are you surviving Monday morning coffee yet?"*`,
            quizQuestions: [
              {
                id: 'q3-1',
                question: 'Topik mana yang paling netral dan aman untuk small talk di tempat kerja profesional?',
                options: [
                  'Pendapatan pribadi dan hutang piutang',
                  'Isu politik sensitif',
                  'Rencana akhir pekan atau cuaca hari ini',
                  'Gosip rumah tangga rekan kerja',
                ],
                correctIndex: 2,
                explanation: 'Weekend plans, weather, and light casual topics are universal, warm, and safe.',
              },
            ],
            speakingPrompt: {
              id: 'sp-les-3',
              scenario: 'Kamu sedang menunggu meeting dimulai bersama satu kolega dari luar negeri. Mulai obrolan ringan dengan menanyakan harinya atau rencana akhir pekannya.',
              aiStartingMessage: "Hey! We've got a couple of minutes before the rest of the team joins. How has your week been treating you so far?",
              guideBulletPoints: [
                'Jawab bagaimana harimu berjalan dengan santai.',
                'Tanyakan balik kabarnya atau cuaca di kotanya.',
              ],
              expectedPhrases: ['Pretty good so far', 'Quite busy with', 'How about you?', 'Weather here is'],
            },
          },
          {
            id: 'les-4',
            moduleId: 'mod-2',
            courseId: 'c-spk-30',
            title: 'Asking for Clarification Without Panic',
            subtitle: 'Ketika kamu tidak mengerti apa yang dikatakan bule, katakan ini!',
            durationMinutes: 16,
            youtubeId: 'r_nQ8bH_VpQ',
            videoTitle: 'Professional English: How to Ask for Clarification Politely',
            keyTakeaways: [
              'Jangan hanya mengangguk dan pura-pura paham (smiling and nodding trap).',
              'Gunakan: "Could you clarify what you meant by...?" atau "Could you say that once more?"',
              'Konfirmasi pemahaman: "So if I understand correctly, you want me to... Is that right?"',
            ],
            vocabularyNotes: [
              {
                phrase: 'Could you rephrase that, please?',
                meaningId: 'Bisakah tolong dijelaskan dengan kalimat lain?',
                exampleSentence: 'I want to make sure I catch the detail. Could you rephrase that, please?',
              },
              {
                phrase: 'If I understand correctly...',
                meaningId: 'Jika saya memahami dengan benar...',
                exampleSentence: 'If I understand correctly, our deadline is moved to next Wednesday?',
              },
            ],
            notesMarkdown: `### 🛡️ Jangan Takut Bertanya

Native speakers sangat menghargai rekan kerja yang meminta klarifikasi secara aktif daripada yang diam tapi pekerjaannya keliru.

Katakan:
- *"I didn't quite catch that last part. Could you repeat it, please?"*
- *"Just to make sure we're on the same page, should we prioritize the design review first?"*`,
            quizQuestions: [
              {
                id: 'q4-1',
                question: 'Apa yang sebaiknya kamu lakukan saat tidak menangkap kalimat yang diucapkan rekan kerjamu?',
                options: [
                  'Tersenyum dan mengangguk seolah mengerti semuanya',
                  'Meminta klarifikasi dengan sopan menggunakan "Could you repeat that last point, please?"',
                  'Langsung mematikan koneksi internet laptop',
                  'Menyalahkan aksen bicaranya',
                ],
                correctIndex: 1,
                explanation: 'Meminta klarifikasi adalah tanda profesionalisme dan komunikasi yang dewasa.',
              },
            ],
            speakingPrompt: {
              id: 'sp-les-4',
              scenario: 'Kolega bicaramu baru saja menyampaikan instruksi dengan cepat: "We need the Q3 KPI reconciliation synced with the warehouse pipeline ASAP." Minta dia menjelaskan secara ringkas.',
              aiStartingMessage: "So we need the Q3 KPI reconciliation synced with the warehouse pipeline ASAP. Does that make sense to you?",
              guideBulletPoints: [
                'Minta dia mengklarifikasi poin utamanya dengan tenang.',
                'Konfirmasi deadline atau langkah pertama yang diharapkan darimu.',
              ],
              expectedPhrases: ['Could you clarify', 'Just to make sure', 'What is the priority'],
            },
          },
        ],
      },
    ],
  },
];
