"use client";

import React, { useState, useEffect, useRef } from "react";
import confetti from "canvas-confetti";
import {
  Sparkles,
  Volume2,
  ArrowRight,
  Flame,
  Info,
  Layers,
  Grid,
  CreditCard,
  ChevronLeft,
  ChevronRight,
  RotateCcw,
  Shuffle,
  BookOpen,
  PenTool,
  Eraser,
  Eye,
  EyeOff,
  HelpCircle,
  X,
  CheckCircle2,
} from "lucide-react";

type KanaItem = {
  kana: string;
  romaji: string;
  example: string;
  mnemonic: string; // Mnemonik Relatable Versi Indonesia
};

type KanaRow = {
  id: string;
  label: string;
  consonant: string;
  rowTip: string;
  items: KanaItem[];
};

const HIRAGANA_GRID: KanaRow[] = [
  {
    id: "vowel",
    label: "Vokal Dasar",
    consonant: "A - I - U - E - O",
    rowTip: "💡 Trik Pemula: 5 vokal dasar ini adalah kunci utama. Bayangkan bentuk buah Apel (あ), Ikan teri (い), dan Obor (お) biar gampang dihafal!",
    items: [
      { kana: "あ", romaji: "a", example: "朝 (asa - Pagi)", mnemonic: "🍎 Buah Apel merah ada tangkai di atasnya" },
      { kana: "い", romaji: "i", example: "犬 (inu - Anjing)", mnemonic: "🥢 Dua ekor Ikan teri / Sumpit berdiri tegak" },
      { kana: "う", romaji: "u", example: "海 (umi - Laut)", mnemonic: "🦧 Udang bungkuk / Orang bungkuk teriak 'Ugh!'" },
      { kana: "え", romaji: "e", example: "駅 (eki - Stasiun)", mnemonic: "🦩 Burung Elang melompat bentangkan sayap" },
      { kana: "お", romaji: "o", example: "お茶 (ocha - Teh)", mnemonic: "🍊 Buah Jeruk / Orang bawa Obor terang" },
    ],
  },
  {
    id: "k",
    label: "Baris K",
    consonant: "K + Vokal",
    rowTip: "💡 Trik Pemula: Kombinasi konsonan K + Vokal. Bayangkan gaya gerakan Karate (か) dan Kunci (き)!",
    items: [
      { kana: "か", romaji: "ka", example: "傘 (kasa - Payung)", mnemonic: "🦘 Orang gaya Karate nendang / Kasur terlipat" },
      { kana: "き", romaji: "ki", example: "木 (ki - Pohon)", mnemonic: "🔑 Gantungan Kunci pintu 2 gerigi" },
      { kana: "く", romaji: "ku", example: "車 (kuruma - Mobil)", mnemonic: "🐊 Mulut Buaya / Kucing menganga lebar" },
      { kana: "け", romaji: "ke", example: "消しゴム (keshigomu - Penghapus)", mnemonic: "🦵 Bentuk Kaki melangkah tegak lurus" },
      { kana: "こ", romaji: "ko", example: "声 (koe - Suara)", mnemonic: "☕ Cangkir Kopi hangat atas bawah" },
    ],
  },
  {
    id: "s",
    label: "Baris S",
    consonant: "S + Vokal",
    rowTip: "💡 Trik Pemula: Karakter 'し' dibaca 'Shi' (seperti kata 'Sikat'). Bayangkan kail pancing Si Pitung!",
    items: [
      { kana: "さ", romaji: "sa", example: "魚 (sakana - Ikan)", mnemonic: "🧹 Sapu lidi / Penari Salsa memutar" },
      { kana: "し", romaji: "shi", example: "塩 (shio - Garam)", mnemonic: "🎣 Kail Pancingan Si Pitung di sungai" },
      { kana: "す", romaji: "su", example: "寿司 (sushi - Sushi)", mnemonic: "🧋 Sedotan Es Boba melingkar spiral" },
      { kana: "せ", romaji: "se", example: "世界 (sekai - Dunia)", mnemonic: "🚴 Orang naik Sepeda di jalanan" },
      { kana: "そ", romaji: "so", example: "空 (sora - Langit)", mnemonic: "🥣 Mangkuk Bakso / Soto bergelombang" },
    ],
  },
  {
    id: "t",
    label: "Baris T",
    consonant: "T + Vokal",
    rowTip: "💡 Trik Pemula: Ingat bunyi unik 'ち' (Chi) dan 'つ' (Tsu seperti Tsunami)!",
    items: [
      { kana: "た", romaji: "ta", example: "卵 (tamago - Telur)", mnemonic: "🔤 Huruf 't' dan 'a' digabung jadi satu" },
      { kana: "ち", romaji: "chi", example: "地下鉄 (chikatetsu - Subway)", mnemonic: "🌶️ Cabai rawit (Cabe) pedas melengkung" },
      { kana: "つ", romaji: "tsu", example: "月 (tsuki - Bulan)", mnemonic: "🌊 Ombak Laut Tsunami besar menggulung" },
      { kana: "て", romaji: "te", example: "手 (te - Tangan)", mnemonic: "🖐️ Tapak Tangan melengkung terbuka" },
      { kana: "と", romaji: "to", example: "時計 (tokei - Jam)", mnemonic: "🦶 Jempol Kaki tertancap duri" },
    ],
  },
  {
    id: "n",
    label: "Baris N",
    consonant: "N + Vokal",
    rowTip: "💡 Trik Pemula: Karakter meliuk halus. Bayangkan Naga (な), Nenek (ね), dan Jarum Nenek (に)!",
    items: [
      { kana: "な", romaji: "na", example: "夏 (natsu - Musim Panas)", mnemonic: "🐉 Naga melilit tiang listrik" },
      { kana: "に", romaji: "ni", example: "肉 (niku - Daging)", mnemonic: "🪡 Jarum dan Benang jahit Nenek" },
      { kana: "ぬ", romaji: "nu", example: "ぬいぐるみ (nuigurumi - Boneka)", mnemonic: "🍜 Mie Nasi / Noodle diangkat sumpit" },
      { kana: "ね", romaji: "ne", example: "猫 (neko - Kucing)", mnemonic: "🐈 Kucing (Neko) ekornya melingkar" },
      { kana: "の", romaji: "no", example: "飲み物 (nomimono - Minuman)", mnemonic: "🚫 Rambu dilarang 'NO' stop bundar" },
    ],
  },
  {
    id: "h",
    label: "Baris H",
    consonant: "H + Vokal",
    rowTip: "💡 Trik Pemula: Huruf 'ふ' dibaca 'Fu' lembut seperti hembusan napas saat tiup sup panas!",
    items: [
      { kana: "は", romaji: "ha", example: "花 (hana - Bunga)", mnemonic: "😄 Tertawa 'Ha-ha!' sambil pegang Harpa" },
      { kana: "ひ", romaji: "hi", example: "光 (hikari - Cahaya)", mnemonic: "😁 Mulut nyengir lebar 'Hi-hi-hi!'" },
      { kana: "ふ", romaji: "fu", example: "船 (fune - Kapal)", mnemonic: "☁️ Orang tiup makanan panas 'Fuuu-fuuu'" },
      { kana: "へ", romaji: "he", example: "部屋 (heya - Kamar)", mnemonic: "⛰️ Atap Rumah / Puncak Gunung" },
      { kana: "ほ", romaji: "ho", example: "星 (hoshi - Bintang)", mnemonic: "🏒 Tongkat Hockey dan bola puck" },
    ],
  },
  {
    id: "m",
    label: "Baris M",
    consonant: "M + Vokal",
    rowTip: "💡 Trik Pemula: Bentuk melengkung manis. Bayangkan Wajah Mama (ま) dan Suara Sapi (む)!",
    items: [
      { kana: "ま", romaji: "ma", example: "町 (machi - Kota)", mnemonic: "👩 Wajah Mama pakai jepit pita" },
      { kana: "み", romaji: "mi", example: "水 (mizu - Air)", mnemonic: "🍜 Angka 21 / Semangkuk Mi ayam" },
      { kana: "む", romaji: "mu", example: "虫 (mushi - Serangga)", mnemonic: "🐮 Moncong Sapi berbunyi 'Muuu!'" },
      { kana: "め", romaji: "me", example: "目 (me - Mata)", mnemonic: "👁️ Mata (Me) melotot tanpa alis" },
      { kana: "も", romaji: "mo", example: "森 (mori - Hutan)", mnemonic: "🎣 Kail pancing Mobil dapat banyak ikan" },
    ],
  },
  {
    id: "y",
    label: "Baris Y",
    consonant: "Y + Vokal",
    rowTip: "💡 Trik Pemula: Hanya 3 vokal (Ya, Yu, Yo). Bayangkan Jangkar Kapal (や) dan Air Panas Onsen/UFO (ゆ)!",
    items: [
      { kana: "や", romaji: "ya", example: "山 (yama - Gunung)", mnemonic: "⚓ Jangkar Kapal meliuk ke kanan / Tanduk Banteng" },
      { kana: "ゆ", romaji: "yu", example: "雪 (yuki - Salju)", mnemonic: "温泉 Bak Air Panas Onsen (Yu/ゆ) / UFO melayang" },
      { kana: "よ", romaji: "yo", example: "夜 (yoru - Malam)", mnemonic: "🪀 Yo-yo tergantung di jari anak-anak" },
    ],
  },
  {
    id: "r",
    label: "Baris R",
    consonant: "R + Vokal",
    rowTip: "💡 Trik Pemula: Bunyi R Jepang empuk (ujung lidah menepuk langit-langit mulut). Bayangkan Kelinci (ら)!",
    items: [
      { kana: "ら", romaji: "ra", example: "ライオン (raion - Singa)", mnemonic: "🐇 Kelinci duduk di atas Rumput" },
      { kana: "り", romaji: "ri", example: "りんご (ringo - Apel)", mnemonic: "🌾 Dua batang Ranting di tepi kali" },
      { kana: "る", romaji: "ru", example: "留守 (rusu - Rumah Kosong)", mnemonic: "🛣️ Roda berputar ada bundaran angka 3" },
      { kana: "れ", romaji: "re", example: "歴史 (rekishi - Sejarah)", mnemonic: "🏃 Orang Lari (Racer) menuju finish" },
      { kana: "ろ", romaji: "ro", example: "六 (roku - Enam)", mnemonic: "🛣️ Roda bus tanpa bundaran" },
    ],
  },
  {
    id: "w",
    label: "Baris W",
    consonant: "W + Vokal",
    rowTip: "💡 Trik Pemula: Huruf 'を' (Wo) saat ini praktis dibaca 'O' dan dipakai khusus sebagai kata sambung / partikel!",
    items: [
      { kana: "わ", romaji: "wa", example: "私 (watashi - Saya)", mnemonic: "🐝 Tawon / Wayang terbang meliuk" },
      { kana: "を", romaji: "wo", example: "本を飲む (o - Partikel)", mnemonic: "🏋️ Orang angkat besi teriak 'WOAH!'" },
    ],
  },
  {
    id: "n_single",
    label: "Huruf ん",
    consonant: "Huruf Mati N",
    rowTip: "💡 Trik Pemula: Satu-satunya konsonan mati berdiri sendiri tanpa pasangan vokal!",
    items: [
      { kana: "ん", romaji: "n", example: "本 (hon - Buku)", mnemonic: "✍️ Huruf mati 'N' ditulis sambung" },
    ],
  },
];

const KATAKANA_GRID: KanaRow[] = [
  {
    id: "vowel",
    label: "Vokal Dasar",
    consonant: "A - I - U - E - O",
    rowTip: "💡 Trik Pemula: 5 vokal dasar Katakana. Bayangkan Es Krim Cone (ア), Orang miring (イ), dan Lift (エ)!",
    items: [
      { kana: "ア", romaji: "a", example: "アイス (aisu - Es Krim)", mnemonic: "🍦 Es Krim Cone dengan scoop di atasnya" },
      { kana: "イ", romaji: "i", example: "インク (inku - Tinta)", mnemonic: "👥 Orang (Itu) berdiri miring 2 garis" },
      { kana: "ウ", romaji: "u", example: "ウェブ (webu - Web)", mnemonic: "🦧 Udang berpakaian topi di atasnya" },
      { kana: "エ", romaji: "e", example: "エレベーター (erebeetaa - Lift)", mnemonic: "🏢 Lift (Elevator) 2 lantai bertingkat" },
      { kana: "オ", romaji: "o", example: "オレンジ (orenji - Jeruk)", mnemonic: "🚴 Orang naik Operasi sepeda miring" },
    ],
  },
  {
    id: "k",
    label: "Baris K",
    consonant: "K + Vokal",
    rowTip: "💡 Trik Pemula: Katakana baris K mirip Hiragana versi tegas & menyudut!",
    items: [
      { kana: "カ", romaji: "ka", example: "カメラ (kamera - Kamera)", mnemonic: "🦘 Gaya Karate nendang menyudut tegak" },
      { kana: "キ", romaji: "ki", example: "キー (kii - Kunci)", mnemonic: "🔑 Gantungan Kunci tanpa lengkungan" },
      { kana: "ク", romaji: "ku", example: "クラス (kurasu - Kelas)", mnemonic: "🐊 Mulut Kuau / Kucing menganga lebar" },
      { kana: "ケ", romaji: "ke", example: "ケーキ (keeki - Kue)", mnemonic: "📐 Sudut Segitiga potong Kue" },
      { kana: "コ", romaji: "ko", example: "コーヒー (koohii - Kopi)", mnemonic: "📦 Kotak Kardus terbuka sudut siku" },
    ],
  },
  {
    id: "s",
    label: "Baris S",
    consonant: "S + Vokal",
    rowTip: "💡 Trik Pemula: Perhatikan perbedaan 'シ' (Shi - senyum dari bawah) dan 'ソ' (So - tetesan dari atas)!",
    items: [
      { kana: "サ", romaji: "sa", example: "サッカー (sakkaa - Sepakbola)", mnemonic: "🥢 Dua Sumpit menancap di makanan" },
      { kana: "シ", romaji: "shi", example: "シャツ (shatsu - Kemeja)", mnemonic: "⚓ Senyum mata miring (Shi) 3 coretan" },
      { kana: "ス", romaji: "su", example: "スーパー (suupaa - Supermarket)", mnemonic: "🦸 Gantungan Hanger baju Super" },
      { kana: "セ", romaji: "se", example: "セーター (seetaa - Sweter)", mnemonic: "🚴 Sepeda lipat bersudut siku" },
      { kana: "ソ", romaji: "so", example: "ソフト (sofuto - Es Krim)", mnemonic: "💧 Satu Tetes air hujan turun dari atas" },
    ],
  },
  {
    id: "t",
    label: "Baris T",
    consonant: "T + Vokal",
    rowTip: "💡 Trik Pemula: Perhatikan perbedaan 'ツ' (Tsu - 3 tetes Tsunami dari atas)!",
    items: [
      { kana: "タ", romaji: "ta", example: "タクシー (takushii - Taksi)", mnemonic: "🔤 Mirip karakter '夕' Senja / Taksi" },
      { kana: "チ", romaji: "chi", example: "チーズ (chiizu - Keju)", mnemonic: "🌶️ Cheerleader pemandu sorak melompat" },
      { kana: "ツ", romaji: "tsu", example: "ツアー (tsuaa - Turis)", mnemonic: "🌊 3 Tetesan air ombak Tsunami" },
      { kana: "テ", romaji: "te", example: "テレビ (terebi - TV)", mnemonic: "📡 Tiang Antena Televisi rumah" },
      { kana: "ト", romaji: "to", example: "トマト (tomato - Tomat)", mnemonic: "🌲 Batang Pohon Tomat beranting" },
    ],
  },
  {
    id: "n",
    label: "Baris N",
    consonant: "N + Vokal",
    rowTip: "💡 Trik Pemula: Coretan sederhana. Bayangkan Pisau Ninja (ナ) dan Angka 2 (ニ)!",
    items: [
      { kana: "ナ", romaji: "na", example: "ナイフ (naifu - Pisau)", mnemonic: "🗡️ Pisau tajam Pedang Ninja" },
      { kana: "ニ", romaji: "ni", example: "ニュース (nyuusu - Berita)", mnemonic: "🔢 Dua garis horizontal (Angka 2)" },
      { kana: "ヌ", romaji: "nu", example: "ヌードル (nuudoru - Mie)", mnemonic: "🍜 Sumpit mengambil Mie Nasi / Noodle" },
      { kana: "ネ", romaji: "ne", example: "ネクタイ (nekutai - Dasi)", mnemonic: "🐈 Kucing (Neko) pakai Dasi miring" },
      { kana: "ノ", romaji: "no", example: "ノート (nooto - Buku Catatan)", mnemonic: "📏 Satu garis miring lurus 'NO'" },
    ],
  },
  {
    id: "h",
    label: "Baris H",
    consonant: "H + Vokal",
    rowTip: "💡 Trik Pemula: Karakter 'ヘ' (He) persis sama antara Hiragana dan Katakana!",
    items: [
      { kana: "ハ", romaji: "ha", example: "ハンバーガー (hanbaagaa - Hamburger)", mnemonic: "👒 Topi Hamburger terbuka dua sisi" },
      { kana: "ヒ", romaji: "hi", example: "ヒーロー (hiiroo - Pahlawan)", mnemonic: "👠 Sepatu High heels wanita" },
      { kana: "フ", romaji: "fu", example: "フォーク (fooku - Garpu)", mnemonic: "🚩 Bendera bertiup angin 'Fu-fu'" },
      { kana: "ヘ", romaji: "he", example: "ヘリコプター (herikoputaa - Helikopter)", mnemonic: "⛰️ Puncak Gunung (sama dengan Hiragana)" },
      { kana: "ホ", romaji: "ho", example: "ホテル (hoteru - Hotel)", mnemonic: "✝️ Salib / Pohon Bintang Hotel" },
    ],
  },
  {
    id: "m",
    label: "Baris M",
    consonant: "M + Vokal",
    rowTip: "💡 Trik Pemula: Karakter 'ミ' (Mi) adalah 3 garis miring seperti nada Mi!",
    items: [
      { kana: "マ", romaji: "ma", example: "マスク (masuku - Masker)", mnemonic: "🐴 Moncong Kuda (Mama) meliuk" },
      { kana: "ミ", romaji: "mi", example: "ミルク (miruku - Susu)", mnemonic: "🎵 3 Garis Miring (Do-Re-Mi)" },
      { kana: "ム", romaji: "mu", example: "ゲーム (geemu - Game)", mnemonic: "🐮 Segitiga Moncong Sapi 'Muuu'" },
      { kana: "メ", romaji: "me", example: "メガネ (megane - Kacamata)", mnemonic: "⚔️ Pedang silang X (Mata melotot)" },
      { kana: "モ", romaji: "mo", example: "モデル (moderu - Model)", mnemonic: "⚓ Jangkar Kapal / Mobil (mirip も)" },
    ],
  },
  {
    id: "y",
    label: "Baris Y",
    consonant: "Y + Vokal",
    rowTip: "💡 Trik Pemula: Hanya 3 vokal (Ya, Yu, Yo). Bayangkan Rak Buku 3 tingkat (ヨ)!",
    items: [
      { kana: "ヤ", romaji: "ya", example: "ヤマ (yama - Gunung)", mnemonic: "⚓ Jangkar Kapal tegak (mirip や)" },
      { kana: "ユ", romaji: "yu", example: "ユニフォーム (yunifoomu - Seragam)", mnemonic: "🪝 Hanger gantungan baju UFO" },
      { kana: "ヨ", romaji: "yo", example: "ヨーグルト (yooguruto - Yogurt)", mnemonic: "🛋️ Rak buku 3 tingkat (Yo-yo)" },
    ],
  },
  {
    id: "r",
    label: "Baris R",
    consonant: "R + Vokal",
    rowTip: "💡 Trik Pemula: Karakter 'ロ' (Ro) berbentuk kotak persegi sempurna!",
    items: [
      { kana: "ラ", romaji: "ra", example: "ラジオ (rajio - Radio)", mnemonic: "📻 Antena Radio di atas kotak" },
      { kana: "リ", romaji: "ri", example: "リンゴ (ringo - Apel)", mnemonic: "🌾 Dua batang Ranting (mirip り)" },
      { kana: "ル", romaji: "ru", example: "ルール (ruuru - Aturan)", mnemonic: "🛣️ Dua garis tiang Roda jalanan" },
      { kana: "レ", romaji: "re", example: "レストラン (resutoran - Restoran)", mnemonic: "🏃 Kaki melangkah Lari ke kanan" },
      { kana: "ロ", romaji: "ro", example: "ロボット (robotto - Robot)", mnemonic: "⏹️ Kotak Persegi bundar Robot" },
    ],
  },
  {
    id: "w",
    label: "Baris W",
    consonant: "W + Vokal",
    rowTip: "💡 Trik Pemula: Karakter 'ワ' (Wa) seperti gelas minum terbalik!",
    items: [
      { kana: "ワ", romaji: "wa", example: "ワイン (wain - Anggur)", mnemonic: "🥤 Gelas air minum (Wa) bersudut" },
      { kana: "ヲ", romaji: "wo", example: "ヲ (o - Partikel)", mnemonic: "🏋️ Gagang perkakas (Woah)" },
    ],
  },
  {
    id: "n_single",
    label: "Huruf ン",
    consonant: "Huruf Mati N",
    rowTip: "💡 Trik Pemula: Mirip シ (Shi) tetapi hanya 2 coretan dari bawah ke atas!",
    items: [
      { kana: "ン", romaji: "n", example: "ラーメン (raamen - Ramen)", mnemonic: "✍️ Satu mata senyum miring (N)" },
    ],
  },
];

export default function WelcomePage() {
  const [activeScript, setActiveScript] = useState<"hiragana" | "katakana">("hiragana");
  const [selectedRowId, setSelectedRowId] = useState<string>("vowel");
  const [viewMode, setViewMode] = useState<"grid" | "flashcard">("grid");
  const [cardIndex, setCardIndex] = useState<number>(0);
  const [isCardFlipped, setIsCardFlipped] = useState<boolean>(false);
  const [flashcardMode, setFlashcardMode] = useState<"learn" | "quiz" | "write">("learn");
  const [streak, setStreak] = useState<number>(1);
  const [audioPlaying, setAudioPlaying] = useState<string | null>(null);
  const [activeMnemonic, setActiveMnemonic] = useState<KanaItem | null>(null);

  // Information Pop-up Modal State
  const [isInfoModalOpen, setIsInfoModalOpen] = useState<boolean>(false);

  // Stroke Order Canvas State
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [showGuide, setShowGuide] = useState(true);

  // Active Grid Data Computation
  const CURRENT_GRID = activeScript === "hiragana" ? HIRAGANA_GRID : KATAKANA_GRID;

  // Streak management via localStorage
  useEffect(() => {
    if (typeof window === "undefined") return;
    try {
      const today = new Date().toISOString().split("T")[0];
      const savedData = localStorage.getItem("nihongo_streak");

      if (savedData) {
        const { count, lastDate } = JSON.parse(savedData);
        if (lastDate === today) {
          setStreak(count);
        } else {
          const yesterday = new Date();
          yesterday.setDate(yesterday.getDate() - 1);
          const yesterdayStr = yesterday.toISOString().split("T")[0];

          if (lastDate === yesterdayStr) {
            const newStreak = count + 1;
            setStreak(newStreak);
            localStorage.setItem("nihongo_streak", JSON.stringify({ count: newStreak, lastDate: today }));
          } else {
            setStreak(1);
            localStorage.setItem("nihongo_streak", JSON.stringify({ count: 1, lastDate: today }));
          }
        }
      } else {
        localStorage.setItem("nihongo_streak", JSON.stringify({ count: 1, lastDate: today }));
        setStreak(1);
      }
    } catch (e) {
      console.error("Streak storage error:", e);
    }
  }, []);

  // Clear Canvas Drawing
  const clearCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  };

  // Reset Canvas when changing card, script, or mode
  useEffect(() => {
    if (flashcardMode === "write") {
      clearCanvas();
    }
  }, [cardIndex, selectedRowId, activeScript, flashcardMode]);

  // Canvas Drawing Handlers
  const getCoordinates = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0 };
    const rect = canvas.getBoundingClientRect();
    const clientX = "touches" in e ? e.touches[0].clientX : e.clientX;
    const clientY = "touches" in e ? e.touches[0].clientY : e.clientY;
    return {
      x: clientX - rect.left,
      y: clientY - rect.top,
    };
  };

  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    setIsDrawing(true);
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const { x, y } = getCoordinates(e);
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.strokeStyle = "#f43f5e";
    ctx.lineWidth = 7;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
  };

  const draw = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const { x, y } = getCoordinates(e);
    ctx.lineTo(x, y);
    ctx.stroke();
  };

  const stopDrawing = () => {
    setIsDrawing(false);
  };

  // Trigger Confetti & smooth scroll down when clicking CTA
  const handleRetsuGo = () => {
    confetti({
      particleCount: 120,
      spread: 80,
      origin: { y: 0.6 },
      colors: ["#f43f5e", "#fda4af", "#38bdf8", "#fbbf24", "#a855f7"],
    });
    const el = document.getElementById("interactive-playground");
    el?.scrollIntoView({ behavior: "smooth" });
  };

  // Text-to-speech for Japanese pronunciation using Web Speech API
  const speakJapanese = (item: KanaItem) => {
    setActiveMnemonic(item);
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(item.kana);
      utterance.lang = "ja-JP";
      utterance.rate = 0.85;
      setAudioPlaying(item.kana);
      utterance.onend = () => setAudioPlaying(null);
      utterance.onerror = () => setAudioPlaying(null);
      window.speechSynthesis.speak(utterance);
    }
  };

  const activeRow = CURRENT_GRID.find((r) => r.id === selectedRowId) || CURRENT_GRID[0];
  const isShowAll = selectedRowId === "all";

  // Flashcard deck computation
  const flashcardDeck = isShowAll
    ? CURRENT_GRID.flatMap((r) => r.items)
    : activeRow.items;

  const currentFlashcard = flashcardDeck[cardIndex] || flashcardDeck[0];

  const handleNextCard = () => {
    setCardIndex((prev) => (prev + 1) % flashcardDeck.length);
    setIsCardFlipped(false);
  };

  const handlePrevCard = () => {
    setCardIndex((prev) => (prev - 1 + flashcardDeck.length) % flashcardDeck.length);
    setIsCardFlipped(false);
  };

  const handleShuffleCard = () => {
    const randomIndex = Math.floor(Math.random() * flashcardDeck.length);
    setCardIndex(randomIndex);
    setIsCardFlipped(false);
  };

  return (
    <div className="relative min-h-screen flex flex-col bg-[#0b1120] text-slate-100 overflow-hidden font-sans">
      {/* Dynamic Background Petals & Torii Glow */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute -top-40 -left-40 w-96 h-96 bg-rose-600/20 rounded-full blur-[120px]" />
        <div className="absolute top-1/3 -right-40 w-96 h-96 bg-sky-500/15 rounded-full blur-[140px]" />
        <div className="absolute -bottom-40 left-1/3 w-[500px] h-[500px] bg-purple-600/15 rounded-full blur-[160px]" />
        
        {/* Floating Sakura Petals */}
        {[...Array(12)].map((_, i) => (
          <div
            key={i}
            className="sakura-petal"
            style={{
              left: `${(i * 8.5) % 100}%`,
              width: `${10 + (i % 4) * 4}px`,
              height: `${14 + (i % 4) * 4}px`,
              animationDuration: `${7 + (i % 5) * 3}s`,
              animationDelay: `${i * 0.6}s`,
            }}
          />
        ))}
      </div>

      {/* Top Navigation Bar */}
      <header className="relative z-10 w-full border-b border-slate-800/80 bg-[#0b1120]/80 backdrop-blur-md px-6 py-4">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-rose-500 to-rose-700 flex items-center justify-center text-white font-bold shadow-lg shadow-rose-500/30 border border-rose-400/40">
              <span className="text-xl font-bold tracking-tight">日</span>
            </div>
            <div>
              <span className="font-bold text-lg text-white tracking-wide">
                NihongoNol
              </span>
              <p className="text-xs text-slate-400">
                Belajar Bahasa Jepang Dari Nol
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-800/90 border border-slate-700 text-xs text-slate-300 shadow-sm">
              <Flame className="w-4 h-4 text-amber-400 fill-amber-400" />
              <span>Streak: <strong className="text-amber-400">{streak} Hari</strong></span>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Welcome Section */}
      <main className="relative z-10 flex-1 max-w-6xl mx-auto w-full px-6 pt-12 pb-16 flex flex-col items-center justify-center text-center">
        
        {/* Beginner Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-800/90 border border-rose-500/30 text-xs font-medium text-rose-300 mb-8 backdrop-blur-sm shadow-xl shadow-rose-950/20 animate-fade-in">
          <Sparkles className="w-4 h-4 text-rose-400" />
          <span>日本語の基礎 • Nihongo no Kiso</span>
          <span className="h-1 w-1 rounded-full bg-rose-400"></span>
          <span className="text-slate-300">Khusus Pemula</span>
        </div>

        {/* Main Required Title */}
        <h1 
          id="main-title" 
          className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-white max-w-4xl leading-[1.15] mb-4"
        >
          Belajar Bahasa Jepang
          <span className="shimmer-text block mt-1">
            Dasar
          </span>
        </h1>

        {/* Japanese Subtext decoration */}
        <div className="text-sm sm:text-base font-medium text-slate-400 mb-8 tracking-widest uppercase">
          ようこそ • Belajar Bahasa Jepang Dari Nol
        </div>

        {/* Main Required CTA Button */}
        <div className="flex items-center justify-center mb-16 w-full sm:w-auto">
          <button
            id="cta-retsu-go"
            onClick={handleRetsuGo}
            className="w-full sm:w-auto px-10 py-4 rounded-2xl bg-gradient-to-r from-rose-500 via-rose-600 to-pink-600 text-white font-extrabold text-xl shadow-xl shadow-rose-600/30 hover:shadow-rose-600/50 hover:scale-105 active:scale-95 transition-all duration-200 border border-rose-400/40 flex items-center justify-center gap-3 group animate-glow cursor-pointer"
          >
            <span>Retsu Go!</span>
            <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        {/* EKSPLOR LEARNING SECTION */}
        <section 
          id="interactive-playground"
          className="w-full max-w-4xl rounded-3xl bg-slate-900/80 border border-slate-800/90 p-6 sm:p-8 backdrop-blur-xl shadow-2xl text-left"
        >
          {/* Main Alphabet System Switcher: Hiragana vs Katakana */}
          <div className="flex items-center gap-2 bg-slate-950 p-1.5 rounded-2xl border border-slate-800 text-sm font-bold mb-8 shadow-inner">
            <button
              onClick={() => {
                setActiveScript("hiragana");
                setSelectedRowId("vowel");
                setCardIndex(0);
                setIsCardFlipped(false);
                setActiveMnemonic(null);
              }}
              className={`flex-1 py-3 px-4 rounded-xl transition-all cursor-pointer flex items-center justify-center gap-2.5 ${
                activeScript === "hiragana"
                  ? "bg-rose-600 text-white shadow-lg shadow-rose-600/30 font-extrabold scale-[1.01]"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              <span className="text-xl font-bold font-jp">あ</span>
              <span>Belajar Hiragana</span>
            </button>

            <button
              onClick={() => {
                setActiveScript("katakana");
                setSelectedRowId("vowel");
                setCardIndex(0);
                setIsCardFlipped(false);
                setActiveMnemonic(null);
              }}
              className={`flex-1 py-3 px-4 rounded-xl transition-all cursor-pointer flex items-center justify-center gap-2.5 ${
                activeScript === "katakana"
                  ? "bg-rose-600 text-white shadow-lg shadow-rose-600/30 font-extrabold scale-[1.01]"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              <span className="text-xl font-bold font-jp">ア</span>
              <span>Belajar Katakana</span>
            </button>
          </div>

          {/* Header Module Title & Mode Switcher */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between border-b border-slate-800 pb-6 mb-6 gap-4">
            <div>
              <div className="flex items-center gap-3">
                <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
                  {activeScript === "hiragana" ? "Belajar Hiragana" : "Belajar Katakana"}
                </h2>
                {/* Interactive Info Trigger Badge */}
                <button
                  onClick={() => setIsInfoModalOpen(true)}
                  className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 border border-rose-500/30 text-xs font-semibold text-rose-300 transition-all cursor-pointer shadow-sm"
                  title="Klik untuk melihat info & fungsi huruf"
                >
                  <HelpCircle className="w-3.5 h-3.5 text-rose-400" />
                  <span>Info Fungsi</span>
                </button>
              </div>

              <p className="text-xs text-slate-400 mt-1">
                {activeScript === "hiragana" 
                  ? "Huruf asli Jepang untuk kata lokal & partikel tata bahasa" 
                  : "Huruf Jepang untuk kata serapan asing & nama luar negeri"}
              </p>
            </div>

            {/* View Mode Switcher: Grid vs Flashcard */}
            <div className="flex items-center bg-slate-950 p-1.5 rounded-xl border border-slate-800 text-xs font-bold shrink-0">
              <button
                onClick={() => {
                  setViewMode("grid");
                  setIsCardFlipped(false);
                }}
                className={`px-3.5 py-2 rounded-lg transition-all flex items-center gap-1.5 cursor-pointer ${
                  viewMode === "grid"
                    ? "bg-rose-600 text-white shadow"
                    : "text-slate-400 hover:text-white"
                }`}
              >
                <Grid className="w-3.5 h-3.5" />
                <span>Tabel Grid (5x10)</span>
              </button>

              <button
                onClick={() => {
                  setViewMode("flashcard");
                  setCardIndex(0);
                  setIsCardFlipped(false);
                }}
                className={`px-3.5 py-2 rounded-lg transition-all flex items-center gap-1.5 cursor-pointer ${
                  viewMode === "flashcard"
                    ? "bg-rose-600 text-white shadow"
                    : "text-slate-400 hover:text-white"
                }`}
              >
                <CreditCard className="w-3.5 h-3.5" />
                <span>Flashcard Hafalan</span>
              </button>
            </div>
          </div>

          {/* Core Sound Structure Concept Explanation Card */}
          <div className="p-5 sm:p-6 rounded-2xl bg-gradient-to-br from-slate-950 via-slate-900 to-rose-950/30 border border-slate-800/90 mb-8 shadow-inner">
            <div className="flex items-start gap-4">
              <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-400 shrink-0 mt-0.5">
                <Info className="w-6 h-6" />
              </div>
              <div className="space-y-3 text-sm text-slate-300 leading-relaxed w-full">
                <p className="font-semibold text-white text-base mb-2">
                  💡 Prinsip Utama Pembacaan Huruf Jepang ({activeScript === "hiragana" ? "Hiragana" : "Katakana"}):
                </p>

                <p>
                  Huruf Jepang dibaca per <strong>suku kata</strong> (vokal murni atau konsonan + vokal), berbasis <strong>tabel 5x10</strong>:
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs pt-1">
                  <div className="p-3 rounded-xl bg-slate-900/90 border border-slate-800 flex items-start gap-2">
                    <span className="text-rose-400 font-bold">1.</span>
                    <div>
                      <strong className="text-white block mb-0.5">
                        Vokal Dasar (5 Bunyi):
                      </strong>
                      <span className="text-rose-300 font-bold font-mono">
                        {activeScript === "hiragana" 
                          ? "あ (A), い (I), う (U), え (E), お (O)"
                          : "ア (A), イ (I), ウ (U), エ (E), オ (O)"}
                      </span>
                    </div>
                  </div>

                  <div className="p-3 rounded-xl bg-slate-900/90 border border-slate-800 flex items-start gap-2">
                    <span className="text-rose-400 font-bold">2.</span>
                    <div>
                      <strong className="text-white block mb-0.5">
                        Baris Konsonan (10 Baris):
                      </strong>
                      <span className="text-slate-300">
                        K, S, T, N, H, M, Y, R, W + ({activeScript === "hiragana" ? "ん" : "ン"} = N)
                      </span>
                    </div>
                  </div>
                </div>
                <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/20 text-xs text-rose-200">
                  📌 <strong>Contoh:</strong>{" "}
                  Baris K dipasangkan dengan 5 vokal dasar menjadi:{" "}
                  <span className="font-bold text-white">
                    {activeScript === "hiragana"
                      ? "か (Ka), き (Ki), く (Ku), け (Ke), こ (Ko)"
                      : "カ (Ka), キ (Ki), ク (Ku), ケ (Ke), コ (Ko)"}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Row Filter Selector */}
          <div className="mb-6">
            <div className="flex items-center justify-between mb-3">
              <label className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                <Layers className="w-4 h-4 text-rose-400" />{" "}
                Pilih Baris Konsonan (Tabel 5x10):
              </label>
              <button
                onClick={() => {
                  setSelectedRowId("all");
                  setCardIndex(0);
                  setIsCardFlipped(false);
                }}
                className={`text-xs px-3 py-1 rounded-lg border font-medium transition-all cursor-pointer ${
                  isShowAll
                    ? "bg-rose-500 text-white border-rose-400"
                    : "bg-slate-950 text-slate-400 border-slate-800 hover:text-white"
                }`}
              >
                Tampilkan Semua Tabel
              </button>
            </div>

            <div className="flex flex-wrap gap-2">
              {CURRENT_GRID.map((row) => {
                const isActive = selectedRowId === row.id;
                return (
                  <button
                    key={row.id}
                    onClick={() => {
                      setSelectedRowId(row.id);
                      setCardIndex(0);
                      setIsCardFlipped(false);
                      setActiveMnemonic(null);
                    }}
                    className={`px-3.5 py-2 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
                      isActive
                        ? "bg-rose-600 text-white border-rose-500 shadow-md shadow-rose-600/30 scale-105"
                        : "bg-slate-950/70 border-slate-800 text-slate-300 hover:border-slate-700 hover:bg-slate-800"
                    }`}
                  >
                    {row.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* MODE 1: GRID VIEW (5x10) */}
          {viewMode === "grid" && (
            <div className="space-y-6">
              {/* Active Clicked Mnemonic Spotlight Card */}
              {activeMnemonic && (
                <div className="p-5 rounded-2xl bg-gradient-to-r from-rose-950/60 to-slate-900 border border-rose-500/40 mb-6 flex items-center justify-between gap-4 animate-fade-in shadow-xl">
                  <div className="flex items-center gap-4">
                    <div className="h-14 w-14 rounded-2xl bg-rose-500 text-white font-extrabold text-3xl flex items-center justify-center shadow-lg shadow-rose-500/30">
                      {activeMnemonic.kana}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-lg font-bold text-white uppercase tracking-wide">
                          Romaji: [{activeMnemonic.romaji}]
                        </span>
                        <span className="text-xs text-slate-400 font-mono">({activeMnemonic.example})</span>
                      </div>
                      <p className="text-xs font-semibold text-rose-300 mt-1">
                        🧠 <strong>Trik Hafalan:</strong> {activeMnemonic.mnemonic}
                      </p>
                    </div>
                  </div>

                  <button
                    onClick={() => speakJapanese(activeMnemonic)}
                    className="p-3 rounded-xl bg-rose-500 hover:bg-rose-400 text-white font-bold text-xs transition-all flex items-center gap-2 shrink-0 cursor-pointer shadow-lg shadow-rose-500/20"
                  >
                    <Volume2 className="w-4 h-4" />
                    <span>Putar Audio</span>
                  </button>
                </div>
              )}

              {(isShowAll ? CURRENT_GRID : [activeRow]).map((row) => (
                <div
                  key={row.id}
                  className="p-5 rounded-2xl bg-slate-950/60 border border-slate-800/80 backdrop-blur-sm"
                >
                  <div className="flex items-center justify-between mb-4 border-b border-slate-800/80 pb-3">
                    <div className="flex items-center gap-2">
                      <span className="px-2.5 py-1 rounded-lg bg-rose-500/20 text-rose-300 border border-rose-500/30 text-xs font-bold">
                        {row.label}
                      </span>
                      <span className="text-xs text-slate-400 font-medium">({row.consonant})</span>
                    </div>
                    <span className="text-[11px] text-slate-400 italic">
                      🧠 Trik Hafalan Interaktif • 🔊 Klik untuk suara
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-5 gap-3">
                    {row.items.map((item, idx) => {
                      const isPlaying = audioPlaying === item.kana;
                      const isSelected = activeMnemonic?.kana === item.kana;

                      return (
                        <button
                          key={idx}
                          onClick={() => speakJapanese(item)}
                          className={`p-4 rounded-xl border transition-all flex flex-col items-center justify-center text-center group cursor-pointer ${
                            isSelected
                              ? "bg-rose-500/20 border-rose-500 ring-2 ring-rose-500/40 shadow-lg shadow-rose-500/20"
                              : isPlaying
                              ? "bg-rose-500/20 border-rose-500 scale-105"
                              : "bg-slate-900/80 border-slate-800 hover:border-rose-500/50 hover:bg-slate-800"
                          }`}
                        >
                          <span className="text-3xl sm:text-4xl font-extrabold text-white mb-1 group-hover:scale-110 transition-transform">
                            {item.kana}
                          </span>
                          <span className="text-xs font-bold text-rose-400 tracking-wide uppercase mb-1">
                            [{item.romaji}]
                          </span>
                          
                          {/* Mnemonic Hook Badge */}
                          <div className="w-full mt-1.5 p-2 rounded-lg bg-slate-950/80 border border-slate-800 text-[11px] text-slate-300 font-medium text-left leading-snug group-hover:border-rose-500/30">
                            <span className="text-amber-300 font-bold block mb-0.5">
                              🧠 Hafalan:
                            </span>
                            <span>{item.mnemonic}</span>
                          </div>

                          <div className="mt-2 flex items-center gap-1 text-[10px] text-slate-400 group-hover:text-rose-300">
                            <Volume2 className={`w-3.5 h-3.5 ${isPlaying ? "animate-bounce text-rose-400" : ""}`} />
                            <span>{isPlaying ? "Memutar..." : "Dengar Audio"}</span>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* MODE 2: FLASHCARD HAFALAN MODE */}
          {viewMode === "flashcard" && currentFlashcard && (
            <div className="flex flex-col items-center justify-center py-4">
              {/* Sub-mode Switcher: Belajar vs Uji Hafalan vs Latihan Menulis */}
              <div className="flex flex-wrap items-center justify-center bg-slate-950 p-1.5 rounded-2xl border border-slate-800 text-xs font-bold mb-6 gap-1 shadow-inner">
                <button
                  onClick={() => {
                    setFlashcardMode("learn");
                    setIsCardFlipped(false);
                  }}
                  className={`px-3.5 py-2 rounded-xl transition-all cursor-pointer flex items-center gap-1.5 ${
                    flashcardMode === "learn"
                      ? "bg-rose-600 text-white shadow-md shadow-rose-600/30"
                      : "text-slate-400 hover:text-white"
                  }`}
                >
                  <BookOpen className="w-3.5 h-3.5" />
                  <span>Mode Belajar</span>
                </button>

                <button
                  onClick={() => {
                    setFlashcardMode("quiz");
                    setIsCardFlipped(false);
                  }}
                  className={`px-3.5 py-2 rounded-xl transition-all cursor-pointer flex items-center gap-1.5 ${
                    flashcardMode === "quiz"
                      ? "bg-rose-600 text-white shadow-md shadow-rose-600/30"
                      : "text-slate-400 hover:text-white"
                  }`}
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Mode Uji Hafalan (Flip)</span>
                </button>

                <button
                  onClick={() => {
                    setFlashcardMode("write");
                    setIsCardFlipped(false);
                  }}
                  className={`px-3.5 py-2 rounded-xl transition-all cursor-pointer flex items-center gap-1.5 ${
                    flashcardMode === "write"
                      ? "bg-rose-600 text-white shadow-md shadow-rose-600/30"
                      : "text-slate-400 hover:text-white"
                  }`}
                >
                  <PenTool className="w-3.5 h-3.5" />
                  <span>Latihan Menulis</span>
                </button>
              </div>

              {/* Progress & Deck Status Bar */}
              <div className="w-full max-w-lg flex items-center justify-between text-xs text-slate-400 mb-3 px-1">
                <span className="font-semibold text-rose-300">
                  Kartu {cardIndex + 1} dari {flashcardDeck.length} ({isShowAll ? (activeScript === "hiragana" ? "Semua Hiragana" : "Semua Katakana") : activeRow.label})
                </span>
                <span className="text-slate-400 italic shrink-0">
                  {flashcardMode === "quiz"
                    ? "Klik kartu untuk flip 🔄"
                    : flashcardMode === "write"
                    ? "✍️ Memperhatikan coretan melatih memori otot"
                    : "Klik speaker / kartu untuk dengar 🔊"}
                </span>
              </div>

              {/* Progress Bar Line */}
              <div className="w-full max-w-lg h-2 rounded-full bg-slate-950 border border-slate-800 overflow-hidden mb-6">
                <div
                  className="h-full bg-gradient-to-r from-rose-500 to-pink-500 transition-all duration-300"
                  style={{ width: `${((cardIndex + 1) / flashcardDeck.length) * 100}%` }}
                />
              </div>

              {/* SUB-MODE 1: MODE BELAJAR (TAMPIL SEMUA DI DEPAN DULU) */}
              {flashcardMode === "learn" && (
                <div
                  onClick={() => speakJapanese(currentFlashcard)}
                  className="w-full max-w-lg rounded-3xl bg-gradient-to-b from-slate-900 via-slate-900 to-rose-950/40 border-2 border-slate-800 hover:border-rose-500/50 p-7 sm:p-8 flex flex-col items-center justify-between text-center shadow-2xl transition-all cursor-pointer mb-8"
                >
                  <div className="w-full flex items-center justify-between mb-4">
                    <span className="text-xs font-semibold px-3 py-1 rounded-full bg-rose-500/20 text-rose-300 border border-rose-500/30">
                      {isShowAll ? (activeScript === "hiragana" ? "Hiragana" : "Katakana") : activeRow.label}
                    </span>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        speakJapanese(currentFlashcard);
                      }}
                      className="p-2.5 rounded-xl bg-rose-500 hover:bg-rose-400 text-white transition-colors cursor-pointer shadow-lg shadow-rose-500/30 flex items-center gap-1.5 text-xs font-bold"
                    >
                      <Volume2 className="w-4 h-4" />
                      <span>Audio</span>
                    </button>
                  </div>

                  <div className="space-y-4 my-2 w-full">
                    <div>
                      <span className="text-7xl sm:text-8xl font-black text-white tracking-wider block drop-shadow-md">
                        {currentFlashcard.kana}
                      </span>
                      <span className="text-xl sm:text-2xl font-extrabold text-rose-400 tracking-widest uppercase block mt-1">
                        [{currentFlashcard.romaji}]
                      </span>
                    </div>

                    {/* Mnemonic Hook Displayed Directly */}
                    <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 text-xs text-slate-200 text-left">
                      <strong className="text-amber-300 block mb-1 text-xs">🧠 Trik Hafalan:</strong>
                      <p className="text-slate-300 leading-relaxed font-medium">
                        {currentFlashcard.mnemonic}
                      </p>
                    </div>

                    <div className="text-xs text-slate-400 font-mono">
                      Contoh Kata: <strong className="text-white">{currentFlashcard.example}</strong>
                    </div>
                  </div>

                  <div className="mt-4 flex items-center gap-1.5 text-xs text-slate-400">
                    <Volume2 className="w-3.5 h-3.5 text-rose-400" />
                    <span>Klik area kartu untuk mendengarkan pengucapan audio</span>
                  </div>
                </div>
              )}

              {/* SUB-MODE 2: MODE UJI HAFALAN (FLIP KARTU 3D) */}
              {flashcardMode === "quiz" && (
                <div
                  onClick={() => setIsCardFlipped(!isCardFlipped)}
                  className="w-full max-w-lg h-80 perspective-1000 cursor-pointer group mb-8"
                >
                  <div
                    className={`relative w-full h-full duration-500 transform-style-3d transition-transform rounded-3xl ${
                      isCardFlipped ? "rotate-y-180" : ""
                    }`}
                  >
                    {/* FRONT SIDE OF FLASHCARD */}
                    <div className="absolute inset-0 w-full h-full rounded-3xl bg-gradient-to-b from-slate-900 to-slate-950 border-2 border-slate-800 p-8 flex flex-col items-center justify-between text-center backface-hidden shadow-2xl group-hover:border-rose-500/50 transition-colors">
                      <div className="w-full flex items-center justify-between">
                        <span className="text-xs font-semibold px-3 py-1 rounded-full bg-rose-500/20 text-rose-300 border border-rose-500/30">
                          {isShowAll ? (activeScript === "hiragana" ? "Hiragana" : "Katakana") : activeRow.label}
                        </span>
                        <span className="text-xs text-slate-400 font-mono">Uji Hafalan</span>
                      </div>

                      <div className="my-auto">
                        <span className="text-7xl sm:text-8xl font-black text-white tracking-wider block drop-shadow-md">
                          {currentFlashcard.kana}
                        </span>
                        <span className="text-xs text-slate-400 tracking-widest uppercase mt-2 block">
                          [ Klik untuk cek tebakanmu ]
                        </span>
                      </div>

                      <div className="flex items-center gap-1.5 text-xs text-rose-400 font-semibold">
                        <RotateCcw className="w-4 h-4" />
                        <span>Klik Kartu Untuk Flip</span>
                      </div>
                    </div>

                    {/* BACK SIDE OF FLASHCARD (FLIPPED) */}
                    <div className="absolute inset-0 w-full h-full rounded-3xl bg-gradient-to-b from-slate-900 via-slate-900 to-rose-950/80 border-2 border-rose-500/60 p-8 flex flex-col items-center justify-between text-center backface-hidden rotate-y-180 shadow-2xl">
                      <div className="w-full flex items-center justify-between">
                        <span className="text-xs font-bold text-rose-300">
                          Jawaban Hafalan
                        </span>
                        <span className="text-xs text-slate-400 font-mono">Kana</span>
                      </div>

                      <div className="space-y-3 my-auto w-full">
                        <div>
                          <span className="text-4xl font-extrabold text-white mb-1 block">
                            {currentFlashcard.kana}
                          </span>
                          <span className="text-lg font-bold text-rose-400 tracking-widest uppercase">
                            [{currentFlashcard.romaji}]
                          </span>
                        </div>

                        <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800 text-xs text-slate-200 text-left">
                          <strong className="text-amber-300 block mb-1">🧠 Trik Hafalan:</strong>
                          <p className="text-slate-300 leading-relaxed font-medium">
                            {currentFlashcard.mnemonic}
                          </p>
                        </div>

                        <div className="text-xs text-slate-400 font-mono">
                          Contoh: <strong className="text-white">{currentFlashcard.example}</strong>
                        </div>
                      </div>

                      <div className="flex items-center gap-1.5 text-xs text-slate-400">
                        <span>Putar kartu kembali</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* SUB-MODE 3: MODE LATIHAN MENULIS (STROKE ORDER CANVAS) */}
              {flashcardMode === "write" && (
                <div className="flex flex-col items-center w-full max-w-lg mb-8">
                  {/* Interactive Drawing Pad */}
                  <div className="relative w-full max-w-[320px] h-[320px] rounded-3xl bg-slate-950 border-2 border-rose-500/40 p-4 shadow-2xl flex items-center justify-center overflow-hidden touch-none">
                    
                    {/* Always-visible Target Romaji Badge (No Hiragana/Katakana spoiler) */}
                    <div className="absolute top-3 left-3 z-20 flex items-center gap-1.5 px-3 py-1 rounded-xl bg-slate-900/90 border border-slate-800 text-xs font-bold text-slate-200 pointer-events-none shadow">
                      <span className="text-[11px] text-slate-400 font-medium">Tulis:</span>
                      <span className="text-rose-400 text-sm font-extrabold font-mono uppercase">[{currentFlashcard.romaji}]</span>
                    </div>

                    {/* Compact Icon Controls Inside Canvas (Top Right) */}
                    <div className="absolute top-3 right-3 z-20 flex items-center gap-1 bg-slate-900/95 p-1 rounded-xl border border-slate-800 shadow">
                      <button
                        onClick={() => setShowGuide(!showGuide)}
                        className="p-1.5 rounded-lg hover:bg-slate-800 text-slate-300 transition-colors cursor-pointer"
                        title={showGuide ? "Sembunyikan Jalur Panduan" : "Tampilkan Jalur Panduan"}
                      >
                        {showGuide ? <EyeOff className="w-4 h-4 text-rose-400" /> : <Eye className="w-4 h-4 text-slate-400" />}
                      </button>

                      <button
                        onClick={() => speakJapanese(currentFlashcard)}
                        className="p-1.5 rounded-lg hover:bg-slate-800 text-slate-300 transition-colors cursor-pointer"
                        title="Putar Suara"
                      >
                        <Volume2 className="w-4 h-4 text-rose-400" />
                      </button>

                      <button
                        onClick={clearCanvas}
                        className="p-1.5 rounded-lg hover:bg-rose-500/20 text-rose-300 transition-colors cursor-pointer"
                        title="Hapus Coretan Canvas"
                      >
                        <Eraser className="w-4 h-4" />
                      </button>
                    </div>

                    {/* Background Trace Guide Character */}
                    {showGuide && (
                      <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none">
                        <span className="text-9xl font-black text-rose-500/20 tracking-wider font-jp">
                          {currentFlashcard.kana}
                        </span>
                      </div>
                    )}

                    {/* Grid Cross Lines */}
                    <div className="absolute inset-0 pointer-events-none border border-dashed border-slate-800/60 m-4 rounded-2xl flex items-center justify-center">
                      <div className="w-full h-[1px] bg-slate-800/40 absolute" />
                      <div className="h-full w-[1px] bg-slate-800/40 absolute" />
                    </div>

                    {/* HTML5 Canvas */}
                    <canvas
                      ref={canvasRef}
                      width={320}
                      height={320}
                      onMouseDown={startDrawing}
                      onMouseMove={draw}
                      onMouseUp={stopDrawing}
                      onMouseLeave={stopDrawing}
                      onTouchStart={startDrawing}
                      onTouchMove={draw}
                      onTouchEnd={stopDrawing}
                      className="relative z-10 w-full h-full cursor-crosshair"
                    />
                  </div>

                  {/* Mnemonic Memory Hint Box for Writing Practice */}
                  <div className="w-full max-w-[320px] mt-4 p-4 rounded-2xl bg-slate-950/90 border border-slate-800/90 text-xs text-slate-200 text-left shadow-lg">
                    <strong className="text-amber-300 block mb-1 text-xs font-bold">🧠 Trik Hafalan:</strong>
                    <p className="text-slate-300 leading-relaxed font-medium">
                      {currentFlashcard.mnemonic}
                    </p>
                    <div className="text-[11px] text-slate-400 font-mono mt-2 pt-2 border-t border-slate-900 flex items-center justify-between">
                      <span>Contoh Kata:</span>
                      <strong className="text-white">{currentFlashcard.example}</strong>
                    </div>
                  </div>
                </div>
              )}

              {/* Flashcard Navigation Controls (Clean: Prev, Shuffle, Next) */}
              <div className="flex items-center justify-center gap-3 w-full max-w-lg">
                <button
                  onClick={handlePrevCard}
                  className="flex-1 px-4 py-3 rounded-2xl bg-slate-950 hover:bg-slate-800 border border-slate-800 text-slate-300 font-bold text-xs transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <ChevronLeft className="w-4 h-4" />
                  <span>Sebelumnya</span>
                </button>

                <button
                  onClick={handleShuffleCard}
                  className="px-5 py-3 rounded-2xl bg-slate-950 hover:bg-slate-800 border border-slate-800 text-slate-300 font-bold text-xs transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                  title="Acak Kartu"
                >
                  <Shuffle className="w-4 h-4 text-rose-400" />
                  <span>Acak</span>
                </button>

                <button
                  onClick={handleNextCard}
                  className="flex-1 px-4 py-3 rounded-2xl bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs transition-all flex items-center justify-center gap-1.5 cursor-pointer shadow-lg shadow-rose-600/30"
                >
                  <span>Selanjutnya</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}
        </section>
      </main>

      {/* POP-UP INFORMATION MODAL: PERBEDAAN HIRAGANA & KATAKANA */}
      {isInfoModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 backdrop-blur-md p-4 animate-fade-in">
          <div className="relative w-full max-w-2xl rounded-3xl bg-slate-900 border border-slate-800 p-6 sm:p-8 shadow-2xl overflow-y-auto max-h-[90vh]">
            {/* Modal Header */}
            <div className="flex items-center justify-between border-b border-slate-800 pb-4 mb-6">
              <div className="flex items-center gap-2.5">
                <div className="p-2.5 rounded-xl bg-rose-500/20 text-rose-400 border border-rose-500/30">
                  <HelpCircle className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white">
                    Memahami Perbedaan: Hiragana vs Katakana
                  </h3>
                  <p className="text-xs text-slate-400">
                    Panduan ringkas pemula untuk tahu kapan menggunakan masing-masing huruf
                  </p>
                </div>
              </div>

              <button
                onClick={() => setIsInfoModalOpen(false)}
                className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Comparison Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              {/* HIRAGANA CARD */}
              <div className="p-5 rounded-2xl bg-slate-950 border border-rose-500/30 relative overflow-hidden">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-2xl font-black text-rose-400 font-jp">あ 平仮名</span>
                  <span className="px-2.5 py-0.5 rounded-full bg-rose-500/20 text-rose-300 text-[11px] font-bold">
                    Asli Jepang
                  </span>
                </div>
                <h4 className="font-bold text-white text-sm mb-2">Hiragana (Huruf Dasar Utama)</h4>
                <p className="text-xs text-slate-300 leading-relaxed mb-3">
                  Huruf wajib pertama yang dipelajari. Memiliki bentuk <strong>mulus, melengkung, dan halus</strong> seperti kaligrafi kuas.
                </p>
                
                <div className="space-y-2 text-xs">
                  <div className="flex items-start gap-2 text-slate-300">
                    <CheckCircle2 className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                    <span><strong>Kata Asli Jepang:</strong> さくら (Sakura), ありがとう (Arigatou).</span>
                  </div>
                  <div className="flex items-start gap-2 text-slate-300">
                    <CheckCircle2 className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                    <span><strong>Partikel Tata Bahasa:</strong> は (wa), を (o), が (ga), に (ni).</span>
                  </div>
                  <div className="flex items-start gap-2 text-slate-300">
                    <CheckCircle2 className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                    <span><strong>Furigana:</strong> Cara baca di atas karakter Kanji.</span>
                  </div>
                </div>
              </div>

              {/* KATAKANA CARD */}
              <div className="p-5 rounded-2xl bg-slate-950 border border-sky-500/30 relative overflow-hidden">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-2xl font-black text-sky-400 font-jp">ア 片仮名</span>
                  <span className="px-2.5 py-0.5 rounded-full bg-sky-500/20 text-sky-300 text-[11px] font-bold">
                    Kata Serapan Asing
                  </span>
                </div>
                <h4 className="font-bold text-white text-sm mb-2">Katakana (Huruf Kata Serapan)</h4>
                <p className="text-xs text-slate-300 leading-relaxed mb-3">
                  Digunakan khusus untuk kata asing. Memiliki bentuk <strong>kaku, lurus, dan bersudut siku</strong>.
                </p>

                <div className="space-y-2 text-xs">
                  <div className="flex items-start gap-2 text-slate-300">
                    <CheckCircle2 className="w-4 h-4 text-sky-400 shrink-0 mt-0.5" />
                    <span><strong>Kata Serapan Asing:</strong> コーヒー (Kopi), カメラ (Kamera).</span>
                  </div>
                  <div className="flex items-start gap-2 text-slate-300">
                    <CheckCircle2 className="w-4 h-4 text-sky-400 shrink-0 mt-0.5" />
                    <span><strong>Nama Orang & Negara Luar:</strong> インドネシア (Indonesia), イルマン.</span>
                  </div>
                  <div className="flex items-start gap-2 text-slate-300">
                    <CheckCircle2 className="w-4 h-4 text-sky-400 shrink-0 mt-0.5" />
                    <span><strong>Onomatope & Komik:</strong> Efek suara komik (manga) & penekanan.</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Summary Rule Note */}
            <div className="p-4 rounded-2xl bg-gradient-to-r from-rose-950/40 to-slate-950 border border-slate-800 text-xs text-slate-300 mb-6">
              <span className="font-bold text-white block mb-1">💡 Trik Gampang Ingat:</span>
              <p className="leading-relaxed">
                Kalau kata tersebut <strong>asli buatan Jepang</strong> ➔ Pakai <strong>Hiragana</strong>.<br />
                Kalau kata tersebut <strong>diserap dari bahasa luar/Inggris atau nama asing</strong> ➔ Pakai <strong>Katakana</strong>.
              </p>
            </div>

            {/* Modal Close Button */}
            <div className="flex justify-end">
              <button
                onClick={() => setIsInfoModalOpen(false)}
                className="px-6 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs transition-all shadow-lg shadow-rose-600/30 cursor-pointer"
              >
                Paham! Tutup Informasi
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="relative z-10 border-t border-slate-800/80 py-8 text-center text-xs text-slate-400 bg-[#0b1120]/90">
        <p className="mb-1 font-semibold text-slate-300">
          Belajar Bahasa Jepang Dasar — Belajar Hiragana & Belajar Katakana (Latihan Menulis & Flashcard)
        </p>
        <p>© 2026 NihongoNol • Dibuat khusus untuk pemula yang mau belajar dari nol banget.</p>
      </footer>
    </div>
  );
}
