"use client";

import React, { useState, useEffect, useRef } from "react";
import confetti from "canvas-confetti";
import { useAuth, SignInButton, SignUpButton, UserButton } from "@clerk/nextjs";
import { PARTICLES_DATA, ALL_GRAMMAR_QUIZ_SETS, ParticleItem, GrammarQuizItem } from "../data/grammar";
import { KANJI_N5_DATA, KANJI_CATEGORIES, KANJI_QUIZ_QUESTIONS as KANJI_QUIZZES, KanjiItem, KanjiQuizItem } from "../data/kanji";
import { VOCABULARY_DATA, VOCAB_CATEGORIES, VOCAB_QUIZ_QUESTIONS as VOCAB_QUIZZES, VocabItem, VocabQuizItem } from "../data/vocabulary";



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

  // --- BUNYI TURUNAN (DAKUTEN & HANDAKUTEN) ---
  {
    id: "g",
    label: "Baris G (゛)",
    consonant: "G + Vokal",
    rowTip: "⚡ Bunyi Turunan: Baris K + Tenten (゛) ➔ Berubah jadi bunyi G (Ga, Gi, Gu, Ge, Go)!",
    items: [
      { kana: "が", romaji: "ga", example: "学校 (gakkou - Sekolah)", mnemonic: "🦘 [か Karate] + ゛ (Tenten) ➔ Pendekar Karate sabet Pedang Ganda" },
      { kana: "ぎ", romaji: "gi", example: "銀行 (ginkou - Bank)", mnemonic: "🔑 [き Gantungan Kunci] + ゛ (Tenten) ➔ Gantungan Kunci berkilat 2 petik" },
      { kana: "ぐ", romaji: "gu", example: "家具 (kagu - Mebel)", mnemonic: "🐊 [く Mulut Buaya] + ゛ (Tenten) ➔ Mulut Buaya tangkap 2 Gula" },
      { kana: "げ", romaji: "ge", example: "ゲーム (geemu - Game)", mnemonic: "🦵 [け Kaki] + ゛ (Tenten) ➔ Kaki melangkah Gagah bawa 2 petik" },
      { kana: "ご", romaji: "go", example: "ご飯 (gohan - Nasi)", mnemonic: "☕ [こ Cangkir Kopi] + ゛ (Tenten) ➔ Cangkir Kopi hangat dengan 2 uap panas" },
    ],
  },
  {
    id: "z",
    label: "Baris Z/J (゛)",
    consonant: "Z / J + Vokal",
    rowTip: "⚡ Bunyi Turunan: Baris S + Tenten (゛) ➔ Berubah jadi bunyi Z / J (Za, Ji, Zu, Ze, Zo)!",
    items: [
      { kana: "ざ", romaji: "za", example: "雑誌 (zasshi - Majalah)", mnemonic: "🧹 [さ Sapu Lidi] + ゛ (Tenten) ➔ Sapu Lidi sapu 2 Zarah debu" },
      { kana: "じ", romaji: "ji", example: "時間 (jikan - Waktu)", mnemonic: "🎣 [し Kail Pancing] + ゛ (Tenten) ➔ Kail Pancing Si Pitung dapat 2 Jaringan" },
      { kana: "ず", romaji: "zu", example: "地図 (chizu - Peta)", mnemonic: "🧋 [す Sedotan Boba] + ゛ (Tenten) ➔ Sedotan Boba tersumbat 2 Zakar boba" },
      { kana: "ぜ", romaji: "ze", example: "全部 (zenbu - Semua)", mnemonic: "🚴 [せ Sepeda] + ゛ (Tenten) ➔ Sepeda melaju Kencang lintasi 2 Zebra cross" },
      { kana: "ぞ", romaji: "zo", example: "掃除 (souji - Bersih-bersih)", mnemonic: "🥣 [そ Mangkuk Soto] + ゛ (Tenten) ➔ Mangkuk Soto hangat ada 2 Zaitun" },
    ],
  },
  {
    id: "d",
    label: "Baris D (゛)",
    consonant: "D + Vokal",
    rowTip: "⚡ Bunyi Turunan: Baris T + Tenten (゛) ➔ Berubah jadi bunyi D (Da, Ji, Zu, De, Do)!",
    items: [
      { kana: "だ", romaji: "da", example: "大学 (daigaku - Universitas)", mnemonic: "🔤 [た Huruf T+A] + ゛ (Tenten) ➔ Huruf T+A dengan 2 Dadu di atasnya" },
      { kana: "ぢ", romaji: "ji", example: "鼻血 (hanaji - Mimisan)", mnemonic: "🌶️ [ち Cabe Rawit] + ゛ (Tenten) ➔ Cabe Rawit pedas dengan 2 Jari pedas" },
      { kana: "づ", romaji: "zu", example: "三日月 (mikazuki - Bulan sabit)", mnemonic: "🌊 [つ Ombak Tsunami] + ゛ (Tenten) ➔ Ombak Tsunami bawa 2 Zirah laut" },
      { kana: "で", romaji: "de", example: "電車 (densha - Kereta)", mnemonic: "🖐️ [て Tapak Tangan] + ゛ (Tenten) ➔ Tapak Tangan memegang 2 Duit" },
      { kana: "ど", romaji: "do", example: "友達 (tomodachi - Teman)", mnemonic: "🦶 [と Jempol Kaki] + ゛ (Tenten) ➔ Jempol Kaki tertancap 2 Duri" },
    ],
  },
  {
    id: "b",
    label: "Baris B (゛)",
    consonant: "B + Vokal",
    rowTip: "⚡ Bunyi Turunan: Baris H + Tenten (゛) ➔ Berubah jadi bunyi B (Ba, Bi, Bu, Be, Bo)!",
    items: [
      { kana: "ば", romaji: "ba", example: "場所 (basho - Tempat)", mnemonic: "😄 [は Harpa / Ha-ha] + ゛ (Tenten) ➔ Harpa dimainkan sambil tertawa Ba-ba!" },
      { kana: "び", romaji: "bi", example: "病院 (byouin - Rumah sakit)", mnemonic: "😁 [ひ Senyum Hi-hi] + ゛ (Tenten) ➔ Senyum gigi lebar pamer 2 Bintang" },
      { kana: "ぶ", romaji: "bu", example: "豚肉 (butaniku - Daging babi)", mnemonic: "☁️ [ふ Tiup Fuuu] + ゛ (Tenten) ➔ Tiup Sup panas meletup 2 Busa" },
      { kana: "べ", romaji: "be", example: "勉強 (benkyou - Belajar)", mnemonic: "⛰️ [へ Atap Rumah] + ゛ (Tenten) ➔ Atap Rumah dihinggapi 2 Bebek" },
      { kana: "ぼ", romaji: "bo", example: "帽子 (boushi - Topi)", mnemonic: "🏒 [ほ Tongkat Hockey] + ゛ (Tenten) ➔ Tongkat Hockey pukul 2 Bola" },
    ],
  },
  {
    id: "p",
    label: "Baris P (゜)",
    consonant: "P + Vokal",
    rowTip: "⚡ Bunyi Turunan: Baris H + Maru (゜) ➔ Berubah jadi bunyi P (Pa, Pi, Pu, Pe, Po)!",
    items: [
      { kana: "ぱ", romaji: "pa", example: "パン (pan - Roti)", mnemonic: "😄 [は Harpa / Ha-ha] + ゜ (Maru) ➔ Harpa dengan gelembung bulat Pa-pa!" },
      { kana: "ぴ", romaji: "pi", example: "ピカピカ (pikapika - Berkiloan)", mnemonic: "😁 [ひ Senyum Hi-hi] + ゜ (Maru) ➔ Senyum lebar tiup 1 Peluit bulat" },
      { kana: "ぷ", romaji: "pu", example: "プール (puuru - Kolam renang)", mnemonic: "☁️ [ふ Tiup Fuuu] + ゜ (Maru) ➔ Tiup gelembung sabun bulat Puuu!" },
      { kana: "ぺ", romaji: "pe", example: "ペン (pen - Pulpen)", mnemonic: "⛰️ [へ Atap Rumah] + ゜ (Maru) ➔ Atap Rumah dipasang 1 Piringan parabola" },
      { kana: "ぽ", romaji: "po", example: "ポケット (poketto - Saku)", mnemonic: "🏒 [ほ Tongkat Hockey] + ゜ (Maru) ➔ Tongkat Hockey pukul 1 Pohon bulat" },
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

  // --- BUNYI TURUNAN (DAKUTEN & HANDAKUTEN) ---
  {
    id: "g",
    label: "Baris G (゛)",
    consonant: "G + Vokal",
    rowTip: "⚡ Bunyi Turunan: Baris K + Tenten (゛) ➔ Berubah jadi bunyi G (Ga, Gi, Gu, Ge, Go)!",
    items: [
      { kana: "ガ", romaji: "ga", example: "ガス (gasu - Gas)", mnemonic: "🦘 [カ Karate Katakana] + ゛ (Tenten) ➔ Gaya Karate Katakana sabet 2 Pedang Ganda" },
      { kana: "ギ", romaji: "gi", example: "ギター (gitaa - Gitar)", mnemonic: "🔑 [キ Gantungan Kunci] + ゛ (Tenten) ➔ Gantungan Kunci Katakana berkilat 2 petik" },
      { kana: "グ", romaji: "gu", example: "グループ (guruupu - Grup)", mnemonic: "🐊 [ク Mulut Kuau] + ゛ (Tenten) ➔ Mulut Kuau Katakana tangkap 2 Gula" },
      { kana: "ゲ", romaji: "ge", example: "ゲーム (geemu - Game)", mnemonic: "📐 [ケ Segitiga Kue] + ゛ (Tenten) ➔ Potongan Kue Katakana ada 2 Garnish" },
      { kana: "ゴ", romaji: "go", example: "ゴルフ (gorufu - Golf)", mnemonic: "📦 [コ Kotak Kopi] + ゛ (Tenten) ➔ Kotak Kardus Kopi Katakana ada 2 Gagang" },
    ],
  },
  {
    id: "z",
    label: "Baris Z/J (゛)",
    consonant: "Z / J + Vokal",
    rowTip: "⚡ Bunyi Turunan: Baris S + Tenten (゛) ➔ Berubah jadi bunyi Z / J (Za, Ji, Zu, Ze, Zo)!",
    items: [
      { kana: "ザ", romaji: "za", example: "デザイン (dezain - Desain)", mnemonic: "🥢 [サ Dua Sumpit] + ゛ (Tenten) ➔ Dua Sumpit Katakana angkat 2 Zakar makanan" },
      { kana: "ジ", romaji: "ji", example: "ジュース (juusu - Jus)", mnemonic: "⚓ [シ Senyum Shi] + ゛ (Tenten) ➔ Senyum Shi Katakana ditambah 2 Jari manis" },
      { kana: "ズ", romaji: "zu", example: "チーズ (chiizu - Keju)", mnemonic: "🦸 [ス Hanger Super] + ゛ (Tenten) ➔ Hanger baju Super Katakana bawa 2 Zipper" },
      { kana: "ゼ", romaji: "ze", example: "ゼロ (zero - Nol)", mnemonic: "🚴 [セ Sepeda Katakana] + ゛ (Tenten) ➔ Sepeda Katakana lintasi 2 Zebra cross" },
      { kana: "ゾ", romaji: "zo", example: "ゾーン (zoon - Zona)", mnemonic: "💧 [ソ Tetes Air So] + ゛ (Tenten) ➔ Tetes Air So Katakana jatuh dekat 2 Zaitun" },
    ],
  },
  {
    id: "d",
    label: "Baris D (゛)",
    consonant: "D + Vokal",
    rowTip: "⚡ Bunyi Turunan: Baris T + Tenten (゛) ➔ Berubah jadi bunyi D (Da, Ji, Zu, De, Do)!",
    items: [
      { kana: "ダ", romaji: "da", example: "ダンス (dansu - Dansa)", mnemonic: "🔤 [タ Taksi Senja] + ゛ (Tenten) ➔ Taksi Katakana bawa 2 Dadu" },
      { kana: "ヂ", romaji: "ji", example: "ヂ (ji - Jarang dipakai)", mnemonic: "🌶️ [チ Cheerleader] + ゛ (Tenten) ➔ Cheerleader Katakana sorak bawa 2 Jeruk" },
      { kana: "ヅ", romaji: "zu", example: "ヅ (zu - Jarang dipakai)", mnemonic: "🌊 [ツ 3 Tetes Tsunami] + ゛ (Tenten) ➔ Tetes Tsunami Katakana bawa 2 Zirah" },
      { kana: "デ", romaji: "de", example: "デパート (depaato - Mall)", mnemonic: "📡 [テ Antena TV] + ゛ (Tenten) ➔ Antena TV Katakana tangkap 2 Dekorasi" },
      { kana: "ド", romaji: "do", example: "ドア (doa - Pintu)", mnemonic: "🌲 [ト Batang Tomat] + ゛ (Tenten) ➔ Batang Tomat Katakana tumbuh 2 Duren" },
    ],
  },
  {
    id: "b",
    label: "Baris B (゛)",
    consonant: "B + Vokal",
    rowTip: "⚡ Bunyi Turunan: Baris H + Tenten (゛) ➔ Berubah jadi bunyi B (Ba, Bi, Bu, Be, Bo)!",
    items: [
      { kana: "バ", romaji: "ba", example: "バス (basu - Bus)", mnemonic: "👒 [ハ Topi Hamburger] + ゛ (Tenten) ➔ Topi Hamburger Katakana disaji dengan 2 Bakpao" },
      { kana: "ビ", romaji: "bi", example: "ビル (biru - Gedung)", mnemonic: "👠 [ヒ High Heels] + ゛ (Tenten) ➔ Sepatu High Heels Katakana ada 2 Bintang" },
      { kana: "ブ", romaji: "bu", example: "ブログ (burogu - Blog)", mnemonic: "🚩 [フ Bendera Fu] + ゛ (Tenten) ➔ Bendera Fu Katakana bertiup ke 2 Bus" },
      { kana: "ベ", romaji: "be", example: "ベッド (beddo - Kasur)", mnemonic: "⛰️ [ヘ Puncak Gunung] + ゛ (Tenten) ➔ Puncak Gunung Katakana ditiup 2 Bebek" },
      { kana: "ボ", romaji: "bo", example: "ボタン (botan - Tombol)", mnemonic: "✝️ [ホ Pohon Hotel] + ゛ (Tenten) ➔ Pohon Hotel Katakana dipasang 2 Bola lampu" },
    ],
  },
  {
    id: "p",
    label: "Baris P (゜)",
    consonant: "P + Vokal",
    rowTip: "⚡ Bunyi Turunan: Baris H + Maru (゜) ➔ Berubah jadi bunyi P (Pa, Pi, Pu, Pe, Po)!",
    items: [
      { kana: "パ", romaji: "pa", example: "パン (pan - Roti)", mnemonic: "👒 [ハ Topi Hamburger] + ゜ (Maru) ➔ Topi Hamburger Katakana dengan 1 Piring bulat" },
      { kana: "ピ", romaji: "pi", example: "ピアノ (piano - Piano)", mnemonic: "👠 [ヒ High Heels] + ゜ (Maru) ➔ Sepatu High Heels Katakana dengan 1 Peluit bulat" },
      { kana: "プ", romaji: "pu", example: "プール (puuru - Kolam renang)", mnemonic: "🚩 [フ Bendera Fu] + ゜ (Maru) ➔ Bendera Fu Katakana dengan 1 Pita bulat" },
      { kana: "ペ", romaji: "pe", example: "ペン (pen - Pulpen)", mnemonic: "⛰️ [ヘ Puncak Gunung] + ゜ (Maru) ➔ Atap Gunung Katakana ada 1 Parasut bulat" },
      { kana: "ポ", romaji: "po", example: "ポスト (posuto - Kotak pos)", mnemonic: "✝️ [ホ Pohon Hotel] + ゜ (Maru) ➔ Pohon Hotel Katakana berbuah 1 Pomelo bulat" },
    ],
  },


];

export default function WelcomePage() {
  const { isSignedIn, isLoaded } = useAuth();

  // Course Selector State
  const [selectedCourseId, setSelectedCourseId] = useState<"kana" | "grammar" | "kanji" | "vocab">("kana");

  // Vocabulary Course State
  const [vocabCategory, setVocabCategory] = useState<string>("all");
  const [activeVocab, setActiveVocab] = useState<VocabItem | null>(null);
  const [vocabViewMode, setVocabViewMode] = useState<"grid" | "flashcard" | "write" | "quiz">("grid");
  const [vocabCardIndex, setVocabCardIndex] = useState<number>(0);
  const [isVocabFlipped, setIsVocabFlipped] = useState<boolean>(false);
  const [vocabQuizIndex, setVocabQuizIndex] = useState<number>(0);
  const [vocabQuizSelectedOption, setVocabQuizSelectedOption] = useState<string | null>(null);
  const [vocabQuizScore, setVocabQuizScore] = useState<number>(0);
  const [vocabQuizIsAnswered, setVocabQuizIsAnswered] = useState<boolean>(false);

  const [activeScript, setActiveScript] = useState<"hiragana" | "katakana">("hiragana");
  const [selectedRowId, setSelectedRowId] = useState<string>("vowel");
  const [viewMode, setViewMode] = useState<"grid" | "flashcard">("grid");
  const [cardIndex, setCardIndex] = useState<number>(0);
  const [isCardFlipped, setIsCardFlipped] = useState<boolean>(false);
  const [flashcardMode, setFlashcardMode] = useState<"learn" | "quiz" | "write">("learn");
  const [streak, setStreak] = useState<number>(1);
  const [audioPlaying, setAudioPlaying] = useState<string | null>(null);
  const [activeMnemonic, setActiveMnemonic] = useState<KanaItem | null>(null);

  // Grammar & Particle Course State (3-Set Progressive System)
  const [activeParticleId, setActiveParticleId] = useState<string>("wa");
  const [grammarView, setGrammarView] = useState<"particles" | "quiz">("particles");
  const [activeQuizSet, setActiveQuizSet] = useState<1 | 2 | 3>(1);
  const [setScores, setSetScores] = useState<{ 1: number; 2: number; 3: number }>({ 1: 0, 2: 0, 3: 0 });
  const [quizIndex, setQuizIndex] = useState<number>(0);
  const [quizSelectedOption, setQuizSelectedOption] = useState<string | null>(null);
  const [quizIsAnswered, setQuizIsAnswered] = useState<boolean>(false);

  // Kanji Course State
  const [kanjiCategory, setKanjiCategory] = useState<string>("all");
  const [activeKanji, setActiveKanji] = useState<KanjiItem | null>(null);
  const [kanjiViewMode, setKanjiViewMode] = useState<"grid" | "flashcard" | "write" | "quiz">("grid");
  const [kanjiCardIndex, setKanjiCardIndex] = useState<number>(0);
  const [isKanjiFlipped, setIsKanjiFlipped] = useState<boolean>(false);
  const [kanjiQuizIndex, setKanjiQuizIndex] = useState<number>(0);
  const [kanjiQuizSelectedOption, setKanjiQuizSelectedOption] = useState<string | null>(null);
  const [kanjiQuizScore, setKanjiQuizScore] = useState<number>(0);
  const [kanjiQuizIsAnswered, setKanjiQuizIsAnswered] = useState<boolean>(false);


  // Helper to start or reset a quiz set session
  const startQuizSet = (setNum: 1 | 2 | 3) => {
    setActiveQuizSet(setNum);
    setQuizIndex(0);
    setQuizSelectedOption(null);
    setQuizIsAnswered(false);
  };

  const startNewQuizSession = () => {
    setSetScores({ 1: 0, 2: 0, 3: 0 });
    startQuizSet(1);
  };




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

  // Reset Canvas when changing card, script, mode, or kanji
  useEffect(() => {
    if (flashcardMode === "write" || kanjiViewMode === "write") {
      clearCanvas();
    }
  }, [cardIndex, selectedRowId, activeScript, flashcardMode, kanjiCardIndex, kanjiViewMode]);


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
            {isLoaded && isSignedIn && (
              <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-800/90 border border-slate-700 text-xs text-slate-300 shadow-sm">
                <Flame className="w-4 h-4 text-amber-400 fill-amber-400" />
                <span>Streak: <strong className="text-amber-400">{streak} Hari</strong></span>
              </div>
            )}

            {isLoaded && !isSignedIn && (
              <div className="flex items-center gap-2">
                <SignInButton mode="modal">
                  <button className="px-3.5 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-white text-xs font-bold transition-all cursor-pointer">
                    Masuk
                  </button>
                </SignInButton>
                <SignUpButton mode="modal">
                  <button className="px-3.5 py-1.5 rounded-xl bg-rose-600 hover:bg-rose-500 text-white text-xs font-bold transition-all shadow-md shadow-rose-600/20 cursor-pointer">
                    Daftar
                  </button>
                </SignUpButton>
              </div>
            )}



            {isLoaded && isSignedIn && (
              <UserButton
                appearance={{
                  elements: {
                    avatarBox: "w-8 h-8 rounded-full border border-rose-500/40",
                  },
                }}
              />
            )}


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

        {/* Main Required CTA Button - ONLY VISIBLE WHEN SIGNED IN */}
        {isLoaded && isSignedIn && (
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
        )}





        {/* EKSPLOR LEARNING SECTION - PROTECTED FOR SIGNED-IN USERS */}
        {isLoaded && !isSignedIn ? (
          <div 
            id="interactive-playground"
            className="w-full max-w-4xl rounded-3xl bg-slate-900/80 border border-slate-800/90 p-8 sm:p-12 backdrop-blur-xl shadow-2xl text-center flex flex-col items-center justify-center"
          >
            <div className="w-16 h-16 rounded-2xl bg-rose-500/10 border border-rose-500/30 flex items-center justify-center text-rose-400 mb-4 shadow-lg shadow-rose-500/10">
              <Sparkles className="w-8 h-8 text-rose-400" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-2">
              Modul Pembelajaran Terkunci 🔒
            </h3>
            <p className="text-slate-400 text-sm max-w-md mb-8 leading-relaxed">
              Daftar atau masuk ke akun kamu sekarang untuk membuka seluruh modul interaktif Hiragana, Katakana, Flashcard, Audio Pelafalan, dan Latihan Menulis!
            </p>
            <div className="flex items-center gap-3.5">
              <SignInButton mode="modal">
                <button className="px-6 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-white font-bold text-sm transition-all cursor-pointer">
                  Masuk
                </button>
              </SignInButton>
              <SignUpButton mode="modal">
                <button className="px-6 py-3 rounded-xl bg-gradient-to-r from-rose-500 to-rose-600 hover:from-rose-600 hover:to-rose-700 text-white font-bold text-sm shadow-lg shadow-rose-500/20 transition-all cursor-pointer">
                  Daftar Gratis
                </button>
              </SignUpButton>
            </div>
          </div>
        ) : (
          <section 
            id="interactive-playground"
            className="w-full max-w-4xl rounded-3xl bg-slate-900/80 border border-slate-800/90 p-6 sm:p-8 backdrop-blur-xl shadow-2xl text-left"
          >

          {/* TOP COURSE NAVIGATION HUB - SEPARATE COURSES */}
          <div className="mb-8 border-b border-slate-800 pb-6">
            <div className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3 flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-rose-400" />
              <span>Pilih Kelas Pembelajaran:</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              {/* COURSE CARD 1: KANA MASTER */}
              <div
                onClick={() => setSelectedCourseId("kana")}
                className={`p-4 rounded-2xl border transition-all cursor-pointer flex items-center justify-between group ${
                  selectedCourseId === "kana"
                    ? "bg-gradient-to-r from-rose-950/80 via-slate-900 to-slate-900 border-rose-500/80 shadow-xl shadow-rose-950/30 scale-[1.01]"
                    : "bg-slate-950/60 hover:bg-slate-950 border-slate-800/90 text-slate-400 hover:border-slate-700"
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-bold text-lg font-jp border transition-all shrink-0 ${
                    selectedCourseId === "kana"
                      ? "bg-gradient-to-br from-rose-500 to-rose-700 text-white border-rose-400 shadow-lg shadow-rose-500/30"
                      : "bg-slate-800 text-slate-400 border-slate-700"
                  }`}>
                    あ
                  </div>
                  <div className="text-left">
                    <span className="text-[9px] font-bold px-2 py-0.5 rounded-full bg-rose-500/20 text-rose-300 border border-rose-500/30 mb-0.5 inline-block">
                      Kelas 1 • Huruf Dasar
                    </span>
                    <h3 className="font-extrabold text-white text-xs sm:text-sm leading-snug">
                      Hiragana & Katakana
                    </h3>
                    <p className="text-[10px] text-slate-400">
                      Hafal 92 Huruf & Latihan Menulis
                    </p>
                  </div>
                </div>
              </div>

              {/* COURSE CARD 2: GRAMMAR & PARTICLES */}
              <div
                onClick={() => setSelectedCourseId("grammar")}
                className={`p-4 rounded-2xl border transition-all cursor-pointer flex items-center justify-between group ${
                  selectedCourseId === "grammar"
                    ? "bg-gradient-to-r from-rose-950/80 via-slate-900 to-slate-900 border-rose-500/80 shadow-xl shadow-rose-950/30 scale-[1.01]"
                    : "bg-slate-950/60 hover:bg-slate-950 border-slate-800/90 text-slate-400 hover:border-slate-700"
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-bold text-lg font-jp border transition-all shrink-0 ${
                    selectedCourseId === "grammar"
                      ? "bg-gradient-to-br from-rose-500 to-rose-700 text-white border-rose-400 shadow-lg shadow-rose-500/30"
                      : "bg-slate-800 text-slate-400 border-slate-700"
                  }`}>
                    は
                  </div>
                  <div className="text-left">
                    <span className="text-[9px] font-bold px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30 mb-0.5 inline-block">
                      Kelas 2 • Pola Kalimat
                    </span>

                    <h3 className="font-extrabold text-white text-xs sm:text-sm leading-snug">
                      Partikel & Tata Bahasa
                    </h3>
                    <p className="text-[10px] text-slate-400">
                      Struktur Kalimat & 3-Set Kuis
                    </p>
                  </div>
                </div>
              </div>

              {/* COURSE CARD 3: KANJI PEMULA */}
              <div
                onClick={() => setSelectedCourseId("kanji")}
                className={`p-4 rounded-2xl border transition-all cursor-pointer flex items-center justify-between group ${
                  selectedCourseId === "kanji"
                    ? "bg-gradient-to-r from-rose-950/80 via-slate-900 to-slate-900 border-rose-500/80 shadow-xl shadow-rose-950/30 scale-[1.01]"
                    : "bg-slate-950/60 hover:bg-slate-950 border-slate-800/90 text-slate-400 hover:border-slate-700"
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-bold text-lg font-jp border transition-all shrink-0 ${
                    selectedCourseId === "kanji"
                      ? "bg-gradient-to-br from-rose-500 to-rose-700 text-white border-rose-400 shadow-lg shadow-rose-500/30"
                      : "bg-slate-800 text-slate-400 border-slate-700"
                  }`}>
                    日
                  </div>
                  <div className="text-left">
                    <span className="text-[9px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 mb-0.5 inline-block">
                      Kelas 3 • Karakter Kanji
                    </span>
                    <h3 className="font-extrabold text-white text-xs sm:text-sm leading-snug">
                      Kanji Dasar Pemula
                    </h3>
                    <p className="text-[10px] text-slate-400">
                      Cara Baca, Arti & Contoh Kata
                    </p>
                  </div>
                </div>
              </div>

              {/* COURSE CARD 4: KOSAKATA VITAL */}
              <div
                onClick={() => setSelectedCourseId("vocab")}
                className={`p-4 rounded-2xl border transition-all cursor-pointer flex items-center justify-between group ${
                  selectedCourseId === "vocab"
                    ? "bg-gradient-to-r from-rose-950/80 via-slate-900 to-slate-900 border-rose-500/80 shadow-xl shadow-rose-950/30 scale-[1.01]"
                    : "bg-slate-950/60 hover:bg-slate-950 border-slate-800/90 text-slate-400 hover:border-slate-700"
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-bold text-lg font-jp border transition-all shrink-0 ${
                    selectedCourseId === "vocab"
                      ? "bg-gradient-to-br from-rose-500 to-rose-700 text-white border-rose-400 shadow-lg shadow-rose-500/30"
                      : "bg-slate-800 text-slate-400 border-slate-700"
                  }`}>
                    語
                  </div>
                  <div className="text-left">
                    <span className="text-[9px] font-bold px-2 py-0.5 rounded-full bg-sky-500/20 text-sky-300 border border-sky-500/30 mb-0.5 inline-block">
                      Kelas 4 • Kosakata Vital
                    </span>
                    <h3 className="font-extrabold text-white text-xs sm:text-sm leading-snug">
                      Kosakata Sehari-Hari
                    </h3>
                    <p className="text-[10px] text-slate-400">
                      100+ Kata, Topik & Contoh Kalimat
                    </p>
                  </div>
                </div>
              </div>
            </div>




          </div>

          {/* TOP CURRICULUM ROADMAP BANNER */}
          <div className="mb-8 p-5 rounded-2xl bg-gradient-to-r from-slate-950 via-slate-900 to-slate-950 border border-slate-800 shadow-xl">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-slate-800 pb-3.5 mb-3.5">
              <div className="flex items-center gap-2 text-xs font-extrabold text-white">
                <span className="p-1.5 rounded-lg bg-rose-500/20 text-rose-400 border border-rose-500/30">📍</span>
                <span>Alur Kurikulum & Roadmap Pembelajaran:</span>
              </div>
              
              {/* Stepper Progress Badges */}
              <div className="flex flex-wrap items-center gap-1.5 text-[11px] font-bold">
                <button
                  onClick={() => setSelectedCourseId("kana")}
                  className={`px-3 py-1 rounded-xl transition-all cursor-pointer flex items-center gap-1.5 ${
                    selectedCourseId === "kana"
                      ? "bg-rose-600 text-white shadow-md shadow-rose-600/30 font-extrabold"
                      : "bg-slate-950 text-slate-400 hover:text-white border border-slate-800"
                  }`}
                >
                  <span>1. Huruf Dasar</span>
                </button>
                <ChevronRight className="w-3.5 h-3.5 text-slate-600" />
                <button
                  onClick={() => setSelectedCourseId("grammar")}
                  className={`px-3 py-1 rounded-xl transition-all cursor-pointer flex items-center gap-1.5 ${
                    selectedCourseId === "grammar"
                      ? "bg-amber-600 text-white shadow-md shadow-amber-600/30 font-extrabold"
                      : "bg-slate-950 text-slate-400 hover:text-white border border-slate-800"
                  }`}
                >
                  <span>2. Pola Kalimat</span>
                </button>
                <ChevronRight className="w-3.5 h-3.5 text-slate-600" />
                <button
                  onClick={() => setSelectedCourseId("kanji")}
                  className={`px-3 py-1 rounded-xl transition-all cursor-pointer flex items-center gap-1.5 ${
                    selectedCourseId === "kanji"
                      ? "bg-emerald-600 text-white shadow-md shadow-emerald-600/30 font-extrabold"
                      : "bg-slate-950 text-slate-400 hover:text-white border border-slate-800"
                  }`}
                >
                  <span>3. Kanji Pemula</span>
                </button>
                <ChevronRight className="w-3.5 h-3.5 text-slate-600" />
                <button
                  onClick={() => setSelectedCourseId("vocab")}
                  className={`px-3 py-1 rounded-xl transition-all cursor-pointer flex items-center gap-1.5 ${
                    selectedCourseId === "vocab"
                      ? "bg-sky-600 text-white shadow-md shadow-sky-600/30 font-extrabold"
                      : "bg-slate-950 text-slate-400 hover:text-white border border-slate-800"
                  }`}
                >
                  <span>4. Kosakata</span>
                </button>
              </div>
            </div>

            {/* Class-Specific Explanation Note */}
            {selectedCourseId === "kana" && (
              <div className="text-xs text-slate-300 space-y-1.5 animate-fade-in">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-rose-300">💡 Mengapa Kelas 1 Dipelajari Pertama?</span>
                  <span className="text-[10px] font-semibold text-rose-400 bg-rose-500/10 px-2 py-0.5 rounded-md border border-rose-500/20">Target: Hafal 46 Hiragana & 46 Katakana</span>
                </div>
                <p className="text-[11px] text-slate-400 leading-relaxed">
                  Bahasa Jepang tidak memakai abjad Latin (A-Z). Hiragana & Katakana adalah <strong>fondasi utama membaca bunyi</strong>.
                  Di <strong className="text-amber-300">Kelas 2</strong> (Partikel) dan <strong className="text-emerald-300">Kelas 3</strong> (Kanji), seluruh contoh partikel dan bacaan Kanji ditulis memakai Hiragana.
                </p>
              </div>
            )}

            {selectedCourseId === "grammar" && (
              <div className="text-xs text-slate-300 space-y-1.5 animate-fade-in">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-amber-300">💡 Mengapa Kelas 2 Dipelajari Kedua?</span>
                  <span className="text-[10px] font-semibold text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded-md border border-amber-500/20">Target: 10 Partikel Vital & Formasi SOV</span>
                </div>
                <p className="text-[11px] text-slate-400 leading-relaxed">
                  Setelah bisa membaca huruf (Kelas 1), kamu belajar <strong>merangkai kata menjadi kalimat dengan aturan SOV & Partikel</strong>.
                  Ilmu tata bahasa kelas ini menyiapkan <em>"slot tempat kata"</em> yang nantinya diisi oleh Kanji dari <strong className="text-emerald-300">Kelas 3</strong> dan Kosakata dari <strong className="text-sky-300">Kelas 4</strong>.
                </p>
              </div>
            )}

            {selectedCourseId === "kanji" && (
              <div className="text-xs text-slate-300 space-y-1.5 animate-fade-in">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-emerald-300">💡 Mengapa Kelas 3 Dipelajari Ketiga?</span>
                  <span className="text-[10px] font-semibold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-md border border-emerald-500/20">Target: Hafal 30 Kanji Dasar & Kosakata</span>
                </div>
                <p className="text-[11px] text-slate-400 leading-relaxed">
                  Kanji adalah <strong>simbol bergambar penyingkat kata</strong>.
                  Di kelas ini, kamu membaca bunyi Kanji memakai Hiragana (<strong className="text-rose-300">Kelas 1</strong>) dan memasukkannya ke dalam rumus kalimat SOV (<strong className="text-amber-300">Kelas 2</strong>).
                </p>
              </div>
            )}

            {selectedCourseId === "vocab" && (
              <div className="text-xs text-slate-300 space-y-1.5 animate-fade-in">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-sky-300">💡 Mengapa Kelas 4 Dipelajari Keempat?</span>
                  <span className="text-[10px] font-semibold text-sky-400 bg-sky-500/10 px-2 py-0.5 rounded-md border border-sky-500/20">Target: 100+ Kotoba Vital & Contoh Kalimat</span>
                </div>
                <p className="text-[11px] text-slate-400 leading-relaxed">
                  Setelah hafal huruf (<strong className="text-rose-300">Kelas 1</strong>), tata bahasa (<strong className="text-amber-300">Kelas 2</strong>), dan Kanji (<strong className="text-emerald-300">Kelas 3</strong>), kamu memperkaya <strong>perbendaharaan kata (vocabulary)</strong> untuk menyusun berbagai variasi kalimat sehari-hari secara fleksibel.
                </p>
              </div>
            )}

          </div>

          {/* COURSE 1: KANA MASTER LEARNING INTERFACE */}
          {selectedCourseId === "kana" && (
            <div>



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

          {/* Header Module Title */}
          <div className="border-b border-slate-800 pb-6 mb-6">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
              {activeScript === "hiragana" ? "Belajar Hiragana" : "Belajar Katakana"}
            </h2>

            <p className="text-xs text-slate-400 mt-1">
              {activeScript === "hiragana" 
                ? "Huruf asli Jepang untuk kata lokal & partikel tata bahasa" 
                : "Huruf Jepang untuk kata serapan asing & nama luar negeri"}
            </p>
          </div>


          {/* DEDICATED SCRIPT FUNCTION BREAKDOWN CARD (HIRAGANA vs KATAKANA) */}
          {activeScript === "hiragana" ? (
            <div className="p-5 rounded-2xl bg-gradient-to-r from-rose-950/60 via-slate-950 to-slate-950 border border-rose-500/30 mb-6 text-xs space-y-3 animate-fade-in shadow-lg">
              <div className="flex items-center justify-between border-b border-slate-800/80 pb-2.5">
                <div className="flex items-center gap-2">
                  <span className="font-extrabold text-white text-base font-jp">あ 平仮名</span>
                  <span className="px-2.5 py-0.5 rounded-full bg-rose-500/20 text-rose-300 border border-rose-500/30 font-bold text-[10px]">
                    Huruf Asli Jepang
                  </span>
                </div>
                <span className="text-[11px] text-slate-400">Bentuk: Mulus, melengkung & halus seperti kaligrafi kuas</span>
              </div>
              
              <p className="text-slate-300 leading-relaxed">
                <strong>Hiragana (Huruf Dasar Utama)</strong> adalah huruf wajib pertama yang dipelajari. Digunakan khusus untuk menulis kata-kata asli buatan Jepang, partikel tata bahasa, dan cara baca Kanji (*Furigana*).
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 pt-1 text-[11px]">
                <div className="p-3 rounded-xl bg-slate-900/90 border border-slate-800 text-slate-300">
                  <strong className="text-rose-400 block mb-0.5">🌸 Kata Asli Jepang:</strong>
                  <span>さくら (Sakura), ありがとう (Arigatou)</span>
                </div>
                <div className="p-3 rounded-xl bg-slate-900/90 border border-slate-800 text-slate-300">
                  <strong className="text-rose-400 block mb-0.5">⚙️ Partikel Tata Bahasa:</strong>
                  <span>は (wa), を (o), が (ga), に (ni)</span>
                </div>
                <div className="p-3 rounded-xl bg-slate-900/90 border border-slate-800 text-slate-300">
                  <strong className="text-rose-400 block mb-0.5">📖 Furigana (Cara Baca):</strong>
                  <span>Bantuan cara baca di atas huruf Kanji</span>
                </div>
              </div>
            </div>
          ) : (
            <div className="p-5 rounded-2xl bg-gradient-to-r from-sky-950/60 via-slate-950 to-slate-950 border border-sky-500/30 mb-6 text-xs space-y-3 animate-fade-in shadow-lg">
              <div className="flex items-center justify-between border-b border-slate-800/80 pb-2.5">
                <div className="flex items-center gap-2">
                  <span className="font-extrabold text-white text-base font-jp">ア 片仮名</span>
                  <span className="px-2.5 py-0.5 rounded-full bg-sky-500/20 text-sky-300 border border-sky-500/30 font-bold text-[10px]">
                    Huruf Kata Serapan Asing
                  </span>
                </div>
                <span className="text-[11px] text-slate-400">Bentuk: Kaku, lurus, dan bersudut siku tajam</span>
              </div>
              
              <p className="text-slate-300 leading-relaxed">
                <strong>Katakana (Huruf Kata Serapan)</strong> digunakan khusus untuk menulis kata serapan asing (terutama Bahasa Inggris), nama orang/negara luar negeri, serta penekanan suara dalam komik (onomatope).
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 pt-1 text-[11px]">
                <div className="p-3 rounded-xl bg-slate-900/90 border border-slate-800 text-slate-300">
                  <strong className="text-sky-400 block mb-0.5">☕ Kata Serapan Asing:</strong>
                  <span>コーヒー (Kopi), カメラ (Kamera)</span>
                </div>
                <div className="p-3 rounded-xl bg-slate-900/90 border border-slate-800 text-slate-300">
                  <strong className="text-sky-400 block mb-0.5">🌏 Nama Orang & Negara:</strong>
                  <span>インドネシア (Indonesia), イルマン</span>
                </div>
                <div className="p-3 rounded-xl bg-slate-900/90 border border-slate-800 text-slate-300">
                  <strong className="text-sky-400 block mb-0.5">💥 Onomatope & Komik:</strong>
                  <span>Efek suara komik (manga) & penekanan</span>
                </div>
              </div>
            </div>
          )}


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

          {/* DAKUTEN & HANDAKUTEN SOUND MODIFICATION CARD (TENTEN & MARU) */}
          <div className="p-5 sm:p-6 rounded-2xl bg-gradient-to-br from-slate-950 via-slate-900 to-amber-950/30 border border-amber-500/20 mb-8 shadow-inner text-left">
            <div className="flex items-start gap-4">
              <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-400 shrink-0 mt-0.5">
                <Sparkles className="w-6 h-6" />
              </div>
              <div className="space-y-3 text-xs sm:text-sm text-slate-300 leading-relaxed w-full">
                <h4 className="font-extrabold text-white text-base">
                  ⚡ Rahasia Perubahan Bunyi: Petik Dua Tenten (゛) & Lingkaran Maru (゜)
                </h4>
                <p>
                  Mengapa ada bunyi <strong>G, Z, D, B, P</strong> padahal huruf dasar hanya K, S, T, N, H? Di Bahasa Jepang, bunyi tersebut dibuat dengan menambahkan <strong>Tenten (`゛`)</strong> atau <strong>Maru (`゜`)</strong> di kanan atas huruf dasar:
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs pt-1">
                  {/* Tenten Section */}
                  <div className="p-3.5 rounded-xl bg-slate-950/90 border border-slate-800 space-y-2">
                    <strong className="text-amber-400 block font-bold">
                      1. Petik Dua Tenten (`゛`) ➔ Merubah Bunyi Tebal (Dakuten):
                    </strong>
                    <ul className="space-y-1 font-mono text-slate-300">
                      <li>• Baris <strong>K</strong> + `゛` ➔ <strong>G</strong> ({activeScript === "hiragana" ? "か➔が (Ga), こ➔ご (Go)" : "カ➔ガ (Ga), コ➔ゴ (Go)"})</li>
                      <li>• Baris <strong>S</strong> + `゛` ➔ <strong>Z / J</strong> ({activeScript === "hiragana" ? "さ➔ざ (Za), し➔じ (Ji)" : "サ➔ザ (Za), シ➔ジ (Ji)"})</li>
                      <li>• Baris <strong>T</strong> + `゛` ➔ <strong>D</strong> ({activeScript === "hiragana" ? "た➔だ (Da), て➔で (De)" : "タ➔ダ (Da), テ➔デ (De)"})</li>
                      <li>• Baris <strong>H</strong> + `゛` ➔ <strong>B</strong> ({activeScript === "hiragana" ? "は➔ば (Ba), ほ➔ぼ (Bo)" : "ハ➔バ (Ba), ホ➔ボ (Bo)"})</li>
                    </ul>
                  </div>

                  {/* Maru Section */}
                  <div className="p-3.5 rounded-xl bg-slate-950/90 border border-slate-800 space-y-2">
                    <strong className="text-amber-400 block font-bold">
                      2. Lingkaran Maru (`゜`) ➔ Merubah Jadi Bunyi P (Handakuten):
                    </strong>
                    <ul className="space-y-1 font-mono text-slate-300">
                      <li>• Baris <strong>H</strong> + `゜` ➔ <strong>P</strong> ({activeScript === "hiragana" ? "は➔ぱ (Pa), ひ➔ぴ (Pi), ふ➔ぷ (Pu)" : "ハ➔パ (Pa), ヒ➔ピ (Pi), フ➔プ (Pu)"})</li>
                    </ul>
                    <div className="p-2 rounded-lg bg-amber-500/10 border border-amber-500/20 text-[11px] text-amber-200 mt-2">
                      💡 <strong>Contoh Kata:</strong> <code className="text-white font-jp">ごはん</code> (Gohan) = <code className="text-amber-300 font-jp">こ</code> (Ko) + `゛` ➔ <code className="text-white font-jp">ご</code> (Go) + <code className="text-white font-jp">はん</code>.
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>


          {/* Unified 4-Tab Navigation Bar (Placed After Prinsip Utama Section) */}
          <div className="flex items-center justify-center mb-8">
            <div className="flex flex-wrap items-center justify-center bg-slate-950 p-1.5 rounded-2xl border border-slate-800 text-xs font-bold gap-1.5 shadow-inner">
              <button
                onClick={() => {
                  setViewMode("grid");
                  setIsCardFlipped(false);
                }}
                className={`px-4 py-2.5 rounded-xl transition-all cursor-pointer flex items-center gap-2 ${
                  viewMode === "grid"
                    ? "bg-rose-600 text-white shadow-md shadow-rose-600/30 font-extrabold"
                    : "text-slate-400 hover:text-white"
                }`}
              >
                <Grid className="w-4 h-4" />
                <span>Tabel Grid</span>
              </button>

              <button
                onClick={() => {
                  setViewMode("flashcard");
                  setFlashcardMode("learn");
                  setCardIndex(0);
                  setIsCardFlipped(false);
                }}
                className={`px-4 py-2.5 rounded-xl transition-all cursor-pointer flex items-center gap-2 ${
                  viewMode === "flashcard" && flashcardMode === "learn"
                    ? "bg-rose-600 text-white shadow-md shadow-rose-600/30 font-extrabold"
                    : "text-slate-400 hover:text-white"
                }`}
              >
                <BookOpen className="w-4 h-4" />
                <span>Mode Fokus</span>
              </button>

              <button
                onClick={() => {
                  setViewMode("flashcard");
                  setFlashcardMode("write");
                  setCardIndex(0);
                  setIsCardFlipped(false);
                }}
                className={`px-4 py-2.5 rounded-xl transition-all cursor-pointer flex items-center gap-2 ${
                  viewMode === "flashcard" && flashcardMode === "write"
                    ? "bg-rose-600 text-white shadow-md shadow-rose-600/30 font-extrabold"
                    : "text-slate-400 hover:text-white"
                }`}
              >
                <PenTool className="w-4 h-4" />
                <span>Latihan Menulis</span>
              </button>

              <button
                onClick={() => {
                  setViewMode("flashcard");
                  setFlashcardMode("quiz");
                  setCardIndex(0);
                  setIsCardFlipped(false);
                }}
                className={`px-4 py-2.5 rounded-xl transition-all cursor-pointer flex items-center gap-2 ${
                  viewMode === "flashcard" && flashcardMode === "quiz"
                    ? "bg-rose-600 text-white shadow-md shadow-rose-600/30 font-extrabold"
                    : "text-slate-400 hover:text-white"
                }`}
              >
                <RotateCcw className="w-4 h-4" />
                <span>Uji Hafalan</span>
              </button>

            </div>
          </div>


          {/* Row Filter Selector */}
          <div className="mb-6 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-2.5">
              <label className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                <Layers className="w-4 h-4 text-rose-400" />{" "}
                Pilih Baris Huruf (Tabel 5x10 & Bunyi Turunan):
              </label>
              <button
                onClick={() => {
                  setSelectedRowId("all");
                  setCardIndex(0);
                  setIsCardFlipped(false);
                }}
                className={`text-xs px-3 py-1 rounded-lg border font-medium transition-all cursor-pointer ${
                  isShowAll
                    ? "bg-rose-500 text-white border-rose-400 shadow-md shadow-rose-500/30"
                    : "bg-slate-950 text-slate-400 border-slate-800 hover:text-white"
                }`}
              >
                Tampilkan Semua Tabel
              </button>
            </div>

            <div className="space-y-3">
              {/* Row Selector Group 1: Basic Rows (46 Huruf) */}
              <div className="space-y-1.5 text-left">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                  1. Huruf Dasar (46 Huruf Utama):
                </span>
                <div className="flex flex-wrap gap-2">
                  {CURRENT_GRID.filter((r) => !["g", "z", "d", "b", "p"].includes(r.id)).map((row) => {
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

              {/* Row Selector Group 2: Modified Rows (Dakuten/Handakuten 25 Huruf) */}
              <div className="space-y-1.5 pt-3 border-t border-slate-800/60 text-left">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-[10px] font-bold text-amber-300 uppercase tracking-wider block">
                    2. Bunyi Turunan (Tenten ゛ & Maru ゜):
                  </span>
                  <span className="px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30 text-[9px] font-bold">
                    Perubahan Bunyi
                  </span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {CURRENT_GRID.filter((r) => ["g", "z", "d", "b", "p"].includes(r.id)).map((row) => {
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
                            ? "bg-amber-600 text-white border-amber-500 shadow-md shadow-amber-600/30 scale-105"
                            : "bg-slate-950/70 border-amber-500/30 text-amber-300 hover:border-amber-500 hover:bg-amber-950/40"
                        }`}
                      >
                        {row.label}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>


          {/* MODE 1: GRID VIEW (5x10) */}
          {viewMode === "grid" && (
            <div className="space-y-6">
              {/* Active Clicked Mnemonic Spotlight Card */}
              {activeMnemonic && (
                <div id="kana-spotlight" className="p-5 rounded-2xl bg-gradient-to-r from-rose-950/60 to-slate-900 border border-rose-500/40 mb-6 flex items-center justify-between gap-4 animate-fade-in shadow-xl">

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
                          onClick={() => {
                            setActiveMnemonic(item);
                            speakJapanese(item);
                            setTimeout(() => {
                              document.getElementById("kana-spotlight")?.scrollIntoView({ behavior: "smooth", block: "nearest" });
                            }, 50);
                          }}

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
          </div>
          )}

          {/* COURSE 2: GRAMMAR & PARTICLE LEARNING INTERFACE */}
          {selectedCourseId === "grammar" && (
            <div className="space-y-8 animate-fade-in">
              {/* Grammar Course Header */}
              <div className="border-b border-slate-800 pb-6">
                <div className="text-center max-w-2xl mx-auto space-y-2 mb-6">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30 text-xs font-bold">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Kelas 2 • Partikel & Tata Bahasa (Bunpou)</span>
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
                    10 Partikel Vital & Formasi Kalimat Pemula
                  </h2>
                  <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                    Panduan praktis menguasai struktur kalimat dasar Bahasa Jepang (SOV) dan fungsi partikel penting secara bertahap.
                  </p>
                </div>

                {/* Centered Tab Switcher: Peta Partikel vs Kuis Partikel */}
                <div className="flex items-center justify-center">
                  <div className="flex items-center bg-slate-950 p-1.5 rounded-2xl border border-slate-800 text-xs font-bold gap-1">
                    <button
                      onClick={() => setGrammarView("particles")}
                      className={`px-4 py-2.5 rounded-xl transition-all cursor-pointer flex items-center gap-2 ${
                        grammarView === "particles"
                          ? "bg-rose-600 text-white shadow-md shadow-rose-600/30 font-extrabold"
                          : "text-slate-400 hover:text-white"
                      }`}
                    >
                      <Layers className="w-4 h-4" />
                      <span>Peta Partikel Vital</span>
                    </button>
                    <button
                      onClick={() => {
                        setGrammarView("quiz");
                        startNewQuizSession();
                      }}
                      className={`px-4 py-2.5 rounded-xl transition-all cursor-pointer flex items-center gap-2 ${
                        grammarView === "quiz"
                          ? "bg-rose-600 text-white shadow-md shadow-rose-600/30 font-extrabold"
                          : "text-slate-400 hover:text-white"
                      }`}
                    >
                      <RotateCcw className="w-4 h-4" />
                      <span>Kuis Partikel</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* SOV Structure Visual Explanation Card - ONLY VISIBLE ON PARTICLES TAB */}
              {grammarView === "particles" && (
                <div className="p-5 sm:p-6 rounded-2xl bg-gradient-to-br from-slate-950 via-slate-900 to-amber-950/30 border border-amber-500/20 mb-6">
                  <div className="flex items-start gap-3.5">
                    <div className="p-2.5 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-400 shrink-0 mt-0.5">
                      <Info className="w-5 h-5" />
                    </div>
                    <div className="space-y-3 text-xs sm:text-sm text-slate-300 w-full">
                      <h4 className="font-extrabold text-white text-base">
                        💡 Rahasia Struktur Kalimat Bahasa Jepang (Pola SOV vs SVO):
                      </h4>
                      <p className="leading-relaxed">
                        Bahasa Indonesia dan Inggris menggunakan pola <strong>SVO (Subjek - Verb - Objek)</strong>. Sedangkan Bahasa Jepang menggunakan pola <strong>SOV (Subjek - Objek - Verb)</strong>.
                      </p>
                      
                      {/* Visual Comparison Grid */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs pt-1">
                        <div className="p-3.5 rounded-xl bg-slate-950/90 border border-slate-800">
                          <span className="text-slate-400 font-semibold block mb-1">
                            🇮🇩 Bahasa Indonesia (Pola SVO):
                          </span>
                          <p className="font-bold text-white text-sm">
                            Saya <span className="text-amber-400">[Makan]</span> <span className="text-rose-400">[Nasi]</span>.
                          </p>
                          <span className="text-[11px] text-slate-400 block mt-1">
                            (Subjek + Kata Kerja + Objek)
                          </span>
                        </div>

                        <div className="p-3.5 rounded-xl bg-slate-950/90 border border-rose-500/30 space-y-1">
                          <span className="text-rose-400 font-semibold block">
                            🇯🇵 Bahasa Jepang (Pola SOV):
                          </span>
                          <p className="font-bold text-white text-sm">
                            わたし は <span className="text-rose-400">[ごはん を]</span> <span className="text-amber-400">[たべます]</span>。
                          </p>
                          <div className="p-2 rounded-lg bg-slate-900/90 border border-rose-500/20 text-[11px] text-rose-200">
                            💬 <em>Watashi wa [Gohan o] [Tabemasu]</em> = <strong>Saya [Nasi] [Makan]</strong>
                            <span className="block text-slate-400 font-normal italic mt-0.5">→ Terjemahan Alami: "Saya makan nasi."</span>
                          </div>
                          <span className="text-[11px] text-rose-300 font-medium block pt-0.5">
                            (Subjek + Objek + Kata Kerja Wajib di Paling Akhir!)
                          </span>
                        </div>
                      </div>

                      <div className="p-2.5 rounded-xl bg-amber-500/10 border border-amber-500/20 text-[11px] text-amber-200">
                        📌 <strong>Aturan Emas:</strong> Dalam Bahasa Jepang, Kata Kerja (Verb / Action) <u>SELALU berada di posisi paling ujung akhir kalimat</u>!
                      </div>
                    </div>
                  </div>
                </div>
              )}



              {/* VIEW 1: PETA PARTIKEL VITAL */}
              {grammarView === "particles" && (
                <div className="space-y-8">
                  {/* Particle Selector Grid */}
                  <div>
                    <label className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-3">
                      Pilih Partikel Untuk Dipelajari:
                    </label>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5">
                      {PARTICLES_DATA.map((p) => {
                        const isActive = activeParticleId === p.id;
                        const isMultiChar = p.particle.length > 2;
                        return (
                          <button
                            key={p.id}
                            onClick={() => setActiveParticleId(p.id)}
                            className={`p-3.5 sm:p-4 rounded-2xl border transition-all cursor-pointer text-left flex flex-col justify-between gap-2.5 h-full min-h-[96px] ${
                              isActive
                                ? "bg-gradient-to-r " + p.colorGradient + " text-white border-white/40 shadow-xl shadow-rose-950/40 scale-[1.02]"
                                : "bg-slate-950 border-slate-800 text-slate-300 hover:border-slate-700 hover:bg-slate-900/60"
                            }`}
                          >
                            <div className="w-full flex items-start justify-between gap-2">
                              <div className="min-w-0">
                                <span className={`${isMultiChar ? "text-sm sm:text-base font-black tracking-tight" : "text-2xl sm:text-3xl font-black"} font-jp block leading-none text-white whitespace-nowrap`}>
                                  {p.particle}
                                </span>
                                <span className="text-[11px] font-extrabold text-slate-400 block mt-1 uppercase tracking-wide">
                                  {p.romaji}
                                </span>
                              </div>
                            </div>

                            <div className="pt-2 border-t border-white/10 w-full flex items-center justify-between">
                              <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md inline-block ${
                                isActive ? "bg-black/40 text-white border border-white/20" : "bg-slate-900 text-slate-400 border border-slate-800"
                              }`}>
                                {p.badgeText}
                              </span>
                            </div>
                          </button>
                        );
                      })}
                    </div>


                  </div>

                  {/* Selected Particle Detail Box */}
                  {(() => {
                    const particle = PARTICLES_DATA.find((p) => p.id === activeParticleId) || PARTICLES_DATA[0];
                    const isMultiChar = particle.particle.length > 2;
                    return (
                      <div className="p-6 sm:p-8 rounded-3xl bg-slate-950/90 border border-slate-800 shadow-2xl space-y-6 animate-fade-in">
                        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between border-b border-slate-800/80 pb-5 gap-4">
                          <div className="flex items-center gap-4">
                            <div className={`min-w-16 h-16 px-3 rounded-2xl bg-gradient-to-br ${particle.colorGradient} text-white flex items-center justify-center font-black ${
                              isMultiChar ? "text-base sm:text-lg tracking-tight" : "text-3xl sm:text-4xl"
                            } font-jp border border-white/20 shadow-xl shrink-0`}>
                              {particle.particle}
                            </div>
                            <div>
                              <div className="flex flex-wrap items-center gap-2">
                                <span className="text-xs font-extrabold text-rose-400 uppercase tracking-wider">
                                  [{particle.romaji}]
                                </span>
                                {particle.romajiNote && (
                                  <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30">
                                    {particle.romajiNote}
                                  </span>
                                )}
                                <span className="text-xs px-2.5 py-0.5 rounded-full bg-slate-800 border border-slate-700 text-slate-300">
                                  {particle.badgeText}
                                </span>
                              </div>

                              <h3 className="text-xl sm:text-2xl font-extrabold text-white mt-0.5">
                                {particle.name}
                              </h3>
                            </div>
                          </div>
                        </div>


                        {/* Function & Formula */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800">
                            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-1">
                              📌 Fungsi Utama:
                            </span>
                            <p className="text-sm text-slate-200 leading-relaxed font-medium">
                              {particle.functionDescription}
                            </p>
                          </div>

                          <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800">
                            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-1">
                              📐 Rumus Pola Kalimat:
                            </span>
                            <div className="p-2.5 rounded-xl bg-slate-950 border border-slate-800/80 text-rose-300 font-mono font-bold text-xs">
                              {particle.formula}
                            </div>
                          </div>
                        </div>

                        {/* Tips Card */}
                        <div className="p-4 rounded-2xl bg-rose-500/10 border border-rose-500/20 text-xs text-rose-200">
                          {particle.tips}
                        </div>

                        {/* Examples Section */}
                        <div>
                          <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">
                            🗣️ Contoh Kalimat & Pelafalan:
                          </h4>
                          <div className="space-y-4">
                            {particle.examples.map((ex, idx) => (
                              <div key={idx} className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
                                <div className="flex items-center justify-between">
                                  <div>
                                    <span className="text-xl sm:text-2xl font-bold text-white font-jp block tracking-wide">
                                      {ex.japanese}
                                    </span>
                                    <span className="text-xs font-bold text-rose-400 block mt-0.5">
                                      {ex.romaji}
                                    </span>
                                    <span className="text-xs text-slate-300 block mt-1 italic">
                                      💬 "{ex.indonesian}"
                                    </span>
                                  </div>
                                  <button
                                    onClick={() => speakJapanese({ kana: ex.japanese, romaji: ex.romaji, example: "", mnemonic: "" })}
                                    className="p-2.5 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs flex items-center gap-1.5 transition-all shadow-md cursor-pointer shrink-0"
                                  >
                                    <Volume2 className="w-4 h-4" />
                                    <span>Audio</span>
                                  </button>
                                </div>

                                {/* Breakdown Tags */}
                                <div className="pt-2 border-t border-slate-800 flex flex-wrap gap-2">
                                  {ex.breakdown.map((b, bIdx) => (
                                    <div key={bIdx} className="px-2.5 py-1 rounded-lg bg-slate-950 border border-slate-800 text-[11px]">
                                      <span className="font-jp font-bold text-rose-300">{b.text}</span>
                                      <span className="text-slate-400 ml-1.5">({b.role})</span>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    );
                  })()}
                </div>
              )}

              {/* VIEW 2: KUIS PARTIKEL (3-SET PROGRESSIVE SYSTEM) */}
              {grammarView === "quiz" && (
                <div className="max-w-2xl mx-auto space-y-6 py-2 animate-fade-in">
                  {/* Set Level Switcher Bar */}
                  <div className="flex items-center justify-center gap-2 mb-4 bg-slate-950 p-2 rounded-2xl border border-slate-800">
                    <button
                      onClick={() => startQuizSet(1)}
                      className={`flex-1 py-2 px-3 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                        activeQuizSet === 1
                          ? "bg-emerald-600 text-white shadow-md shadow-emerald-600/30 font-extrabold"
                          : "text-slate-400 hover:text-white"
                      }`}
                    >
                      <span>🌱 Set 1 (Dasar)</span>
                    </button>

                    <button
                      onClick={() => startQuizSet(2)}
                      className={`flex-1 py-2 px-3 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                        activeQuizSet === 2
                          ? "bg-amber-600 text-white shadow-md shadow-amber-600/30 font-extrabold"
                          : "text-slate-400 hover:text-white"
                      }`}
                    >
                      <span>⚡ Set 2 (Menengah)</span>
                    </button>

                    <button
                      onClick={() => startQuizSet(3)}
                      className={`flex-1 py-2 px-3 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                        activeQuizSet === 3
                          ? "bg-rose-600 text-white shadow-md shadow-rose-600/30 font-extrabold"
                          : "text-slate-400 hover:text-white"
                      }`}
                    >
                      <span>🔥 Set 3 (Mahir)</span>
                    </button>
                  </div>

                  {(() => {
                    const currentSetQuestions = ALL_GRAMMAR_QUIZ_SETS[activeQuizSet];
                    const isSetCompleted = quizIndex >= currentSetQuestions.length;

                    if (!isSetCompleted) {
                      const currentQ = currentSetQuestions[quizIndex];
                      return (
                        <div className="p-6 sm:p-8 rounded-3xl bg-slate-950 border border-slate-800 shadow-2xl space-y-6 text-center">
                          {/* Header Status Bar */}
                          <div className="flex items-center justify-between text-xs border-b border-slate-800 pb-4">
                            <span className="inline-flex items-center gap-1.5 font-bold px-2.5 py-0.5 rounded-full bg-slate-900 border border-slate-800 text-slate-300">
                              {activeQuizSet === 1 && "🌱 Set 1 • Level Dasar (Soal " + (quizIndex + 1) + "/8)"}
                              {activeQuizSet === 2 && "⚡ Set 2 • Level Menengah (Soal " + (quizIndex + 1) + "/8)"}
                              {activeQuizSet === 3 && "🔥 Set 3 • Level Mahir (Soal " + (quizIndex + 1) + "/8)"}
                            </span>
                            <span className="font-bold text-rose-400">
                              Skor Set {activeQuizSet}: {setScores[activeQuizSet]} / 80
                            </span>
                          </div>

                          {/* Question Box */}
                          <div className="space-y-2 py-4">
                            <span className="text-3xl sm:text-4xl font-extrabold text-white font-jp tracking-wider block">
                              {currentQ.questionSentence}
                            </span>
                            <span className="text-sm text-slate-300 italic block">
                              "{currentQ.translation}"
                            </span>
                          </div>

                          {/* Options Grid */}
                          <div className="grid grid-cols-2 gap-3">
                            {currentQ.options.map((opt) => {
                              const isSelected = quizSelectedOption === opt;
                              const isCorrect = opt === currentQ.correctAnswer;
                              let btnStyle = "bg-slate-900 border-slate-800 text-white hover:border-slate-700";
                              if (quizIsAnswered) {
                                if (isCorrect) btnStyle = "bg-emerald-600 border-emerald-500 text-white font-bold shadow-lg shadow-emerald-600/30";
                                else if (isSelected) btnStyle = "bg-rose-600 border-rose-500 text-white font-bold shadow-lg shadow-rose-600/30";
                                else btnStyle = "bg-slate-900/50 border-slate-800/50 text-slate-500";
                              }
                              return (
                                <button
                                  key={opt}
                                  disabled={quizIsAnswered}
                                  onClick={() => {
                                    setQuizSelectedOption(opt);
                                    setQuizIsAnswered(true);
                                    if (opt === currentQ.correctAnswer) {
                                      setSetScores((prev) => ({
                                        ...prev,
                                        [activeQuizSet]: prev[activeQuizSet] + 10,
                                      }));
                                      confetti({ particleCount: 60, spread: 60, origin: { y: 0.7 } });
                                    }
                                  }}
                                  className={`p-4 rounded-2xl border text-2xl font-bold font-jp transition-all cursor-pointer ${btnStyle}`}
                                >
                                  {opt}
                                </button>
                              );
                            })}
                          </div>

                          {/* Explanation Box */}
                          {quizIsAnswered && (
                            <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 text-left space-y-3 animate-fade-in">
                              <div className="flex items-center gap-2">
                                {quizSelectedOption === currentQ.correctAnswer ? (
                                  <span className="text-xs font-extrabold px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                                    Benar! 🎉
                                  </span>
                                ) : (
                                  <span className="text-xs font-extrabold px-2.5 py-0.5 rounded-full bg-rose-500/20 text-rose-300 border border-rose-500/30">
                                    Kurang Tepat
                                  </span>
                                )}
                              </div>
                              <p className="text-xs text-slate-300 leading-relaxed">
                                {currentQ.explanation}
                              </p>
                              <button
                                onClick={() => {
                                  setQuizIndex((i) => i + 1);
                                  setQuizSelectedOption(null);
                                  setQuizIsAnswered(false);
                                }}
                                className="w-full py-3 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs transition-all flex items-center justify-center gap-1.5 cursor-pointer shadow-lg shadow-rose-600/30"
                              >
                                <span>Lanjut Ke Pertanyaan Berikutnya</span>
                                <ChevronRight className="w-4 h-4" />
                              </button>
                            </div>
                          )}
                        </div>
                      );
                    } else {
                      /* SET MILESTONE COMPLETION SCREEN */
                      return (
                        <div className="p-8 rounded-3xl bg-slate-950 border border-slate-800 text-center space-y-6 shadow-2xl">
                          <div className="w-20 h-20 rounded-full bg-rose-500/20 text-rose-400 border border-rose-500/30 flex items-center justify-center mx-auto text-3xl font-extrabold shadow-xl">
                            {activeQuizSet === 3 ? "🏆" : activeQuizSet === 2 ? "⚡" : "🌱"}
                          </div>

                          <div>
                            <span className="text-xs font-extrabold px-3 py-1 rounded-full bg-rose-500/20 text-rose-300 border border-rose-500/30 mb-2 inline-block">
                              {activeQuizSet === 1 && "Milestone Set 1 Selesai!"}
                              {activeQuizSet === 2 && "Milestone Set 2 Selesai!"}
                              {activeQuizSet === 3 && "Kelulusan Kelas Partikel & Tata Bahasa!"}
                            </span>
                            <h3 className="text-2xl font-extrabold text-white">
                              {activeQuizSet === 1 && "Selamat! Kamu Berhasil Menyelesaikan Set 1 (Level Dasar)"}
                              {activeQuizSet === 2 && "Hebat! Set 2 (Level Menengah) Lulus!"}
                              {activeQuizSet === 3 && "GRADUATION! Kamu Menuntaskan Seluruh 3 Set (24 Soal)!"}
                            </h3>
                            <p className="text-xs text-slate-400 mt-1">
                              {activeQuizSet === 1 && "Siap untuk melangkah ke tantangan partikel Set 2 yang lebih bervariasi?"}
                              {activeQuizSet === 2 && "Tantangan terakhir di Set 3 menantimu! Siapkan fokus terbaikmu."}
                              {activeQuizSet === 3 && "Kamu sudah menguasai seluruh partikel vital & formasi kalimat SOV Bahasa Jepang dasar!"}
                            </p>

                            <div className="mt-5 p-4 rounded-2xl bg-slate-900 border border-slate-800 max-w-sm mx-auto space-y-2">
                              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">
                                Perolehan Skor Set {activeQuizSet}:
                              </span>
                              <span className="text-4xl font-extrabold text-rose-400 block">
                                {setScores[activeQuizSet]} / 80
                              </span>
                              {activeQuizSet === 3 && (
                                <div className="pt-2 border-t border-slate-800 text-xs text-slate-300">
                                  <span>Total Skor Keseluruhan (Set 1-3): </span>
                                  <strong className="text-amber-400 font-mono text-sm">
                                    {setScores[1] + setScores[2] + setScores[3]} / 240
                                  </strong>
                                </div>
                              )}
                            </div>
                          </div>

                          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                            {activeQuizSet < 3 ? (
                              <button
                                onClick={() => {
                                  startQuizSet((activeQuizSet + 1) as 2 | 3);
                                  confetti({ particleCount: 80, spread: 70, origin: { y: 0.6 } });
                                }}
                                className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-gradient-to-r from-rose-500 to-rose-600 hover:from-rose-600 hover:to-rose-700 text-white font-bold text-xs shadow-lg shadow-rose-500/20 transition-all flex items-center justify-center gap-2 cursor-pointer"
                              >
                                <span>
                                  {activeQuizSet === 1 && "Lanjut Ke Set 2 (Level Menengah - Lebih Menantang!)"}
                                  {activeQuizSet === 2 && "Lanjut Ke Set 3 (Level Mahir - Uji Nyali!)"}
                                </span>
                                <ChevronRight className="w-4 h-4" />
                              </button>
                            ) : (
                              <button
                                onClick={startNewQuizSession}
                                className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-gradient-to-r from-rose-500 to-rose-600 hover:from-rose-600 hover:to-rose-700 text-white font-bold text-xs shadow-lg shadow-rose-500/20 transition-all flex items-center justify-center gap-2 cursor-pointer"
                              >
                                <RotateCcw className="w-4 h-4" />
                                <span>Ulangi Dari Set 1 (Level Dasar)</span>
                              </button>
                            )}

                            <button
                              onClick={() => startQuizSet(activeQuizSet)}
                              className="w-full sm:w-auto px-5 py-3.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-300 font-bold text-xs transition-all cursor-pointer"
                            >
                              Ulangi Set {activeQuizSet} Ini
                            </button>
                          </div>
                        </div>
                      );
                    }
                  })()}
                </div>
              )}


            </div>
          )}

          {/* COURSE 3: KANJI PEMULA LEARNING INTERFACE */}
          {selectedCourseId === "kanji" && (
            <div className="space-y-8 animate-fade-in">
              {/* Course 3 Header */}
              <div className="border-b border-slate-800 pb-6 space-y-6">
                <div className="text-center max-w-2xl mx-auto space-y-2">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-xs font-bold">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Kelas 3 • Karakter Kanji</span>
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
                    Kanji Dasar Pemula
                  </h2>
                  <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                    Pelajari Kanji dasar beserta cara baca Jepang, cara baca Cina, arti, dan contoh kata sehari-hari.
                  </p>
                </div>

                <div className="p-5 sm:p-6 rounded-3xl bg-gradient-to-br from-slate-950 via-slate-900 to-rose-950/40 border border-rose-500/30 shadow-2xl text-left space-y-4">
                  {/* Card Header */}
                  <div className="flex items-center gap-3 border-b border-slate-800 pb-3">
                    <div className="p-2.5 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-400 shrink-0">
                      <Sparkles className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-extrabold text-white text-base">
                        💡 Panduan Lengkap & Teori Karakter Kanji N5
                      </h4>
                      <p className="text-xs text-slate-400">
                        Kanji adalah simbol bergambar (ideogram). Pahami fakta dasar & 3 aturan emas ini agar belajar Kanji terasa ringan!
                      </p>
                    </div>
                  </div>

                  {/* Section A: Fakta Dasar Kanji (2136 Jouyou Kanji & Logika Evolusi) */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                    <div className="p-3.5 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-1">
                      <span className="text-amber-400 font-bold block">
                        📊 Ada Berapa Banyak Kanji?
                      </span>
                      <p className="text-slate-300 leading-relaxed">
                        Total Kanji ada <strong>&gt; 5.000 karakter</strong>, namun masyarakat Jepang sehari-hari hanya menggunakan <strong>2.136 Jouyou Kanji</strong>. Untuk tingkat pemula N5, kamu cukup menguasai <strong>30-100 Kanji paling dasar</strong>!
                      </p>
                    </div>

                    <div className="p-3.5 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-1">
                      <span className="text-purple-400 font-bold block">
                        🧩 Mengapa Kanji Dikelompokkan Per Kategori?
                      </span>
                      <p className="text-slate-300 leading-relaxed">
                        Kanji purba diciptakan dari lukisan alam & kehidupan manusia secara evolutif:
                        <span className="text-white font-semibold block mt-0.5"> Angka ➔ Alam & Hari ➔ Manusia ➔ Posisi ➔ Kata Kerja</span>.
                      </p>
                    </div>
                  </div>

                  {/* Section B: 3 Aturan Emas Paham Kanji N5 */}
                  <div>
                    <span className="text-xs font-extrabold text-rose-400 uppercase tracking-wider block mb-2">
                      ✨ 3 Aturan Emas Belajar Kanji (Bebas Pusing):
                    </span>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs text-slate-300">
                      <div className="p-3.5 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-1">
                        <span className="font-extrabold text-white block">🖼️ 1. Kanji = Gambar / Emoji</span>
                        <p className="leading-relaxed text-slate-300">
                          Kanji melambangkan makna langsung seperti emoji (misal <strong>水</strong> = 💧 Air). Cukup ingat bentuk visual & artinya!
                        </p>
                      </div>
                      <div className="p-3.5 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-1">
                        <span className="font-extrabold text-white block">🗣️ 2. Nongkrong Sendiri vs Gabung</span>
                        <p className="leading-relaxed text-slate-300">
                          Kalau berdiri sendiri ➔ Dibaca Hiragana/Kun'yomi (<strong>Mizu</strong>). Kalau digabung Kanji lain ➔ Dibaca Katakana/On'yomi (<strong>Sui</strong>-youbi).
                        </p>
                      </div>
                      <div className="p-3.5 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-1">
                        <span className="font-extrabold text-white block">💡 3. Rahasia Sukses N5</span>
                        <p className="leading-relaxed text-slate-300">
                          Jangan pusing hafal rumus! Cukup ingat: <u>Bentuk Kanji</u> ➔ <u>Arti Utama</u> ➔ <u>1 Cara Baca Paling Sering</u>.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>


              </div>

                {/* View Switcher: Tabel Grid | Mode Fokus | Uji Hafalan | Latihan Menulis */}

                <div className="flex items-center justify-center pt-2">
                  <div className="flex flex-wrap items-center justify-center bg-slate-950 p-1.5 rounded-2xl border border-slate-800 text-xs font-bold gap-1 shadow-inner">
                    <button
                      onClick={() => setKanjiViewMode("grid")}
                      className={`px-4 py-2.5 rounded-xl transition-all cursor-pointer flex items-center gap-2 ${
                        kanjiViewMode === "grid"
                          ? "bg-rose-600 text-white shadow-md shadow-rose-600/30 font-extrabold"
                          : "text-slate-400 hover:text-white"
                      }`}
                    >
                      <Grid className="w-4 h-4" />
                      <span>Tabel Grid</span>
                    </button>

                    <button
                      onClick={() => setKanjiViewMode("flashcard")}
                      className={`px-4 py-2.5 rounded-xl transition-all cursor-pointer flex items-center gap-2 ${
                        kanjiViewMode === "flashcard"
                          ? "bg-rose-600 text-white shadow-md shadow-rose-600/30 font-extrabold"
                          : "text-slate-400 hover:text-white"
                      }`}
                    >
                      <BookOpen className="w-4 h-4" />
                      <span>Mode Fokus</span>
                    </button>

                    <button
                      onClick={() => {
                        setKanjiViewMode("write");
                        clearCanvas();
                      }}
                      className={`px-4 py-2.5 rounded-xl transition-all cursor-pointer flex items-center gap-2 ${
                        kanjiViewMode === "write"
                          ? "bg-rose-600 text-white shadow-md shadow-rose-600/30 font-extrabold"
                          : "text-slate-400 hover:text-white"
                      }`}
                    >
                      <PenTool className="w-4 h-4" />
                      <span>Latihan Menulis</span>
                    </button>

                    <button
                      onClick={() => {
                        setKanjiViewMode("quiz");
                        setKanjiQuizIndex(0);
                        setKanjiQuizScore(0);
                        setKanjiQuizSelectedOption(null);
                        setKanjiQuizIsAnswered(false);
                      }}
                      className={`px-4 py-2.5 rounded-xl transition-all cursor-pointer flex items-center gap-2 ${
                        kanjiViewMode === "quiz"
                          ? "bg-rose-600 text-white shadow-md shadow-rose-600/30 font-extrabold"
                          : "text-slate-400 hover:text-white"
                      }`}
                    >
                      <RotateCcw className="w-4 h-4" />
                      <span>Uji Hafalan</span>
                    </button>
                  </div>
                </div>

              {/* VIEW 1: TABEL GRID KANJI */}
              {kanjiViewMode === "grid" && (
                <div className="space-y-8">
                  {/* Filter Categories */}


                  {/* Filter Categories */}
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <label className="text-xs font-bold text-slate-400 uppercase tracking-wider block">
                        Kategori Kanji (N5 Target: 30 Kanji Dasar):
                      </label>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {KANJI_CATEGORIES.map((cat) => (
                        <button
                          key={cat.id}
                          onClick={() => setKanjiCategory(cat.id)}
                          className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                            kanjiCategory === cat.id
                              ? "bg-rose-600 text-white shadow-md shadow-rose-600/30"
                              : "bg-slate-900 text-slate-400 hover:text-white border border-slate-800"
                          }`}
                        >
                          {cat.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Kanji Grid List */}
                  {(() => {
                    const filteredKanji = kanjiCategory === "all"
                      ? KANJI_N5_DATA
                      : KANJI_N5_DATA.filter((k) => k.category === kanjiCategory);

                    return (
                      <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-3">
                        {filteredKanji.map((item) => {
                          const isActive = activeKanji?.kanji === item.kanji;
                          return (
                            <div
                              key={item.kanji}
                              onClick={() => {
                                setActiveKanji(item);
                                speakJapanese({ kana: item.kanji, romaji: item.kunyomi[0] || item.onyomi[0], example: "", mnemonic: "" });
                                setTimeout(() => {
                                  document.getElementById("kanji-spotlight")?.scrollIntoView({ behavior: "smooth", block: "nearest" });
                                }, 50);
                              }}

                              className={`p-4 rounded-2xl border transition-all cursor-pointer text-center group flex flex-col justify-between ${
                                isActive
                                  ? "bg-gradient-to-b from-rose-950/90 to-slate-900 border-rose-500 shadow-xl shadow-rose-950/40 scale-[1.03]"
                                  : "bg-slate-950 border-slate-800 hover:border-slate-700 hover:bg-slate-900/60"
                              }`}
                            >
                              <span className="text-4xl font-extrabold text-white font-jp my-2 group-hover:scale-110 transition-transform">
                                {item.kanji}
                              </span>
                              <div>
                                <span className="text-xs font-extrabold text-rose-400 block truncate">
                                  {item.meaning}
                                </span>
                                <span className="text-[11px] font-jp font-bold text-emerald-300 block mt-0.5 truncate">
                                  {item.kunyomi !== "ー" ? item.kunyomi : item.onyomi}
                                </span>
                                <span className="text-[10px] font-mono font-bold text-slate-300 block">
                                  [{item.romajiName}]
                                </span>
                              </div>

                            </div>
                          );
                        })}
                      </div>
                    );
                  })()}

                  {/* Selected Kanji Detail Box */}
                  {activeKanji && (
                    <div id="kanji-spotlight" className="p-6 sm:p-8 rounded-3xl bg-slate-950/95 border border-slate-800 shadow-2xl space-y-6 animate-fade-in relative">

                      <button
                        onClick={() => setActiveKanji(null)}
                        className="absolute top-4 right-4 p-2 rounded-xl bg-slate-900 text-slate-400 hover:text-white cursor-pointer"
                      >
                        <X className="w-5 h-5" />
                      </button>

                      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5 border-b border-slate-800 pb-5">
                        <div className="flex items-center gap-5">
                          <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-rose-600 to-rose-800 text-white flex items-center justify-center font-extrabold text-5xl font-jp border border-rose-400 shadow-xl shrink-0">
                            {activeKanji.kanji}
                          </div>

                          <div>
                            <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-rose-500/20 text-rose-300 border border-rose-500/30">
                              {activeKanji.categoryLabel}
                            </span>
                            <h3 className="text-2xl sm:text-3xl font-black text-white mt-1">
                              {activeKanji.meaning}
                            </h3>
                            <span className="text-sm font-bold text-rose-400 font-mono">
                              Cara Baca Paling Sering: [{activeKanji.romajiName}]
                            </span>
                          </div>
                        </div>

                        <button
                          onClick={() => speakJapanese({ kana: activeKanji.kanji, romaji: activeKanji.kunyomi[0] || activeKanji.onyomi[0], example: "", mnemonic: "" })}
                          className="px-4 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs transition-all flex items-center gap-2 shadow-lg shadow-rose-600/30 cursor-pointer shrink-0"
                        >
                          <Volume2 className="w-4 h-4" />
                          <span>Dengar Suara</span>
                        </button>
                      </div>

                      {/* Mnemonics */}
                      <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-xs text-amber-200">
                        💡 <strong>Trik Gampang Ingat Gambar:</strong> {activeKanji.mnemonic}
                      </div>

                      {/* Vocabulary Examples */}
                      <div>
                        <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">
                          🗣️ Contoh Kata Populer Menggunakan Kanji 「{activeKanji.kanji}」:
                        </h4>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          {activeKanji.examples.map((ex, idx) => (
                            <div key={idx} className="p-4 rounded-2xl bg-slate-900 border border-slate-800 flex items-center justify-between">
                              <div>
                                <div className="flex items-center gap-2">
                                  <span className="text-xl font-extrabold text-white font-jp">
                                    {ex.japanese}
                                  </span>
                                  <span className="text-xs text-slate-400 font-jp">
                                    ({ex.kana})
                                  </span>
                                </div>
                                <div className="mt-1 flex items-center gap-2">
                                  <span className="text-xs font-extrabold text-rose-400 font-mono">
                                    [{ex.romaji}]
                                  </span>
                                  <span className="text-xs font-semibold text-slate-200">
                                    = {ex.indonesian}
                                  </span>
                                </div>
                              </div>
                              <button
                                onClick={() => speakJapanese({ kana: ex.kana, romaji: ex.romaji, example: "", mnemonic: "" })}
                                className="p-2 rounded-xl bg-rose-600 hover:bg-rose-500 text-white transition-all shadow-md cursor-pointer shrink-0 ml-2"
                                title="Dengarkan Audio"
                              >
                                <Volume2 className="w-4 h-4" />
                              </button>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* CARA BACA 1 & CARA BACA 2 WITH DEDICATED AUDIO BUTTONS */}
                      <div className="pt-4 border-t border-slate-800 space-y-3">
                        <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                          📖 2 Cara Baca Kanji 「{activeKanji.kanji}」 + Tombol Suara:
                        </h4>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                          {/* Bacaan 1 (Kun'yomi / Asli Jepang) */}
                          <div className="p-3.5 rounded-2xl bg-slate-900/90 border border-slate-800 flex items-center justify-between">
                            <div>
                              <span className="font-bold text-slate-400 text-[11px] block mb-0.5">
                                Bacaan 1 • Kun'yomi (Hiragana / Jepang):
                              </span>
                              <span className="text-base font-extrabold text-white font-jp">
                                {activeKanji.kunyomi}
                              </span>
                            </div>
                            {activeKanji.kunyomi !== "ー" && (
                              <button
                                onClick={() => speakJapanese({ kana: activeKanji.kunyomi.replace(/・/g, ''), romaji: "", example: "", mnemonic: "" })}
                                className="px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-[11px] flex items-center gap-1.5 transition-all shadow-md cursor-pointer shrink-0 ml-2"
                                title="Dengarkan Suara Bacaan 1 (Kun'yomi)"
                              >
                                <Volume2 className="w-3.5 h-3.5" />
                                <span>Suara 1</span>
                              </button>
                            )}
                          </div>

                          {/* Bacaan 2 (On'yomi / Serapan Cina) */}
                          <div className="p-3.5 rounded-2xl bg-slate-900/90 border border-slate-800 flex items-center justify-between">
                            <div>
                              <span className="font-bold text-slate-400 text-[11px] block mb-0.5">
                                Bacaan 2 • On'yomi (Katakana / Cina):
                              </span>
                              <span className="text-base font-extrabold text-rose-300 font-jp">
                                {activeKanji.onyomi}
                              </span>
                            </div>
                            {activeKanji.onyomi !== "ー" && (
                              <button
                                onClick={() => speakJapanese({ kana: activeKanji.onyomi, romaji: "", example: "", mnemonic: "" })}
                                className="px-3 py-1.5 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-bold text-[11px] flex items-center gap-1.5 transition-all shadow-md cursor-pointer shrink-0 ml-2"
                                title="Dengarkan Suara Bacaan 2 (On'yomi)"
                              >
                                <Volume2 className="w-3.5 h-3.5" />
                                <span>Suara 2</span>
                              </button>
                            )}
                          </div>

                          {/* Stroke Count */}
                          <div className="p-3.5 rounded-2xl bg-slate-900/90 border border-slate-800 flex flex-col justify-center">
                            <span className="font-bold text-slate-400 text-[11px] block mb-0.5">
                              Jumlah Goresan Garis:
                            </span>
                            <span className="text-sm font-extrabold text-white">
                              {activeKanji.strokeCount} Goresan Line
                            </span>
                          </div>
                        </div>
                      </div>

                    </div>
                  )}
                </div>
              )}


              {/* VIEW 2: FLASHCARD KANJI */}

              {kanjiViewMode === "flashcard" && (
                <div className="flex flex-col items-center space-y-6 max-w-lg mx-auto animate-fade-in py-2">
                  {(() => {
                    const currentKanji = KANJI_N5_DATA[kanjiCardIndex];
                    return (
                      <>
                        <div
                          onClick={() => setIsKanjiFlipped(!isKanjiFlipped)}
                          className="w-full h-80 rounded-3xl bg-gradient-to-br from-slate-950 via-slate-900 to-rose-950/40 border border-slate-800 p-8 shadow-2xl flex flex-col items-center justify-between cursor-pointer group transition-all transform hover:scale-[1.01]"
                        >
                          <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">
                            Kanji {kanjiCardIndex + 1} dari {KANJI_N5_DATA.length} (Klik untuk Bolak-Balik)
                          </span>

                          {!isKanjiFlipped ? (
                            <div className="text-center py-4">
                              <span className="text-7xl sm:text-8xl font-black text-white font-jp block group-hover:scale-105 transition-transform">
                                {currentKanji.kanji}
                              </span>
                              <span className="text-xs text-slate-400 block mt-4">
                                {currentKanji.strokeCount} Goresan • Tap untuk lihat arti & cara baca 🔄
                              </span>
                            </div>
                          ) : (
                            <div className="text-center py-2 space-y-2 animate-fade-in w-full">
                              <span className="text-3xl font-extrabold text-rose-400 block">
                                {currentKanji.meaning}
                              </span>
                              <div className="text-xs space-y-1 text-slate-300 pt-2 border-t border-slate-800">
                                <div><strong className="text-slate-400">Kun'yomi:</strong> <span className="font-jp">{currentKanji.kunyomi}</span></div>
                                <div><strong className="text-slate-400">On'yomi:</strong> <span className="font-jp">{currentKanji.onyomi}</span></div>
                                <div className="text-[11px] text-amber-300 italic pt-1">💡 {currentKanji.mnemonic}</div>
                              </div>
                            </div>
                          )}

                          <div className="flex items-center gap-2 text-xs font-bold text-rose-400">
                            <Volume2
                              className="w-4 h-4 hover:scale-110 transition-transform"
                              onClick={(e) => {
                                e.stopPropagation();
                                speakJapanese({ kana: currentKanji.kanji, romaji: currentKanji.romajiName, example: "", mnemonic: "" });
                              }}
                            />
                            <span>Audio Pelafalan</span>
                          </div>
                        </div>

                        {/* Navigation Controls */}
                        <div className="flex items-center justify-center gap-3 w-full">
                          <button
                            onClick={() => {
                              setKanjiCardIndex((prev) => (prev > 0 ? prev - 1 : KANJI_N5_DATA.length - 1));
                              setIsKanjiFlipped(false);
                            }}
                            className="flex-1 py-3 px-4 rounded-2xl bg-slate-950 hover:bg-slate-800 border border-slate-800 text-slate-300 font-bold text-xs transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                          >
                            <ChevronLeft className="w-4 h-4" />
                            <span>Sebelumnya</span>
                          </button>

                          <button
                            onClick={() => {
                              const rand = Math.floor(Math.random() * KANJI_N5_DATA.length);
                              setKanjiCardIndex(rand);
                              setIsKanjiFlipped(false);
                            }}
                            className="px-5 py-3 rounded-2xl bg-slate-950 hover:bg-slate-800 border border-slate-800 text-slate-300 font-bold text-xs transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                          >
                            <Shuffle className="w-4 h-4 text-rose-400" />
                            <span>Acak</span>
                          </button>

                          <button
                            onClick={() => {
                              setKanjiCardIndex((prev) => (prev < KANJI_N5_DATA.length - 1 ? prev + 1 : 0));
                              setIsKanjiFlipped(false);
                            }}
                            className="flex-1 py-3 px-4 rounded-2xl bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs transition-all flex items-center justify-center gap-1.5 cursor-pointer shadow-lg shadow-rose-600/30"
                          >
                            <span>Selanjutnya</span>
                            <ChevronRight className="w-4 h-4" />
                          </button>
                        </div>
                      </>
                    );
                  })()}
                </div>
              )}

              {/* VIEW 3: LATIHAN MENULIS KANJI */}
              {kanjiViewMode === "write" && (
                <div className="flex flex-col items-center space-y-6 max-w-lg mx-auto animate-fade-in py-2">
                  {(() => {
                    const currentKanji = KANJI_N5_DATA[kanjiCardIndex];
                    return (
                      <>
                        {/* Top Info Header */}
                        <div className="text-center space-y-1">
                          <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">
                            Latihan Menulis Kanji ({kanjiCardIndex + 1} dari {KANJI_N5_DATA.length})
                          </span>
                          <h3 className="text-xl font-extrabold text-white">
                            Goresan Kanji 「<span className="text-rose-400 font-jp">{currentKanji.kanji}</span>」 ({currentKanji.meaning})
                          </h3>
                          <p className="text-xs text-slate-400">
                            Romaji: <strong className="text-rose-300">{currentKanji.romajiName}</strong> • {currentKanji.strokeCount} Goresan
                          </p>
                        </div>

                        {/* Interactive Drawing Pad */}
                        <div className="relative w-full max-w-[320px] h-[320px] rounded-3xl bg-slate-950 border-2 border-emerald-500/40 p-4 shadow-2xl flex items-center justify-center overflow-hidden touch-none">
                          
                          {/* Target Kanji Badge */}
                          <div className="absolute top-3 left-3 z-20 flex items-center gap-1.5 px-3 py-1 rounded-xl bg-slate-900/90 border border-slate-800 text-xs font-bold text-slate-200 pointer-events-none shadow">
                            <span className="text-[11px] text-slate-400 font-medium">Kanji:</span>
                            <span className="text-emerald-400 text-base font-extrabold font-jp">{currentKanji.kanji}</span>
                          </div>

                          {/* Icon Controls Inside Canvas (Top Right) */}
                          <div className="absolute top-3 right-3 z-20 flex items-center gap-1 bg-slate-900/95 p-1 rounded-xl border border-slate-800 shadow">
                            <button
                              onClick={() => setShowGuide(!showGuide)}
                              className="p-1.5 rounded-lg hover:bg-slate-800 text-slate-300 transition-colors cursor-pointer"
                              title={showGuide ? "Sembunyikan Jalur Panduan" : "Tampilkan Jalur Panduan"}
                            >
                              {showGuide ? <EyeOff className="w-4 h-4 text-emerald-400" /> : <Eye className="w-4 h-4 text-slate-400" />}
                            </button>

                            <button
                              onClick={() => speakJapanese({ kana: currentKanji.kanji, romaji: currentKanji.romajiName, example: "", mnemonic: "" })}
                              className="p-1.5 rounded-lg hover:bg-slate-800 text-slate-300 transition-colors cursor-pointer"
                              title="Putar Suara"
                            >
                              <Volume2 className="w-4 h-4 text-emerald-400" />
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
                              <span className="text-9xl font-black text-emerald-500/20 tracking-wider font-jp">
                                {currentKanji.kanji}
                              </span>
                            </div>
                          )}

                          {/* Grid Cross Lines */}
                          <div className="absolute inset-0 pointer-events-none border border-dashed border-slate-800/60 m-4 rounded-2xl flex items-center justify-center">
                            <div className="w-full h-[1px] bg-slate-800/40 absolute" />
                            <div className="h-full w-[1px] bg-slate-800/40 absolute" />
                          </div>

                          {/* Drawing Canvas Element */}
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
                            className="absolute inset-0 w-full h-full cursor-crosshair z-10"
                          />
                        </div>

                        {/* Mnemonics Note */}
                        <div className="w-full max-w-[320px] p-3.5 rounded-2xl bg-slate-950/90 border border-slate-800 text-xs text-slate-300 text-left">
                          💡 <strong>Mnemonik Menulis:</strong> {currentKanji.mnemonic}
                        </div>

                        {/* Navigation Controls */}
                        <div className="flex items-center justify-center gap-3 w-full">
                          <button
                            onClick={() => {
                              setKanjiCardIndex((prev) => (prev > 0 ? prev - 1 : KANJI_N5_DATA.length - 1));
                              clearCanvas();
                            }}
                            className="flex-1 py-3 px-4 rounded-2xl bg-slate-950 hover:bg-slate-800 border border-slate-800 text-slate-300 font-bold text-xs transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                          >
                            <ChevronLeft className="w-4 h-4" />
                            <span>Sebelumnya</span>
                          </button>

                          <button
                            onClick={() => {
                              const rand = Math.floor(Math.random() * KANJI_N5_DATA.length);
                              setKanjiCardIndex(rand);
                              clearCanvas();
                            }}
                            className="px-5 py-3 rounded-2xl bg-slate-950 hover:bg-slate-800 border border-slate-800 text-slate-300 font-bold text-xs transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                          >
                            <Shuffle className="w-4 h-4 text-emerald-400" />
                            <span>Acak</span>
                          </button>

                          <button
                            onClick={() => {
                              setKanjiCardIndex((prev) => (prev < KANJI_N5_DATA.length - 1 ? prev + 1 : 0));
                              clearCanvas();
                            }}
                            className="flex-1 py-3 px-4 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs transition-all flex items-center justify-center gap-1.5 cursor-pointer shadow-lg shadow-emerald-600/30"
                          >
                            <span>Selanjutnya</span>
                            <ChevronRight className="w-4 h-4" />
                          </button>
                        </div>
                      </>
                    );
                  })()}
                </div>
              )}

              {/* VIEW 4: KUIS KANJI N5 */}
              {kanjiViewMode === "quiz" && (
                <div className="max-w-2xl mx-auto space-y-6 py-2 animate-fade-in">
                  {kanjiQuizIndex < KANJI_QUIZZES.length ? (
                    <div className="p-6 sm:p-8 rounded-3xl bg-slate-950 border border-slate-800 shadow-2xl space-y-6 text-center">
                      <div className="flex items-center justify-between text-xs text-slate-400 border-b border-slate-800 pb-4">
                        <span>Pertanyaan {kanjiQuizIndex + 1} dari {KANJI_QUIZZES.length}</span>
                        <span className="font-bold text-rose-400">Skor: {kanjiQuizScore}</span>
                      </div>

                      {(() => {
                        const currentQ = KANJI_QUIZZES[kanjiQuizIndex];
                        return (
                          <>
                            <div className="space-y-3 py-4">
                              <span className="text-6xl sm:text-7xl font-extrabold text-white font-jp block">
                                {currentQ.kanji}
                              </span>
                              <span className="text-sm font-semibold text-slate-300 block">
                                {currentQ.questionSentence}
                              </span>
                            </div>

                            <div className="grid grid-cols-2 gap-3">
                              {currentQ.options.map((opt) => {
                                const isSelected = kanjiQuizSelectedOption === opt;
                                const isCorrect = opt === currentQ.correctAnswer;
                                let btnStyle = "bg-slate-900 border-slate-800 text-white hover:border-slate-700";
                                if (kanjiQuizIsAnswered) {
                                  if (isCorrect) btnStyle = "bg-emerald-600 border-emerald-500 text-white font-bold shadow-lg shadow-emerald-600/30";
                                  else if (isSelected) btnStyle = "bg-rose-600 border-rose-500 text-white font-bold shadow-lg shadow-rose-600/30";
                                  else btnStyle = "bg-slate-900/50 border-slate-800/50 text-slate-500";
                                }
                                return (
                                  <button
                                    key={opt}
                                    disabled={kanjiQuizIsAnswered}
                                    onClick={() => {
                                      setKanjiQuizSelectedOption(opt);
                                      setKanjiQuizIsAnswered(true);
                                      if (opt === currentQ.correctAnswer) {
                                        setKanjiQuizScore((s) => s + 10);
                                        confetti({ particleCount: 60, spread: 60, origin: { y: 0.7 } });
                                      }
                                    }}
                                    className={`p-4 rounded-2xl border text-sm sm:text-base font-bold font-jp transition-all cursor-pointer ${btnStyle}`}
                                  >
                                    {opt}
                                  </button>
                                );
                              })}
                            </div>

                            {kanjiQuizIsAnswered && (
                              <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 text-left space-y-3 animate-fade-in">
                                <div className="flex items-center gap-2">
                                  {kanjiQuizSelectedOption === currentQ.correctAnswer ? (
                                    <span className="text-xs font-extrabold px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                                      Benar! 🎉
                                    </span>
                                  ) : (
                                    <span className="text-xs font-extrabold px-2.5 py-0.5 rounded-full bg-rose-500/20 text-rose-300 border border-rose-500/30">
                                      Kurang Tepat
                                    </span>
                                  )}
                                </div>
                                <p className="text-xs text-slate-300 leading-relaxed">
                                  {currentQ.explanation}
                                </p>
                                <button
                                  onClick={() => {
                                    setKanjiQuizIndex((i) => i + 1);
                                    setKanjiQuizSelectedOption(null);
                                    setKanjiQuizIsAnswered(false);
                                  }}
                                  className="w-full py-3 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs transition-all flex items-center justify-center gap-1.5 cursor-pointer shadow-lg shadow-rose-600/30"
                                >
                                  <span>Lanjut Ke Pertanyaan Berikutnya</span>
                                  <ChevronRight className="w-4 h-4" />
                                </button>
                              </div>
                            )}
                          </>
                        );
                      })()}
                    </div>
                  ) : (
                    <div className="p-8 rounded-3xl bg-slate-950 border border-slate-800 text-center space-y-6 shadow-2xl">
                      <div className="w-20 h-20 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center justify-center mx-auto text-3xl font-extrabold shadow-xl">
                        🉐
                      </div>
                      <div>
                        <h3 className="text-2xl font-bold text-white mb-1">
                          Kuis Kanji N5 Selesai!
                        </h3>
                        <p className="text-xs text-slate-400">
                          Kamu berhasil menyelesaikan kuis pemahaman Kanji pemula.
                        </p>
                        <div className="mt-4 p-4 rounded-2xl bg-slate-900 border border-slate-800 max-w-xs mx-auto">
                          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-1">
                            Skor Akhir Kanji:
                          </span>
                          <span className="text-4xl font-extrabold text-emerald-400">
                            {kanjiQuizScore} / {KANJI_QUIZZES.length * 10}
                          </span>
                        </div>
                      </div>
                      <button
                        onClick={() => {
                          setKanjiQuizIndex(0);
                          setKanjiQuizScore(0);
                          setKanjiQuizSelectedOption(null);
                          setKanjiQuizIsAnswered(false);
                        }}
                        className="px-6 py-3 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs transition-all cursor-pointer shadow-lg shadow-rose-600/30 flex items-center justify-center gap-2 mx-auto"
                      >
                        <RotateCcw className="w-4 h-4" />
                        <span>Ulangi Kuis Kanji</span>
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>
          )}

          {/* COURSE 4: KOSAKATA SEHARI-HARI LEARNING INTERFACE */}
          {selectedCourseId === "vocab" && (
            <div className="space-y-8 animate-fade-in">
              {/* Course 4 Header */}
              <div className="border-b border-slate-800 pb-6 space-y-6">
                <div className="text-center max-w-2xl mx-auto space-y-2">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-500/20 text-sky-300 border border-sky-500/30 text-xs font-bold">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Kelas 4 • Kosakata Sehari-Hari</span>
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
                    100+ Kosakata Vital & Contoh Kalimat
                  </h2>
                  <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                    Kuasai perbendaharaan kata (vocabulary) penting seputar makanan, keluarga, tempat, dan benda sehari-hari!
                  </p>
                </div>

                {/* Concept Explanation Card */}
                <div className="p-5 sm:p-6 rounded-2xl bg-gradient-to-br from-slate-950 via-slate-900 to-sky-950/30 border border-sky-500/20 shadow-xl text-left space-y-4">
                  <div className="flex items-start gap-3.5">
                    <div className="p-2.5 rounded-xl bg-sky-500/10 border border-sky-500/20 text-sky-400 shrink-0 mt-0.5">
                      <Info className="w-5 h-5" />
                    </div>
                    <div className="space-y-3 text-xs sm:text-sm text-slate-300 w-full">
                      <h4 className="font-extrabold text-white text-base">
                        💡 Panduan Huruf & 3 Tips Emas Hafal Kosakata:
                      </h4>
                      
                      <div className="p-3.5 rounded-xl bg-slate-950/90 border border-slate-800 space-y-2 text-xs">
                        <strong className="text-sky-300 block">❓ Huruf Apa Yang Dipakai Dalam Kosakata?</strong>
                        <p className="text-slate-300 leading-relaxed">
                          Kosakata Bahasa Jepang memakai gabungan huruf sesuai jenis dan asal-usul katanya:
                        </p>
                        <ul className="space-y-1.5 pl-4 text-slate-300 list-disc">
                          <li><strong>Kata Asli Jepang:</strong> Menggunakan <strong>Hiragana & Kanji</strong> (Contoh: <code className="text-white font-jp">ご飯</code> / <code className="text-white font-jp">ごはん</code> = <em>Gohan</em> / Nasi).</li>
                          <li><strong>Kata Serapan Asing:</strong> Menggunakan <strong>Katakana</strong> (Contoh: <code className="text-sky-300 font-jp">パン</code> = <em>Pan</em> / Roti, <code className="text-sky-300 font-jp">コーヒー</code> = <em>Kopi</em>).</li>
                        </ul>
                      </div>

                      {/* Special FAQ Box for Unlearned Kanji */}
                      <div className="p-3.5 rounded-xl bg-sky-950/40 border border-sky-500/30 space-y-1.5 text-xs text-sky-200">
                        <strong className="text-sky-300 font-bold block flex items-center gap-1.5">
                          💡 Pertanyaan: "Gimana cara hafal kosakata jika ada Kanji baru yang belum diajarkan di Kelas 3?"
                        </strong>
                        <p className="leading-relaxed">
                          <strong>Fokus utama Kelas 4 adalah bunyi Hiragana & artinya!</strong> Kamu tidak perlu memusingkan goresan Kanji barunya. Selalu patokan pada bacaan <strong>Hiragana</strong> (misal: <code className="text-white font-bold font-jp">ごはん</code> = Gohan = Nasi). Bentuk Kanji (<code className="text-slate-300 font-jp">ご飯</code>) disajikan sebagai bonus referensi visual agar matamu makin terbiasa.
                        </p>
                      </div>


                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 pt-1 text-[11px]">
                        <div className="p-3 rounded-xl bg-slate-950/90 border border-slate-800 text-slate-300">
                          <strong className="text-sky-400 block mb-0.5">1. Pengelompokan Topik:</strong>
                          <span>Hafal kata berdasarkan kelompok topik (Makanan, Tempat, Waktu) agar otak cepat membuat asosiasi.</span>
                        </div>
                        <div className="p-3 rounded-xl bg-slate-950/90 border border-slate-800 text-slate-300">
                          <strong className="text-sky-400 block mb-0.5">2. Konteks Kalimat Nyata:</strong>
                          <span>Jangan hafal kata sendirian; lihat langsung bagaimana kata tersebut dipakai dalam kalimat utuh.</span>
                        </div>
                        <div className="p-3 rounded-xl bg-slate-950/90 border border-slate-800 text-slate-300">
                          <strong className="text-sky-400 block mb-0.5">3. Asosiasi Suara & Visual:</strong>
                          <span>Dengarkan audio voice pelafalan & bayangkan wujud bendanya saat menghafal.</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>


                {/* View Switcher: Tabel Grid | Mode Fokus | Latihan Menulis | Uji Hafalan */}
                <div className="flex items-center justify-center pt-2">
                  <div className="flex flex-wrap items-center justify-center bg-slate-950 p-1.5 rounded-2xl border border-slate-800 text-xs font-bold gap-1 shadow-inner">
                    <button
                      onClick={() => setVocabViewMode("grid")}
                      className={`px-4 py-2.5 rounded-xl transition-all cursor-pointer flex items-center gap-2 ${
                        vocabViewMode === "grid"
                          ? "bg-rose-600 text-white shadow-md shadow-rose-600/30 font-extrabold"
                          : "text-slate-400 hover:text-white"
                      }`}
                    >
                      <Grid className="w-4 h-4" />
                      <span>Tabel Grid</span>
                    </button>

                    <button
                      onClick={() => setVocabViewMode("flashcard")}
                      className={`px-4 py-2.5 rounded-xl transition-all cursor-pointer flex items-center gap-2 ${
                        vocabViewMode === "flashcard"
                          ? "bg-rose-600 text-white shadow-md shadow-rose-600/30 font-extrabold"
                          : "text-slate-400 hover:text-white"
                      }`}
                    >
                      <BookOpen className="w-4 h-4" />
                      <span>Mode Fokus</span>
                    </button>

                    <button
                      onClick={() => {
                        setVocabViewMode("write");
                        clearCanvas();
                      }}
                      className={`px-4 py-2.5 rounded-xl transition-all cursor-pointer flex items-center gap-2 ${
                        vocabViewMode === "write"
                          ? "bg-rose-600 text-white shadow-md shadow-rose-600/30 font-extrabold"
                          : "text-slate-400 hover:text-white"
                      }`}
                    >
                      <PenTool className="w-4 h-4" />
                      <span>Latihan Menulis</span>
                    </button>

                    <button
                      onClick={() => {
                        setVocabViewMode("quiz");
                        setVocabQuizIndex(0);
                        setVocabQuizScore(0);
                        setVocabQuizSelectedOption(null);
                        setVocabQuizIsAnswered(false);
                      }}
                      className={`px-4 py-2.5 rounded-xl transition-all cursor-pointer flex items-center gap-2 ${
                        vocabViewMode === "quiz"
                          ? "bg-rose-600 text-white shadow-md shadow-rose-600/30 font-extrabold"
                          : "text-slate-400 hover:text-white"
                      }`}
                    >
                      <RotateCcw className="w-4 h-4" />
                      <span>Uji Hafalan</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* VIEW 1: TABEL GRID KOSAKATA */}
              {vocabViewMode === "grid" && (
                <div className="space-y-6">
                  {/* Category Filter Selector */}
                  <div>
                    <label className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-3 text-left">
                      Pilih Topik Kosakata:
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {VOCAB_CATEGORIES.map((cat) => (
                        <button
                          key={cat.id}
                          onClick={() => setVocabCategory(cat.id)}
                          className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                            vocabCategory === cat.id
                              ? "bg-sky-600 text-white shadow-md shadow-sky-600/30 font-extrabold"
                              : "bg-slate-950 border border-slate-800 text-slate-400 hover:text-white"
                          }`}
                        >
                          {cat.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Vocab Grid List */}
                  {(() => {
                    const filteredVocab = vocabCategory === "all"
                      ? VOCABULARY_DATA
                      : VOCABULARY_DATA.filter((v) => v.category === vocabCategory);

                    return (
                      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3.5">
                        {filteredVocab.map((item) => {
                          const isActive = activeVocab?.id === item.id;
                          return (
                            <div
                              key={item.id}
                              onClick={() => {
                                setActiveVocab(item);
                                speakJapanese({ kana: item.japanese, romaji: item.romaji, example: "", mnemonic: "" });
                                setTimeout(() => {
                                  document.getElementById("vocab-spotlight")?.scrollIntoView({ behavior: "smooth", block: "nearest" });
                                }, 50);
                              }}

                              className={`p-4 rounded-2xl border transition-all cursor-pointer text-left group flex flex-col justify-between ${
                                isActive
                                  ? "bg-gradient-to-b from-sky-950/90 to-slate-900 border-sky-500 shadow-xl shadow-sky-950/40 scale-[1.02]"
                                  : "bg-slate-950 border-slate-800 hover:border-slate-700 hover:bg-slate-900/60"
                              }`}
                            >
                              <div className="flex items-center justify-between mb-1.5 gap-1">
                                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-sky-500/20 text-sky-300 border border-sky-500/30">
                                  {item.categoryLabel}
                                </span>
                                <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded-md border ${
                                  item.scriptType === "katakana"
                                    ? "bg-sky-500/10 text-sky-300 border-sky-500/20"
                                    : "bg-rose-500/10 text-rose-300 border-rose-500/20"
                                }`}>
                                  {item.scriptType === "katakana" ? "ア Katakana" : item.scriptType === "kanji_kana" ? "🌸 Hiragana & Kanji" : "🌸 Hiragana"}
                                </span>
                              </div>


                              <div className="my-2">
                                <span className="text-2xl font-black text-white font-jp block group-hover:scale-105 transition-transform">
                                  {item.japanese}
                                  {item.kanji && <span className="text-xs text-slate-400 font-normal ml-1">({item.kanji})</span>}
                                </span>
                                <span className="text-xs font-bold text-sky-400 block mt-0.5">
                                  {item.romaji}
                                </span>
                              </div>

                              <span className="text-xs text-slate-300 font-medium border-t border-slate-800/80 pt-2 block truncate">
                                {item.meaning}
                              </span>
                            </div>
                          );
                        })}
                      </div>
                    );
                  })()}

                  {/* Selected Vocab Detail Box */}
                  {activeVocab && (
                    <div id="vocab-spotlight" className="p-6 sm:p-8 rounded-3xl bg-slate-950/95 border border-slate-800 shadow-2xl space-y-6 animate-fade-in relative text-left">

                      <button
                        onClick={() => setActiveVocab(null)}
                        className="absolute top-4 right-4 p-2 rounded-xl bg-slate-900 text-slate-400 hover:text-white cursor-pointer"
                      >
                        <X className="w-5 h-5" />
                      </button>

                      <div className="flex items-start gap-4 border-b border-slate-800 pb-5">
                        <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-sky-600 to-sky-800 text-white flex items-center justify-center font-extrabold text-3xl font-jp border border-sky-400 shadow-xl shrink-0">
                          語
                        </div>

                        <div>
                          <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-sky-500/20 text-sky-300 border border-sky-500/30 inline-block mb-1">
                            {activeVocab.categoryLabel}
                          </span>
                          <h3 className="text-2xl sm:text-3xl font-black text-white font-jp">
                            {activeVocab.japanese} {activeVocab.kanji && <span className="text-lg text-slate-400 font-normal">({activeVocab.kanji})</span>}
                          </h3>
                          <p className="text-sm font-bold text-sky-400 mt-0.5">
                            {activeVocab.romaji} = {activeVocab.meaning}
                          </p>
                        </div>
                      </div>

                      {/* Example Sentence Box */}
                      <div className="p-4 sm:p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-2">
                        <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">
                          💬 Contoh Penggunaan Dalam Kalimat:
                        </span>
                        <p className="text-lg font-bold text-white font-jp">
                          {activeVocab.exampleSentence.japanese}
                        </p>
                        <p className="text-xs font-semibold text-sky-300">
                          {activeVocab.exampleSentence.romaji}
                        </p>
                        <p className="text-xs text-slate-300 border-t border-slate-800/80 pt-2">
                          → <strong>Terjemahan:</strong> "{activeVocab.exampleSentence.indonesian}"
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* VIEW 2: FLASHCARD KOSAKATA */}
              {vocabViewMode === "flashcard" && (
                <div className="flex flex-col items-center space-y-6 max-w-lg mx-auto animate-fade-in py-2">
                  {(() => {
                    const currentVocab = VOCABULARY_DATA[vocabCardIndex];
                    return (
                      <>
                        <div
                          onClick={() => setIsVocabFlipped(!isVocabFlipped)}
                          className="w-full h-80 rounded-3xl bg-gradient-to-br from-slate-950 via-slate-900 to-sky-950/40 border border-slate-800 p-8 shadow-2xl flex flex-col items-center justify-between cursor-pointer group transition-all transform hover:scale-[1.01]"
                        >
                          <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">
                            Kosakata {vocabCardIndex + 1} dari {VOCABULARY_DATA.length} (Klik untuk Bolak-Balik)
                          </span>

                          {!isVocabFlipped ? (
                            <div className="text-center py-4">
                              <span className="text-5xl sm:text-6xl font-black text-white font-jp block group-hover:scale-105 transition-transform">
                                {currentVocab.japanese}
                              </span>
                              {currentVocab.kanji && (
                                <span className="text-base text-slate-400 block font-jp mt-1">
                                  ({currentVocab.kanji})
                                </span>
                              )}
                              <span className="text-xs text-slate-400 block mt-4">
                                Tap untuk lihat arti & contoh kalimat 🔄
                              </span>
                            </div>
                          ) : (
                            <div className="text-center py-2 space-y-3 animate-fade-in w-full">
                              <span className="text-3xl font-extrabold text-sky-400 block">
                                {currentVocab.meaning}
                              </span>
                              <span className="text-sm font-bold text-white block">
                                Romaji: {currentVocab.romaji}
                              </span>
                              <div className="text-xs space-y-1 text-slate-300 pt-2 border-t border-slate-800 text-left">
                                <strong className="text-slate-400 block mb-1">💬 Contoh Kalimat:</strong>
                                <p className="font-jp text-white">{currentVocab.exampleSentence.japanese}</p>
                                <p className="text-slate-400 italic">"{currentVocab.exampleSentence.indonesian}"</p>
                              </div>
                            </div>
                          )}

                          <div className="flex items-center gap-2 text-xs font-bold text-sky-400">
                            <Volume2
                              className="w-4 h-4 hover:scale-110 transition-transform"
                              onClick={(e) => {
                                e.stopPropagation();
                                speakJapanese({ kana: currentVocab.japanese, romaji: currentVocab.romaji, example: "", mnemonic: "" });
                              }}
                            />
                            <span>Audio Pelafalan</span>
                          </div>
                        </div>

                        {/* Navigation Controls */}
                        <div className="flex items-center justify-center gap-3 w-full">
                          <button
                            onClick={() => {
                              setVocabCardIndex((prev) => (prev > 0 ? prev - 1 : VOCABULARY_DATA.length - 1));
                              setIsVocabFlipped(false);
                            }}
                            className="flex-1 py-3 px-4 rounded-2xl bg-slate-950 hover:bg-slate-800 border border-slate-800 text-slate-300 font-bold text-xs transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                          >
                            <ChevronLeft className="w-4 h-4" />
                            <span>Sebelumnya</span>
                          </button>

                          <button
                            onClick={() => {
                              const rand = Math.floor(Math.random() * VOCABULARY_DATA.length);
                              setVocabCardIndex(rand);
                              setIsVocabFlipped(false);
                            }}
                            className="px-5 py-3 rounded-2xl bg-slate-950 hover:bg-slate-800 border border-slate-800 text-slate-300 font-bold text-xs transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                          >
                            <Shuffle className="w-4 h-4 text-sky-400" />
                            <span>Acak</span>
                          </button>

                          <button
                            onClick={() => {
                              setVocabCardIndex((prev) => (prev < VOCABULARY_DATA.length - 1 ? prev + 1 : 0));
                              setIsVocabFlipped(false);
                            }}
                            className="flex-1 py-3 px-4 rounded-2xl bg-sky-600 hover:bg-sky-500 text-white font-bold text-xs transition-all flex items-center justify-center gap-1.5 cursor-pointer shadow-lg shadow-sky-600/30"
                          >
                            <span>Selanjutnya</span>
                            <ChevronRight className="w-4 h-4" />
                          </button>
                        </div>
                      </>
                    );
                  })()}
                </div>
              )}

              {/* VIEW 3: LATIHAN MENULIS KOSAKATA */}
              {vocabViewMode === "write" && (
                <div className="flex flex-col items-center space-y-6 max-w-lg mx-auto animate-fade-in py-2">
                  {(() => {
                    const currentVocab = VOCABULARY_DATA[vocabCardIndex];
                    return (
                      <>
                        {/* Top Info Header */}
                        <div className="text-center space-y-1">
                          <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">
                            Latihan Menulis Kosakata ({vocabCardIndex + 1} dari {VOCABULARY_DATA.length})
                          </span>
                          <h3 className="text-xl font-extrabold text-white">
                            Goresan Kosakata 「<span className="text-sky-400 font-jp">{currentVocab.japanese}</span>」 ({currentVocab.meaning})
                          </h3>
                          <p className="text-xs text-slate-400">
                            Romaji: <strong className="text-sky-300">{currentVocab.romaji}</strong>
                          </p>
                        </div>

                        {/* Interactive Drawing Pad */}
                        <div className="relative w-full max-w-[320px] h-[320px] rounded-3xl bg-slate-950 border-2 border-sky-500/40 p-4 shadow-2xl flex items-center justify-center overflow-hidden touch-none">
                          
                          {/* Target Badge */}
                          <div className="absolute top-3 left-3 z-20 flex items-center gap-1.5 px-3 py-1 rounded-xl bg-slate-900/90 border border-slate-800 text-xs font-bold text-slate-200 pointer-events-none shadow">
                            <span className="text-[11px] text-slate-400 font-medium">Kata:</span>
                            <span className="text-sky-400 text-base font-extrabold font-jp">{currentVocab.japanese}</span>
                          </div>

                          {/* Controls */}
                          <div className="absolute top-3 right-3 z-20 flex items-center gap-1 bg-slate-900/95 p-1 rounded-xl border border-slate-800 shadow">
                            <button
                              onClick={() => setShowGuide(!showGuide)}
                              className="p-1.5 rounded-lg hover:bg-slate-800 text-slate-300 transition-colors cursor-pointer"
                              title={showGuide ? "Sembunyikan Jalur Panduan" : "Tampilkan Jalur Panduan"}
                            >
                              {showGuide ? <EyeOff className="w-4 h-4 text-sky-400" /> : <Eye className="w-4 h-4 text-slate-400" />}
                            </button>

                            <button
                              onClick={() => speakJapanese({ kana: currentVocab.japanese, romaji: currentVocab.romaji, example: "", mnemonic: "" })}
                              className="p-1.5 rounded-lg hover:bg-slate-800 text-slate-300 transition-colors cursor-pointer"
                              title="Putar Suara"
                            >
                              <Volume2 className="w-4 h-4 text-sky-400" />
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
                              <span className="text-7xl font-black text-sky-500/20 tracking-wider font-jp">
                                {currentVocab.japanese}
                              </span>
                            </div>
                          )}

                          {/* Grid Cross Lines */}
                          <div className="absolute inset-0 pointer-events-none border border-dashed border-slate-800/60 m-4 rounded-2xl flex items-center justify-center">
                            <div className="w-full h-[1px] bg-slate-800/40 absolute" />
                            <div className="h-full w-[1px] bg-slate-800/40 absolute" />
                          </div>

                          {/* Drawing Canvas Element */}
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
                            className="absolute inset-0 w-full h-full cursor-crosshair z-10"
                          />
                        </div>

                        {/* Navigation Controls */}
                        <div className="flex items-center justify-center gap-3 w-full">
                          <button
                            onClick={() => {
                              setVocabCardIndex((prev) => (prev > 0 ? prev - 1 : VOCABULARY_DATA.length - 1));
                              clearCanvas();
                            }}
                            className="flex-1 py-3 px-4 rounded-2xl bg-slate-950 hover:bg-slate-800 border border-slate-800 text-slate-300 font-bold text-xs transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                          >
                            <ChevronLeft className="w-4 h-4" />
                            <span>Sebelumnya</span>
                          </button>

                          <button
                            onClick={() => {
                              const rand = Math.floor(Math.random() * VOCABULARY_DATA.length);
                              setVocabCardIndex(rand);
                              clearCanvas();
                            }}
                            className="px-5 py-3 rounded-2xl bg-slate-950 hover:bg-slate-800 border border-slate-800 text-slate-300 font-bold text-xs transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                          >
                            <Shuffle className="w-4 h-4 text-sky-400" />
                            <span>Acak</span>
                          </button>

                          <button
                            onClick={() => {
                              setVocabCardIndex((prev) => (prev < VOCABULARY_DATA.length - 1 ? prev + 1 : 0));
                              clearCanvas();
                            }}
                            className="flex-1 py-3 px-4 rounded-2xl bg-sky-600 hover:bg-sky-500 text-white font-bold text-xs transition-all flex items-center justify-center gap-1.5 cursor-pointer shadow-lg shadow-sky-600/30"
                          >
                            <span>Selanjutnya</span>
                            <ChevronRight className="w-4 h-4" />
                          </button>
                        </div>
                      </>
                    );
                  })()}
                </div>
              )}

              {/* VIEW 4: KUIS KOSAKATA */}
              {vocabViewMode === "quiz" && (
                <div className="max-w-2xl mx-auto space-y-6 py-2 animate-fade-in text-center">
                  {vocabQuizIndex < VOCAB_QUIZZES.length ? (
                    <div className="p-6 sm:p-8 rounded-3xl bg-slate-950 border border-slate-800 shadow-2xl space-y-6 text-center">
                      <div className="flex items-center justify-between text-xs text-slate-400 border-b border-slate-800 pb-4">
                        <span>Pertanyaan {vocabQuizIndex + 1} dari {VOCAB_QUIZZES.length}</span>
                        <span className="font-bold text-sky-400">Skor: {vocabQuizScore}</span>
                      </div>

                      {(() => {
                        const currentQ = VOCAB_QUIZZES[vocabQuizIndex];
                        return (
                          <>
                            <div className="space-y-3 py-4">
                              <span className="text-4xl sm:text-5xl font-extrabold text-white font-jp block">
                                {currentQ.word}
                              </span>
                              <span className="text-sm font-semibold text-slate-300 block">
                                {currentQ.questionSentence}
                              </span>
                            </div>

                            <div className="grid grid-cols-2 gap-3">
                              {currentQ.options.map((opt) => {
                                const isSelected = vocabQuizSelectedOption === opt;
                                const isCorrect = opt === currentQ.correctAnswer;
                                let btnStyle = "bg-slate-900 border-slate-800 text-white hover:border-slate-700";
                                if (vocabQuizIsAnswered) {
                                  if (isCorrect) btnStyle = "bg-emerald-600 border-emerald-500 text-white font-bold shadow-lg shadow-emerald-600/30";
                                  else if (isSelected) btnStyle = "bg-rose-600 border-rose-500 text-white font-bold shadow-lg shadow-rose-600/30";
                                  else btnStyle = "bg-slate-900/50 border-slate-800/50 text-slate-500";
                                }
                                return (
                                  <button
                                    key={opt}
                                    disabled={vocabQuizIsAnswered}
                                    onClick={() => {
                                      setVocabQuizSelectedOption(opt);
                                      setVocabQuizIsAnswered(true);
                                      if (opt === currentQ.correctAnswer) {
                                        setVocabQuizScore((s) => s + 10);
                                        confetti({ particleCount: 60, spread: 60, origin: { y: 0.7 } });
                                      }
                                    }}
                                    className={`p-4 rounded-2xl border text-sm sm:text-base font-bold font-jp transition-all cursor-pointer ${btnStyle}`}
                                  >
                                    {opt}
                                  </button>
                                );
                              })}
                            </div>

                            {vocabQuizIsAnswered && (
                              <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 text-left space-y-3 animate-fade-in">
                                <div className="flex items-center gap-2">
                                  {vocabQuizSelectedOption === currentQ.correctAnswer ? (
                                    <span className="text-xs font-extrabold px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                                      Benar! 🎉
                                    </span>
                                  ) : (
                                    <span className="text-xs font-extrabold px-2.5 py-0.5 rounded-full bg-rose-500/20 text-rose-300 border border-rose-500/30">
                                      Kurang Tepat
                                    </span>
                                  )}
                                </div>
                                <p className="text-xs text-slate-300 leading-relaxed">
                                  {currentQ.explanation}
                                </p>
                                <button
                                  onClick={() => {
                                    setVocabQuizIndex((i) => i + 1);
                                    setVocabQuizSelectedOption(null);
                                    setVocabQuizIsAnswered(false);
                                  }}
                                  className="w-full py-3 rounded-xl bg-sky-600 hover:bg-sky-500 text-white font-bold text-xs transition-all flex items-center justify-center gap-1.5 cursor-pointer shadow-lg shadow-sky-600/30"
                                >
                                  <span>Lanjut Ke Pertanyaan Berikutnya</span>
                                  <ChevronRight className="w-4 h-4" />
                                </button>
                              </div>
                            )}
                          </>
                        );
                      })()}
                    </div>
                  ) : (
                    <div className="p-8 rounded-3xl bg-slate-950 border border-slate-800 text-center space-y-6 shadow-2xl">
                      <div className="w-20 h-20 rounded-full bg-sky-500/20 text-sky-400 border border-sky-500/30 flex items-center justify-center mx-auto text-3xl font-extrabold shadow-xl">
                        語
                      </div>
                      <div>
                        <h3 className="text-2xl font-bold text-white mb-1">
                          Kuis Kosakata Selesai!
                        </h3>
                        <p className="text-xs text-slate-400">
                          Kamu berhasil menyelesaikan kuis pemahaman kosakata sehari-hari.
                        </p>
                        <div className="mt-4 p-4 rounded-2xl bg-slate-900 border border-slate-800 max-w-xs mx-auto">
                          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-1">
                            Skor Akhir Kosakata:
                          </span>
                          <span className="text-4xl font-extrabold text-sky-400">
                            {vocabQuizScore} / {VOCAB_QUIZZES.length * 10}
                          </span>
                        </div>
                      </div>
                      <button
                        onClick={() => {
                          setVocabQuizIndex(0);
                          setVocabQuizScore(0);
                          setVocabQuizSelectedOption(null);
                          setVocabQuizIsAnswered(false);
                        }}
                        className="px-6 py-3 rounded-xl bg-sky-600 hover:bg-sky-500 text-white font-bold text-xs transition-all cursor-pointer shadow-lg shadow-sky-600/30 flex items-center justify-center gap-2 mx-auto"
                      >
                        <RotateCcw className="w-4 h-4" />
                        <span>Ulangi Kuis Kosakata</span>
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>
          )}
        </section>
        )}
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

      {/* FLOATING GLASSMORPHISM SPOTLIGHT DOCK (FOR KANA, KANJI & VOCABULARY) */}
      {selectedCourseId === "kana" && activeMnemonic && (
        <div className="fixed bottom-4 sm:bottom-6 left-1/2 -translate-x-1/2 z-50 w-[95%] max-w-2xl bg-slate-950/95 border border-rose-500/50 backdrop-blur-xl shadow-2xl shadow-rose-950/90 rounded-2xl p-4 sm:p-5 animate-fade-in flex items-center justify-between gap-4 text-left">
          <div className="flex items-center gap-3.5 min-w-0 flex-1">
            <div className="h-12 w-12 sm:h-14 sm:w-14 rounded-2xl bg-gradient-to-br from-rose-500 to-rose-700 text-white font-extrabold text-2xl sm:text-3xl flex items-center justify-center shadow-lg shadow-rose-500/30 shrink-0 font-jp border border-rose-400/40">
              {activeMnemonic.kana}
            </div>
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-sm sm:text-base font-extrabold text-white uppercase tracking-wide">
                  [{activeMnemonic.romaji}]
                </span>
                <span className="text-xs text-slate-400 font-mono font-jp truncate">({activeMnemonic.example})</span>
              </div>
              <p className="text-xs text-rose-300 font-semibold mt-1 leading-snug">
                🧠 {activeMnemonic.mnemonic}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={() => speakJapanese(activeMnemonic)}
              className="px-3.5 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs transition-all flex items-center gap-1.5 shadow-md shadow-rose-600/30 cursor-pointer"
            >
              <Volume2 className="w-4 h-4" />
              <span>Suara</span>
            </button>
            <button
              onClick={() => setActiveMnemonic(null)}
              className="p-2.5 rounded-xl bg-slate-900 text-slate-400 hover:text-white hover:bg-slate-800 transition-all cursor-pointer border border-slate-800"
              title="Tutup"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {selectedCourseId === "kanji" && activeKanji && (
        <div className="fixed bottom-4 sm:bottom-6 left-1/2 -translate-x-1/2 z-50 w-[95%] max-w-2xl bg-slate-950/95 border border-emerald-500/50 backdrop-blur-xl shadow-2xl shadow-emerald-950/90 rounded-2xl p-4 sm:p-5 animate-fade-in flex items-center justify-between gap-4 text-left">
          <div className="flex items-center gap-3.5 min-w-0 flex-1">
            <div className="h-12 w-12 sm:h-14 sm:w-14 rounded-2xl bg-gradient-to-br from-emerald-500 to-emerald-700 text-white font-extrabold text-2xl sm:text-3xl flex items-center justify-center shadow-lg shadow-emerald-500/30 shrink-0 font-jp border border-emerald-400/40">
              {activeKanji.kanji}
            </div>
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-sm sm:text-base font-extrabold text-white">
                  {activeKanji.meaning}
                </span>
                <span className="text-xs text-rose-300 font-mono font-extrabold px-2 py-0.5 rounded-full bg-rose-500/20 border border-rose-500/30">
                  [{activeKanji.romajiName}]
                </span>
                <span className="text-xs text-emerald-300 font-jp font-bold px-2 py-0.5 rounded-full bg-emerald-500/20 border border-emerald-500/30">
                  {activeKanji.kunyomi !== "ー" ? activeKanji.kunyomi : ""} {activeKanji.onyomi !== "ー" ? activeKanji.onyomi : ""}
                </span>
              </div>

              <p className="text-xs text-slate-300 mt-1 leading-snug">
                🧠 {activeKanji.mnemonic}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={() => speakJapanese({ kana: activeKanji.kanji, romaji: activeKanji.kunyomi[0] || activeKanji.onyomi[0], example: "", mnemonic: "" })}
              className="px-3.5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs transition-all flex items-center gap-1.5 shadow-md shadow-emerald-600/30 cursor-pointer"
            >
              <Volume2 className="w-4 h-4" />
              <span>Suara</span>
            </button>
            <button
              onClick={() => setActiveKanji(null)}
              className="p-2.5 rounded-xl bg-slate-900 text-slate-400 hover:text-white hover:bg-slate-800 transition-all cursor-pointer border border-slate-800"
              title="Tutup"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {selectedCourseId === "vocab" && activeVocab && (
        <div className="fixed bottom-4 sm:bottom-6 left-1/2 -translate-x-1/2 z-50 w-[95%] max-w-2xl bg-slate-950/95 border border-sky-500/50 backdrop-blur-xl shadow-2xl shadow-sky-950/90 rounded-2xl p-4 sm:p-5 animate-fade-in flex items-center justify-between gap-4 text-left">
          <div className="flex items-center gap-3.5 min-w-0 flex-1">
            <div className={`min-w-[56px] max-w-[130px] px-3.5 py-2.5 rounded-2xl bg-gradient-to-br from-sky-500 to-sky-700 text-white font-extrabold flex items-center justify-center shadow-lg shadow-sky-500/30 shrink-0 font-jp border border-sky-400/40 text-center leading-tight overflow-hidden ${
              activeVocab.japanese.length > 4 ? "text-xs" : activeVocab.japanese.length > 2 ? "text-sm sm:text-base" : "text-xl sm:text-2xl"
            }`}>
              <span className="whitespace-nowrap truncate">{activeVocab.japanese}</span>
            </div>

            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-sm sm:text-base font-extrabold text-white">
                  {activeVocab.meaning}
                </span>
                <span className="text-xs text-sky-300 font-mono font-bold">
                  [{activeVocab.romaji}]
                </span>
              </div>
              <p className="text-xs text-slate-300 font-jp mt-1 leading-snug">
                💬 {activeVocab.exampleSentence.japanese} ({activeVocab.exampleSentence.indonesian})
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={() => speakJapanese({ kana: activeVocab.japanese, romaji: activeVocab.romaji, example: "", mnemonic: "" })}
              className="px-3.5 py-2.5 rounded-xl bg-sky-600 hover:bg-sky-500 text-white font-bold text-xs transition-all flex items-center gap-1.5 shadow-md shadow-sky-600/30 cursor-pointer"
            >
              <Volume2 className="w-4 h-4" />
              <span>Suara</span>
            </button>
            <button
              onClick={() => setActiveVocab(null)}
              className="p-2.5 rounded-xl bg-slate-900 text-slate-400 hover:text-white hover:bg-slate-800 transition-all cursor-pointer border border-slate-800"
              title="Tutup"
            >
              <X className="w-4 h-4" />
            </button>
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
