export type ParticleItem = {
  id: string;
  particle: string;
  romaji: string;
  romajiNote?: string;
  name: string;
  functionDescription: string;
  formula: string;
  colorGradient: string;
  badgeText: string;
  tips: string;
  examples: {
    japanese: string;
    romaji: string;
    indonesian: string;
    breakdown: { text: string; role: string }[];
  }[];
};

export type GrammarQuizItem = {
  id: number;
  setNumber: 1 | 2 | 3;
  difficultyLabel: "Dasar" | "Menengah" | "Mahir";
  questionSentence: string;
  translation: string;
  options: string[];
  correctAnswer: string;
  explanation: string;
};

export const PARTICLES_DATA: ParticleItem[] = [
  {
    id: "wa",
    particle: "は",
    romaji: "wa",
    romajiNote: "Dibaca 'wa' • Ditulis 'ha' (は)",
    name: "Penanda Topik Utama Kalimat",
    functionDescription: "Menunjukkan subjek atau topik utama yang sedang dibicarakan dalam kalimat.",
    formula: "[Subjek / Topik] + は + [Keterangan / Predikat]",
    colorGradient: "from-rose-500 to-pink-600",
    badgeText: "Partikel #1 Paling Wajib",
    tips: "💡 Tips Penggunaan: Partikel は memberikan penekanan kuat pada informasi setelahnya (predikat/keterangan). Digunakan saat mengenalkan diri atau memberi tahu informasi baru yang ingin kamu tegaskan.",
    examples: [
      {
        japanese: "わたし は がくせい です。",
        romaji: "Watashi wa gakusei desu.",
        indonesian: "Saya adalah seorang siswa.",
        breakdown: [
          { text: "わたし (Watashi)", role: "Subjek (Saya)" },
          { text: "は (wa)", role: "Partikel Topik" },
          { text: "がくせい (Gakusei)", role: "Siswa" },
          { text: "です (desu)", role: "Akhiran Formal (adalah)" },
        ],
      },
      {
        japanese: "これ は ほん です。",
        romaji: "Kore wa hon desu.",
        indonesian: "Ini adalah buku.",
        breakdown: [
          { text: "これ (Kore)", role: "Subjek (Ini)" },
          { text: "は (wa)", role: "Partikel Topik" },
          { text: "ほん (Hon)", role: "Buku" },
          { text: "です (desu)", role: "Akhiran Formal" },
        ],
      },
    ],
  },
  {
    id: "o",
    particle: "を",
    romaji: "o",
    romajiNote: "Dibaca 'o' • Ditulis 'wo' (を)",
    name: "Penanda Objek Penderita (Tindakan)",
    functionDescription: "Menunjukkan objek langsung yang dikenai tindakan/kata kerja.",
    formula: "[Objek Benda] + を + [Kata Kerja Transitif]",
    colorGradient: "from-amber-500 to-orange-600",
    badgeText: "Penanda Objek",
    tips: "💡 Tips Penggunaan: Partikel を khusus menghubungkan benda yang dikenai tindakan fisik dengan kata kerja aktif (makan, minum, membaca, membeli). Partikel ini tidak dipakai untuk kata sifat atau posisi keberadaan.",


    examples: [

      {
        japanese: "ごはん を たべます。",
        romaji: "Gohan o tabemasu.",
        indonesian: "Makan nasi.",
        breakdown: [
          { text: "ごはん (Gohan)", role: "Objek (Nasi)" },
          { text: "を (o)", role: "Partikel Objek" },
          { text: "たべます (Tabemasu)", role: "Kata Kerja (Makan)" },
        ],
      },
      {
        japanese: "みず を のみます。",
        romaji: "Mizu o nomimasu.",
        indonesian: "Minum air.",
        breakdown: [
          { text: "みず (Mizu)", role: "Objek (Air)" },
          { text: "を (o)", role: "Partikel Objek" },
          { text: "みます (Nomimasu)", role: "Kata Kerja (Minum)" },
        ],
      },
    ],
  },
  {
    id: "ni",
    particle: "に",
    romaji: "ni",
    name: "Penanda Waktu, Lokasi Diam, & Tujuan",
    functionDescription: "Menunjukkan waktu spesifik, keberadaan lokasi diam, atau arah tujuan perpindahan.",
    formula: "[Waktu Spesifik / Tempat Diam / Tujuan] + に",
    colorGradient: "from-emerald-500 to-teal-600",
    badgeText: "Waktu & Lokasi Target",
    tips: "💡 Digunakan untuk jam/hari spesifik (misal: jam 7 に), lokasi keberadaan ada/tidak ada (います/あります), atau tujuan perjalanan.",
    examples: [
      {
        japanese: "しちじ に おきます。",
        romaji: "Shichiji ni okimasu.",
        indonesian: "Bangun pada jam 7.",
        breakdown: [
          { text: "しちじ (Shichiji)", role: "Waktu (Jam 7)" },
          { text: "に (ni)", role: "Partikel Waktu" },
          { text: "おきます (Okimasu)", role: "Bangun tidur" },
        ],
      },
      {
        japanese: "がっこう に いきます。",
        romaji: "Gakkou ni ikimasu.",
        indonesian: "Pergi ke sekolah.",
        breakdown: [
          { text: "がっこう (Gakkou)", role: "Tujuan (Sekolah)" },
          { text: "に (ni)", role: "Partikel Tujuan (Ke)" },
          { text: "いきます (Ikimasu)", role: "Pergi" },
        ],
      },
    ],
  },
  {
    id: "de",
    particle: "で",
    romaji: "de",
    name: "Penanda Tempat Aktivitas & Alat/Transportasi",
    functionDescription: "Menunjukkan tempat terjadinya suatu aktivitas beraksi, atau sarana/alat/transportasi yang digunakan.",
    formula: "[Tempat Aktivitas / Alat / Transportasi] + で",
    colorGradient: "from-sky-500 to-blue-600",
    badgeText: "Aktivitas & Alat",
    tips: "💡 Bedakan に (lokasi diam/tujuan) dengan で (lokasi di mana tindakan aktif dilakukan atau alat yang dipakai).",
    examples: [
      {
        japanese: "うち で べんきょうします。",
        romaji: "Uchi de benkyoushimasu.",
        indonesian: "Belajar di rumah.",
        breakdown: [
          { text: "うち (Uchi)", role: "Tempat Aktivitas (Rumah)" },
          { text: "で (de)", role: "Partikel Lokasi Aktivitas (Di)" },
          { text: "べんきょうします (Benkyoushimasu)", role: "Belajar" },
        ],
      },
      {
        japanese: "バス で いきます。",
        romaji: "Basu de ikimasu.",
        indonesian: "Pergi dengan naik bus.",
        breakdown: [
          { text: "バス (Basu)", role: "Sarana (Bus)" },
          { text: "で (de)", role: "Partikel Alat (Dengan/Naik)" },
          { text: "いきます (Ikimasu)", role: "Pergi" },
        ],
      },
    ],
  },
  {
    id: "no",
    particle: "の",
    romaji: "no",
    name: "Penanda Kepemilikan & Modifikasi Kata Benda",
    functionDescription: "Menghubungkan dua kata benda untuk menunjukkan kepemilikan ('punya') atau penjelasan kategori.",
    formula: "[Pemilik / Kategori] + の + [Benda Yang Dimiliki]",
    colorGradient: "from-purple-500 to-indigo-600",
    badgeText: "Kepemilikan ('Punya')",
    tips: "💡 Mirip dengan `'s` dalam Bahasa Inggris. Contoh: `わたし の ほん` = Watashi's book (Buku saya).",
    examples: [
      {
        japanese: "わたし の かばん です。",
        romaji: "Watashi no kaban desu.",
        indonesian: "Ini adalah tas milik saya.",
        breakdown: [
          { text: "わたし (Watashi)", role: "Pemilik (Saya)" },
          { text: "の (no)", role: "Partikel Kepemilikan" },
          { text: "かばん (Kaban)", role: "Benda (Tas)" },
          { text: "です (desu)", role: "Akhiran Formal" },
        ],
      },
    ],
  },
  {
    id: "ga",
    particle: "が",
    romaji: "ga",
    name: "Penanda Subjek Spesifik & Keberadaan",
    functionDescription: "Menegaskan subjek spesifik, penanda keberadaan (います/あります), atau preferensi (suka/bisa/paham).",
    formula: "[Subjek Spesifik] + が + [Kata Kerja / Kata Sifat]",
    colorGradient: "from-violet-500 to-purple-600",
    badgeText: "Subjek Spesifik & Suka/Bisa",
    tips: "💡 Digunakan dengan kata `すき です` (suka), `わかります` (paham), `あります` (ada benda mati), `います` (ada makhluk hidup).",
    examples: [
      {
        japanese: "ねこ が います。",
        romaji: "Neko ga imasu.",
        indonesian: "Ada kucing.",
        breakdown: [
          { text: "ねこ (Neko)", role: "Subjek (Kucing)" },
          { text: "が (ga)", role: "Partikel Subjek Keberadaan" },
          { text: "います (Imasu)", role: "Ada (Makhluk hidup)" },
        ],
      },
      {
        japanese: "にほんご が すき です。",
        romaji: "Nihongo ga suki desu.",
        indonesian: "Saya suka Bahasa Jepang.",
        breakdown: [
          { text: "にほんご (Nihongo)", role: "Subjek Preferensi (Bahasa Jepang)" },
          { text: "が (ga)", role: "Partikel Penanda Suka" },
          { text: "すき です (Suki desu)", role: "Suka" },
        ],
      },
    ],
  },
  {
    id: "to",
    particle: "と",
    romaji: "to",
    name: "Penanda 'Dan' (Penggabung Benda) & 'Bersama'",
    functionDescription: "Menghubungkan daftar kata benda ('dan') atau menunjukkan pasangan/rekan melakukan aktivitas ('bersama').",
    formula: "[Benda A] + と + [Benda B] / [Orang] + と + [Aktivitas]",
    colorGradient: "from-fuchsia-500 to-pink-600",
    badgeText: "Dan / Bersama",
    tips: "💡 Partikel と hanya digunakan untuk menggabungkan kata benda (bukan untuk menggabungkan kalimat/kata kerja).",
    examples: [
      {
        japanese: "りんご と みかん を かいます。",
        romaji: "Ringo to mikan o kaimasu.",
        indonesian: "Membeli apel dan jeruk.",
        breakdown: [
          { text: "りんご (Ringo)", role: "Apel" },
          { text: "と (to)", role: "Partikel 'Dan'" },
          { text: "みかん (Mikan)", role: "Jeruk" },
          { text: "を (o)", role: "Partikel Objek" },
          { text: "かいます (Kaimasu)", role: "Membeli" },
        ],
      },
      {
        japanese: "ともだち と いきます。",
        romaji: "Tomodachi to ikimasu.",
        indonesian: "Pergi bersama teman.",
        breakdown: [
          { text: "ともだち (Tomodachi)", role: "Rekan (Teman)" },
          { text: "と (to)", role: "Partikel 'Bersama'" },
          { text: "いきます (Ikimasu)", role: "Pergi" },
        ],
      },
    ],
  },
  {
    id: "kara-made",
    particle: "から / まで",
    romaji: "kara / made",
    name: "Penanda 'Dari' & 'Sampai' (Waktu / Tempat)",
    functionDescription: "Menunjukkan titik awal mulanya (kara) dan titik akhir batasnya (made) untuk waktu atau titik lokasi.",
    formula: "[Awal] + から + [Akhir] + まで",
    colorGradient: "from-rose-600 to-red-600",
    badgeText: "Dari & Sampai",
    tips: "💡 Bisa digunakan terpisah atau berpasangan: `くじ から ごじ まで` = Dari jam 9 sampai jam 5.",
    examples: [
      {
        japanese: "くじ から ごじ まで はたらきます。",
        romaji: "Kuji kara goji made hatarakimasu.",
        indonesian: "Bekerja dari jam 9 sampai jam 5.",
        breakdown: [
          { text: "くじ (Kuji)", role: "Jam 9" },
          { text: "から (kara)", role: "Dari" },
          { text: "ごじ (Goji)", role: "Jam 5" },
          { text: "まで (made)", role: "Sampai" },
          { text: "はたらきます (Hatarakimasu)", role: "Bekerja" },
        ],
      },
    ],
  },
];

export const GRAMMAR_QUIZ_SET_1: GrammarQuizItem[] = [
  {
    id: 1,
    setNumber: 1,
    difficultyLabel: "Dasar",
    questionSentence: "わたし ___ イルマン です。",
    translation: "Saya adalah Ilman.",
    options: ["は", "を", "に", "で"],
    correctAnswer: "は",
    explanation: "Gunakan partikel は (wa) sebagai penanda topik/subjek utama 'Saya'.",
  },
  {
    id: 2,
    setNumber: 1,
    difficultyLabel: "Dasar",
    questionSentence: "ごはん ___ たべます。",
    translation: "Makan nasi.",
    options: ["を", "は", "に", "の"],
    correctAnswer: "を",
    explanation: "Gunakan partikel を (o) untuk menandai objek 'nasi' yang dikenai tindakan makan.",
  },
  {
    id: 3,
    setNumber: 1,
    difficultyLabel: "Dasar",
    questionSentence: "がっこう ___ いきます。",
    translation: "Pergi ke sekolah.",
    options: ["に", "を", "は", "の"],
    correctAnswer: "に",
    explanation: "Gunakan partikel に (ni) untuk menunjukkan arah tujuan (ke sekolah).",
  },
  {
    id: 4,
    setNumber: 1,
    difficultyLabel: "Dasar",
    questionSentence: "わたし ___ かばん です。",
    translation: "Ini adalah tas milik saya.",
    options: ["の", "は", "を", "に"],
    correctAnswer: "の",
    explanation: "Gunakan partikel の (no) untuk menunjukkan kepemilikan (tas milik saya).",
  },
  {
    id: 5,
    setNumber: 1,
    difficultyLabel: "Dasar",
    questionSentence: "ほん ___ よみます。",
    translation: "Membaca buku.",
    options: ["を", "は", "に", "で"],
    correctAnswer: "を",
    explanation: "Gunakan partikel を (o) untuk menandai objek penderita yang dibaca.",
  },
  {
    id: 6,
    setNumber: 1,
    difficultyLabel: "Dasar",
    questionSentence: "みず ___ のみます。",
    translation: "Minum air.",
    options: ["を", "は", "に", "で"],
    correctAnswer: "を",
    explanation: "Gunakan partikel を (o) untuk menandai benda cair yang diminum.",
  },
  {
    id: 7,
    setNumber: 1,
    difficultyLabel: "Dasar",
    questionSentence: "これ ___ たなかさん の ほん です。",
    translation: "Ini adalah buku milik Sdr. Tanaka.",
    options: ["は", "を", "に", "で"],
    correctAnswer: "は",
    explanation: "Gunakan partikel は (wa) untuk menandai kata tunjuk 'Ini' sebagai topik utama.",
  },
  {
    id: 8,
    setNumber: 1,
    difficultyLabel: "Dasar",
    questionSentence: "せんせい ___ かばん です。",
    translation: "Tas milik guru.",
    options: ["の", "は", "を", "に"],
    correctAnswer: "の",
    explanation: "Gunakan partikel の (no) untuk menunjukkan hubungan kepemilikan guru atas tas.",
  },
];

export const GRAMMAR_QUIZ_SET_2: GrammarQuizItem[] = [
  {
    id: 9,
    setNumber: 2,
    difficultyLabel: "Menengah",
    questionSentence: "うち ___ べんきょうします。",
    translation: "Belajar di rumah.",
    options: ["で", "に", "を", "は"],
    correctAnswer: "で",
    explanation: "Gunakan partikel で (de) untuk menunjukkan lokasi tempat aktivitas belajar dilakukan.",
  },
  {
    id: 10,
    setNumber: 2,
    difficultyLabel: "Menengah",
    questionSentence: "バス ___ いきます。",
    translation: "Pergi dengan naik bus.",
    options: ["で", "に", "を", "の"],
    correctAnswer: "で",
    explanation: "Gunakan partikel で (de) untuk menunjukkan sarana/alat/transportasi yang digunakan.",
  },
  {
    id: 11,
    setNumber: 2,
    difficultyLabel: "Menengah",
    questionSentence: "ねこ ___ います。",
    translation: "Ada kucing.",
    options: ["が", "を", "で", "の"],
    correctAnswer: "が",
    explanation: "Gunakan partikel が (ga) untuk menandai subjek keberadaan makhluk hidup (います).",
  },
  {
    id: 12,
    setNumber: 2,
    difficultyLabel: "Menengah",
    questionSentence: "りんご ___ みかん を かいます。",
    translation: "Membeli apel dan jeruk.",
    options: ["と", "は", "に", "で"],
    correctAnswer: "と",
    explanation: "Gunakan partikel と (to) untuk menggabungkan dua kata benda ('dan').",
  },
  {
    id: 13,
    setNumber: 2,
    difficultyLabel: "Menengah",
    questionSentence: "しちじ ___ おきます。",
    translation: "Bangun pada jam 7.",
    options: ["に", "で", "を", "は"],
    correctAnswer: "に",
    explanation: "Gunakan partikel に (ni) untuk merujuk pada titik waktu jam spesifik.",
  },
  {
    id: 14,
    setNumber: 2,
    difficultyLabel: "Menengah",
    questionSentence: "にほんご ___ すき です。",
    translation: "Saya suka Bahasa Jepang.",
    options: ["가", "が", "を", "に"],
    correctAnswer: "が",
    explanation: "Gunakan partikel が (ga) bersama kata sifat preferensi 'すき です' (suka).",
  },
  {
    id: 15,
    setNumber: 2,
    difficultyLabel: "Menengah",
    questionSentence: "ともだち ___ はなします。",
    translation: "Bicara bersama teman.",
    options: ["と", "に", "を", "で"],
    correctAnswer: "と",
    explanation: "Gunakan partikel と (to) untuk menunjukkan rekan/pasangan aktivitas ('bersama teman').",
  },
  {
    id: 16,
    setNumber: 2,
    difficultyLabel: "Menengah",
    questionSentence: "デパート ___ かいものを します。",
    translation: "Berbelanja di department store.",
    options: ["で", "に", "を", "は"],
    correctAnswer: "で",
    explanation: "Gunakan partikel で (de) untuk menunjukkan lokasi tempat dilakukannya kegiatan belanja.",
  },
];

export const GRAMMAR_QUIZ_SET_3: GrammarQuizItem[] = [
  {
    id: 17,
    setNumber: 3,
    difficultyLabel: "Mahir",
    questionSentence: "くじ ___ ごじ まで はたらきます。",
    translation: "Bekerja dari jam 9 sampai jam 5.",
    options: ["から", "まで", "に", "で"],
    correctAnswer: "から",
    explanation: "Gunakan partikel から (kara) untuk menunjukkan titik awal mula waktu ('dari jam 9').",
  },
  {
    id: 18,
    setNumber: 3,
    difficultyLabel: "Mahir",
    questionSentence: "あさ から ばん ___ べんきょうします。",
    translation: "Belajar dari pagi sampai malam.",
    options: ["まで", "から", "に", "で"],
    correctAnswer: "まで",
    explanation: "Gunakan partikel まで (made) untuk menunjukkan batas akhir waktu ('sampai malam').",
  },
  {
    id: 19,
    setNumber: 3,
    difficultyLabel: "Mahir",
    questionSentence: "つくえ の うえ ___ ほん が あります。",
    translation: "Ada buku di atas meja.",
    options: ["に", "で", "を", "は"],
    correctAnswer: "に",
    explanation: "Gunakan partikel に (ni) untuk lokasi posisi keberadaan benda mati (あります).",
  },
  {
    id: 20,
    setNumber: 3,
    difficultyLabel: "Mahir",
    questionSentence: "きょうと ___ いきます。",
    translation: "Pergi ke Kyoto.",
    options: ["に", "で", "を", "の"],
    correctAnswer: "に",
    explanation: "Gunakan partikel に (ni) untuk merujuk pada kota tujuan perjalanan perpindahan.",
  },
  {
    id: 21,
    setNumber: 3,
    difficultyLabel: "Mahir",
    questionSentence: "ともだち ___ がっこう で あいます。",
    translation: "Bertemu dengan teman di sekolah.",
    options: ["と", "に", "で", "を"],
    correctAnswer: "と",
    explanation: "Gunakan partikel と (to) untuk menandai pasangan yang ditemui.",
  },
  {
    id: 22,
    setNumber: 3,
    difficultyLabel: "Mahir",
    questionSentence: "すし ___ たべたい です。",
    translation: "Saya ingin makan sushi.",
    options: ["が", "を", "に", "で"],
    correctAnswer: "が",
    explanation: "Gunakan partikel が (ga) untuk menekankan keinginan/preferensi (たべたい です).",
  },
  {
    id: 23,
    setNumber: 3,
    difficultyLabel: "Mahir",
    questionSentence: "とうきょう ___ おおさか まで いきます。",
    translation: "Pergi dari Tokyo sampai Osaka.",
    options: ["から", "まで", "で", "に"],
    correctAnswer: "から",
    explanation: "Gunakan partikel から (kara) untuk menunjukkan titik keberangkatan awal.",
  },
  {
    id: 24,
    setNumber: 3,
    difficultyLabel: "Mahir",
    questionSentence: "にほんご の べんきょう ___ おもしろい です。",
    translation: "Belajar Bahasa Jepang itu menarik.",
    options: ["は", "が", "を", "に"],
    correctAnswer: "は",
    explanation: "Gunakan partikel は (wa) untuk menandai topik bahasan utama 'Belajar Bahasa Jepang'.",
  },
];

export const ALL_GRAMMAR_QUIZ_SETS = {
  1: GRAMMAR_QUIZ_SET_1,
  2: GRAMMAR_QUIZ_SET_2,
  3: GRAMMAR_QUIZ_SET_3,
};
