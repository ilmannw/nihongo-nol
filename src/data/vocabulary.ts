export type VocabItem = {
  id: string;
  japanese: string; // e.g. "ごはん"
  kanji?: string;   // e.g. "ご飯"
  romaji: string;   // e.g. "Gohan"
  meaning: string;  // e.g. "Nasi / Makanan"
  scriptType: "hiragana" | "katakana" | "kanji_kana";
  category: "food" | "home" | "place" | "time" | "object";
  categoryLabel: string;
  exampleSentence: {
    japanese: string;
    romaji: string;
    indonesian: string;
  };
};

export type VocabQuizItem = {
  id: number;
  word: string;
  romaji: string;
  questionSentence: string;
  options: string[];
  correctAnswer: string;
  explanation: string;
};

export const VOCAB_CATEGORIES = [
  { id: "all", label: "Semua Kosakata (100)" },
  { id: "food", label: "🍎 Makanan & Minuman (20)" },
  { id: "home", label: "🏠 Rumah & Keluarga (20)" },
  { id: "place", label: "🏫 Tempat & Sekolah (20)" },
  { id: "time", label: "⏰ Waktu & Hari (20)" },
  { id: "object", label: "💼 Benda Sehari-Hari (20)" },
];

export const VOCABULARY_DATA: VocabItem[] = [
  // ==================== KATEGORI 1: MAKANAN & MINUMAN (20 ITEM) ====================
  { id: "gohan", japanese: "ごはん", kanji: "ご飯", romaji: "Gohan", meaning: "Nasi / Makanan", scriptType: "kanji_kana", category: "food", categoryLabel: "Makanan & Minuman", exampleSentence: { japanese: "毎日ごはんを食べます。", romaji: "Mainichi gohan o tabemasu.", indonesian: "Setiap hari saya makan nasi." } },
  { id: "omizu", japanese: "おみず", kanji: "お水", romaji: "Omizu", meaning: "Air Minum", scriptType: "kanji_kana", category: "food", categoryLabel: "Makanan & Minuman", exampleSentence: { japanese: "冷たいお水を飲みます。", romaji: "Tsumetai omizu o nomimasu.", indonesian: "Saya minum air dingin." } },
  { id: "pan", japanese: "パン", romaji: "Pan", meaning: "Roti", scriptType: "katakana", category: "food", categoryLabel: "Makanan & Minuman", exampleSentence: { japanese: "朝ごはんにパンを食べます。", romaji: "Asagohan ni pan o tabemasu.", indonesian: "Saya makan roti untuk sarapan." } },
  { id: "ocha", japanese: "おちゃ", kanji: "お茶", romaji: "Ocha", meaning: "Teh Hijau", scriptType: "kanji_kana", category: "food", categoryLabel: "Makanan & Minuman", exampleSentence: { japanese: "温かいお茶が好きです。", romaji: "Atatakai ocha ga suki desu.", indonesian: "Saya suka teh hijau hangat." } },
  { id: "niku", japanese: "にく", kanji: "肉", romaji: "Niku", meaning: "Daging", scriptType: "kanji_kana", category: "food", categoryLabel: "Makanan & Minuman", exampleSentence: { japanese: "牛肉を食べます。", romaji: "Gyuuniku o tabemasu.", indonesian: "Saya makan daging sapi." } },
  { id: "sakana", japanese: "さかな", kanji: "魚", romaji: "Sakana", meaning: "Ikan", scriptType: "kanji_kana", category: "food", categoryLabel: "Makanan & Minuman", exampleSentence: { japanese: "新鮮な魚を買いました。", romaji: "Shinsen na sakana o kaimashita.", indonesian: "Saya membeli ikan segar." } },
  { id: "kudamono", japanese: "くだもの", kanji: "果物", romaji: "Kudamono", meaning: "Buah-buahan", scriptType: "kanji_kana", category: "food", categoryLabel: "Makanan & Minuman", exampleSentence: { japanese: "果物は体にいいです。", romaji: "Kudamono wa karada ni ii desu.", indonesian: "Buah bagus untuk tubuh." } },
  { id: "yasai", japanese: "やさい", kanji: "野菜", romaji: "Yasai", meaning: "Sayuran", scriptType: "kanji_kana", category: "food", categoryLabel: "Makanan & Minuman", exampleSentence: { japanese: "毎日野菜を食べます。", romaji: "Mainichi yasai o tabemasu.", indonesian: "Saya makan sayur setiap hari." } },
  { id: "tamago", japanese: "たまご", kanji: "卵", romaji: "Tamago", meaning: "Telur", scriptType: "kanji_kana", category: "food", categoryLabel: "Makanan & Minuman", exampleSentence: { japanese: "朝卵を食べます。", romaji: "Asa tamago o tabemasu.", indonesian: "Saya makan telur di pagi hari." } },
  { id: "koohee", japanese: "コーヒー", romaji: "Koohee", meaning: "Kopi", scriptType: "katakana", category: "food", categoryLabel: "Makanan & Minuman", exampleSentence: { japanese: "砂糖なしのコーヒーを飲みます。", romaji: "Satou nashi no koohee o nomimasu.", indonesian: "Saya minum kopi tanpa gula." } },
  { id: "gyuunyuu", japanese: "ぎゅうにゅう", kanji: "牛乳", romaji: "Gyuunyuu", meaning: "Susu Sapi", scriptType: "kanji_kana", category: "food", categoryLabel: "Makanan & Minuman", exampleSentence: { japanese: "毎朝牛乳を飲みます。", romaji: "Maiasa gyuunyuu o nomimasu.", indonesian: "Saya minum susu sapi tiap pagi." } },
  { id: "juusu", japanese: "ジュース", romaji: "Juusu", meaning: "Jus Buah", scriptType: "katakana", category: "food", categoryLabel: "Makanan & Minuman", exampleSentence: { japanese: "リンゴジュースを飲みます。", romaji: "Ringo juusu o nomimasu.", indonesian: "Saya minum jus apel." } },
  { id: "suatou", japanese: "さとう", kanji: "砂糖", romaji: "Satou", meaning: "Gula", scriptType: "kanji_kana", category: "food", categoryLabel: "Makanan & Minuman", exampleSentence: { japanese: "砂糖を少し入れます。", romaji: "Satou o sukoshi iremasu.", indonesian: "Saya memasukkan sedikit gula." } },
  { id: "shio", japanese: "しお", kanji: "塩", romaji: "Shio", meaning: "Garam", scriptType: "kanji_kana", category: "food", categoryLabel: "Makanan & Minuman", exampleSentence: { japanese: "塩を振ります。", romaji: "Shio o furimasu.", indonesian: "Saya menaburkan garam." } },
  { id: "ramen", japanese: "ラーメン", romaji: "Raamen", meaning: "Ramen", scriptType: "katakana", category: "food", categoryLabel: "Makanan & Minuman", exampleSentence: { japanese: "温かいラーメンが好きです。", romaji: "Atatakai raamen ga suki desu.", indonesian: "Saya suka ramen hangat." } },
  { id: "sushi", japanese: "すし", kanji: "寿司", romaji: "Sushi", meaning: "Sushi", scriptType: "kanji_kana", category: "food", categoryLabel: "Makanan & Minuman", exampleSentence: { japanese: "日本で寿司を食べます。", romaji: "Nihon de sushi o tabemasu.", indonesian: "Makan sushi di Jepang." } },
  { id: "miso", japanese: "みそしる", kanji: "味噌汁", romaji: "Misoshiru", meaning: "Sup Miso", scriptType: "kanji_kana", category: "food", categoryLabel: "Makanan & Minuman", exampleSentence: { japanese: "味噌汁は美味しいです。", romaji: "Misoshiru wa oishii desu.", indonesian: "Sup Miso enak rasanya." } },
  { id: "ringo", japanese: "りんご", romaji: "Ringo", meaning: "Apel", scriptType: "hiragana", category: "food", categoryLabel: "Makanan & Minuman", exampleSentence: { japanese: "赤いりんごを食べます。", romaji: "Akai ringo o tabemasu.", indonesian: "Makan apel merah." } },
  { id: "mikan", japanese: "みかん", romaji: "Mikan", meaning: "Jeruk", scriptType: "hiragana", category: "food", categoryLabel: "Makanan & Minuman", exampleSentence: { japanese: "甘いみかんです。", romaji: "Amai mikan desu.", indonesian: "Jeruk yang manis." } },
  { id: "cake", japanese: "ケーキ", romaji: "Keeki", meaning: "Kue / Cake", scriptType: "katakana", category: "food", categoryLabel: "Makanan & Minuman", exampleSentence: { japanese: "誕生日にケーキを食べます。", romaji: "Tanjoubi ni keeki o tabemasu.", indonesian: "Makan kue saat ulang tahun." } },

  // ==================== KATEGORI 2: RUMAH & KELUARGA (20 ITEM) ====================
  { id: "ie", japanese: "いえ", kanji: "家", romaji: "Ie", meaning: "Rumah", scriptType: "kanji_kana", category: "home", categoryLabel: "Rumah & Keluarga", exampleSentence: { japanese: "家に帰ります。", romaji: "Ie ni kaerimasu.", indonesian: "Saya pulang ke rumah." } },
  { id: "heya", japanese: "へや", kanji: "部屋", romaji: "Heya", meaning: "Kamar / Ruangan", scriptType: "kanji_kana", category: "home", categoryLabel: "Rumah & Keluarga", exampleSentence: { japanese: "部屋は綺麗です。", romaji: "Heya wa kirei desu.", indonesian: "Kamarnya bersih." } },
  { id: "otousan", japanese: "おとうさん", kanji: "お父さん", romaji: "Otousan", meaning: "Ayah", scriptType: "kanji_kana", category: "home", categoryLabel: "Rumah & Keluarga", exampleSentence: { japanese: "お父さんは会社員です。", romaji: "Otousan wa kaishain desu.", indonesian: "Ayah saya pegawai kantor." } },
  { id: "okaasan", japanese: "おかあさん", kanji: "お母さん", romaji: "Okaasan", meaning: "Ibu", scriptType: "kanji_kana", category: "home", categoryLabel: "Rumah & Keluarga", exampleSentence: { japanese: "お母さんの料理は最高です。", romaji: "Okaasan no ryouri wa saikou desu.", indonesian: "Masakan ibu terbaik." } },
  { id: "tomodachi", japanese: "ともだち", kanji: "友達", romaji: "Tomodachi", meaning: "Teman / Sahabat", scriptType: "kanji_kana", category: "home", categoryLabel: "Rumah & Keluarga", exampleSentence: { japanese: "友達と遊びます。", romaji: "Tomodachi to asobimasu.", indonesian: "Bermain bersama teman." } },
  { id: "kazoku", japanese: "かぞく", kanji: "家族", romaji: "Kazoku", meaning: "Keluarga", scriptType: "kanji_kana", category: "home", categoryLabel: "Rumah & Keluarga", exampleSentence: { japanese: "家族が大好きです。", romaji: "Kazoku ga daisuki desu.", indonesian: "Saya sangat menyayangi keluarga." } },
  { id: "kodomo", japanese: "こども", kanji: "子供", romaji: "Kodomo", meaning: "Anak-anak", scriptType: "kanji_kana", category: "home", categoryLabel: "Rumah & Keluarga", exampleSentence: { japanese: "子供たちが公園で遊んでいます。", romaji: "Kodomotachi ga kouen de asonde imasu.", indonesian: "Anak-anak bermain di taman." } },
  { id: "neko", japanese: "ねこ", kanji: "猫", romaji: "Neko", meaning: "Kucing", scriptType: "kanji_kana", category: "home", categoryLabel: "Rumah & Keluarga", exampleSentence: { japanese: "可愛い猫がいます。", romaji: "Kawaii neko ga imasu.", indonesian: "Ada kucing lucu." } },
  { id: "inu", japanese: "いぬ", kanji: "犬", romaji: "Inu", meaning: "Anjing", scriptType: "kanji_kana", category: "home", categoryLabel: "Rumah & Keluarga", exampleSentence: { japanese: "大きな犬を飼っています。", romaji: "Ookina inu o katte imasu.", indonesian: "Saya memelihara anjing besar." } },
  { id: "niwa", japanese: "にわ", kanji: "庭", romaji: "Niwa", meaning: "Halaman / Taman Rumah", scriptType: "kanji_kana", category: "home", categoryLabel: "Rumah & Keluarga", exampleSentence: { japanese: "庭に花が咲いています。", romaji: "Niwa ni hana ga saite imasu.", indonesian: "Bunga mekar di halaman." } },
  { id: "dowa", japanese: "ドア", romaji: "Doa", meaning: "Pintu", scriptType: "katakana", category: "home", categoryLabel: "Rumah & Keluarga", exampleSentence: { japanese: "ドアを開けます。", romaji: "Doa o akemasu.", indonesian: "Saya membuka pintu." } },
  { id: "mado", japanese: "まど", kanji: "窓", romaji: "Mado", meaning: "Jendela", scriptType: "kanji_kana", category: "home", categoryLabel: "Rumah & Keluarga", exampleSentence: { japanese: "窓を閉めます。", romaji: "Mado o shimemasu.", indonesian: "Saya menutup jendela." } },
  { id: "tsukue", japanese: "つくえ", kanji: "机", romaji: "Tsukue", meaning: "Meja Belajar", scriptType: "kanji_kana", category: "home", categoryLabel: "Rumah & Keluarga", exampleSentence: { japanese: "机の上に本があります。", romaji: "Tsukue no ue ni hon ga arimasu.", indonesian: "Ada buku di atas meja." } },
  { id: "isu", japanese: "いす", kanji: "椅子", romaji: "Isu", meaning: "Kursi", scriptType: "kanji_kana", category: "home", categoryLabel: "Rumah & Keluarga", exampleSentence: { japanese: "椅子に座ります。", romaji: "Isu ni suwarimasu.", indonesian: "Duduk di kursi." } },
  { id: "terebi", japanese: "テレビ", romaji: "Terebi", meaning: "Televisi (TV)", scriptType: "katakana", category: "home", categoryLabel: "Rumah & Keluarga", exampleSentence: { japanese: "テレビを見ます。", romaji: "Terebi o mimasu.", indonesian: "Menonton TV." } },
  { id: "beddo", japanese: "ベッド", romaji: "Beddo", meaning: "Ranjang Tempat Tidur", scriptType: "katakana", category: "home", categoryLabel: "Rumah & Keluarga", exampleSentence: { japanese: "ベッドで寝ます。", romaji: "Beddo de nemasu.", indonesian: "Tidur di tempat tidur." } },
  { id: "oniisan", japanese: "おにいさん", kanji: "お兄さん", romaji: "Oniisan", meaning: "Kakak Laki-laki", scriptType: "kanji_kana", category: "home", categoryLabel: "Rumah & Keluarga", exampleSentence: { japanese: "お兄さんは背が高いです。", romaji: "Oniisan wa se ga takai desu.", indonesian: "Kakak laki-laki berbadan tinggi." } },
  { id: "oneesan", japanese: "おねえさん", kanji: "お姉さん", romaji: "Oneesan", meaning: "Kakak Perempuan", scriptType: "kanji_kana", category: "home", categoryLabel: "Rumah & Keluarga", exampleSentence: { japanese: "お姉さんは優しくしてくれます。", romaji: "Oneesan wa yasashiku shite kuremasu.", indonesian: "Kakak perempuan sangat baik." } },
  { id: "otouto", japanese: "おとうと", kanji: "弟", romaji: "Otouto", meaning: "Adik Laki-laki", scriptType: "kanji_kana", category: "home", categoryLabel: "Rumah & Keluarga", exampleSentence: { japanese: "弟とゲームをします。", romaji: "Otouto to geemu o shimasu.", indonesian: "Bermain game bersama adik." } },
  { id: "imouto", japanese: "いもうと", kanji: "妹", romaji: "Imouto", meaning: "Adik Perempuan", scriptType: "kanji_kana", category: "home", categoryLabel: "Rumah & Keluarga", exampleSentence: { japanese: "妹はとても可愛いです。", romaji: "Imouto wa totemo kawaii desu.", indonesian: "Adik perempuan sangat lucu." } },

  // ==================== KATEGORI 3: TEMPAT & SEKOLAH (20 ITEM) ====================
  { id: "gakkou", japanese: "がっこう", kanji: "学校", romaji: "Gakkou", meaning: "Sekolah", scriptType: "kanji_kana", category: "place", categoryLabel: "Tempat & Sekolah", exampleSentence: { japanese: "バスで学校へ行きます。", romaji: "Basu de gakkou e ikimasu.", indonesian: "Pergi ke sekolah naik bus." } },
  { id: "eki", japanese: "えき", kanji: "駅", romaji: "Eki", meaning: "Stasiun Kereta", scriptType: "kanji_kana", category: "place", categoryLabel: "Tempat & Sekolah", exampleSentence: { japanese: "駅で友達を待ちます。", romaji: "Eki de tomodachi o machimasu.", indonesian: "Menunggu teman di stasiun." } },
  { id: "byouin", japanese: "びょういん", kanji: "病院", romaji: "Byouin", meaning: "Rumah Sakit", scriptType: "kanji_kana", category: "place", categoryLabel: "Tempat & Sekolah", exampleSentence: { japanese: "病院へ行きました。", romaji: "Byouin e ikimashita.", indonesian: "Pergi ke rumah sakit." } },
  { id: "mise", japanese: "みせ", kanji: "店", romaji: "Mise", meaning: "Toko / Kedai", scriptType: "kanji_kana", category: "place", categoryLabel: "Tempat & Sekolah", exampleSentence: { japanese: "新しい店が開きました。", romaji: "Atarashii mise ga akimashita.", indonesian: "Toko baru telah dibuka." } },
  { id: "kouen", japanese: "こうえん", kanji: "公園", romaji: "Kouen", meaning: "Taman Kota", scriptType: "kanji_kana", category: "place", categoryLabel: "Tempat & Sekolah", exampleSentence: { japanese: "公園を散歩します。", romaji: "Kouen o sanpo shimasu.", indonesian: "Jalan-jalan di taman." } },
  { id: "toshokan", japanese: "としょかん", kanji: "図書館", romaji: "Toshokan", meaning: "Perpustakaan", scriptType: "kanji_kana", category: "place", categoryLabel: "Tempat & Sekolah", exampleSentence: { japanese: "図書館で勉強します。", romaji: "Toshokan de benkyou shimasu.", indonesian: "Belajar di perpustakaan." } },
  { id: "ginkou", japanese: "ぎんこう", kanji: "銀行", romaji: "Ginkou", meaning: "Bank", scriptType: "kanji_kana", category: "place", categoryLabel: "Tempat & Sekolah", exampleSentence: { japanese: "銀行でお金を下ろします。", romaji: "Ginkou de okane o oroshimasu.", indonesian: "Mengaambil uang di bank." } },
  { id: "yuubinkyoku", japanese: "ゆうびんきょく", kanji: "郵便局", romaji: "Yuubinkyoku", meaning: "Kantor Pos", scriptType: "kanji_kana", category: "place", categoryLabel: "Tempat & Sekolah", exampleSentence: { japanese: "郵便局で手紙を出します。", romaji: "Yuubinkyoku de tegami o dashimasu.", indonesian: "Mengirim surat di kantor pos." } },
  { id: "konbini", japanese: "コンビニ", romaji: "Konbini", meaning: "Minimarket 24 Jam", scriptType: "katakana", category: "place", categoryLabel: "Tempat & Sekolah", exampleSentence: { japanese: "コンビニでお弁当を買います。", romaji: "Konbini de obento o kaimasu.", indonesian: "Membeli bento di minimarket." } },
  { id: "depaato", japanese: "デパート", romaji: "Depaato", meaning: "Department Store / Mall", scriptType: "katakana", category: "place", categoryLabel: "Tempat & Sekolah", exampleSentence: { japanese: "デパートで買い物します。", romaji: "Depaato de kaimono shimasu.", indonesian: "Berbelanja di mall." } },
  { id: "kaisha", japanese: "かいしゃ", kanji: "会社", romaji: "Kaisha", meaning: "Perusahaan / Kantor", scriptType: "kanji_kana", category: "place", categoryLabel: "Tempat & Sekolah", exampleSentence: { japanese: "電車で会社に行きます。", romaji: "Densha de kaisha ni ikimasu.", indonesian: "Pergi ke kantor naik kereta." } },
  { id: "kyoushitsu", japanese: "きょうしつ", kanji: "教室", romaji: "Kyoushitsu", meaning: "Ruang Kelas", scriptType: "kanji_kana", category: "place", categoryLabel: "Tempat & Sekolah", exampleSentence: { japanese: "教室に先生がいます。", romaji: "Kyoushitsu ni sensei ga imasu.", indonesian: "Ada guru di ruang kelas." } },
  { id: "shokudou", japanese: "しょくどう", kanji: "食堂", romaji: "Shokudou", meaning: "Kantin / Ruang Makan", scriptType: "kanji_kana", category: "place", categoryLabel: "Tempat & Sekolah", exampleSentence: { japanese: "食堂で昼ご飯を食べます。", romaji: "Shokudou de hirugohan o tabemasu.", indonesian: "Makan siang di kantin." } },
  { id: "kisaen", japanese: "きっさてん", kanji: "喫茶店", romaji: "Kissaten", meaning: "Kedai Kopi Klasik", scriptType: "kanji_kana", category: "place", categoryLabel: "Tempat & Sekolah", exampleSentence: { japanese: "喫茶店でコーヒーを飲みます。", romaji: "Kissaten de koohee o nomimasu.", indonesian: "Minum kopi di kedai." } },
  { id: "resutoran", japanese: "レストラン", romaji: "Resutoran", meaning: "Restoran", scriptType: "katakana", category: "place", categoryLabel: "Tempat & Sekolah", exampleSentence: { japanese: "有名なレストランです。", romaji: "Yuumei na resutoran desu.", indonesian: "Restoran yang terkenal." } },
  { id: "hoteru", japanese: "ホテル", romaji: "Hoteru", meaning: "Hotel", scriptType: "katakana", category: "place", categoryLabel: "Tempat & Sekolah", exampleSentence: { japanese: "ホテルに泊まります。", romaji: "Hoteru ni tomarimasu.", indonesian: "Menginap di hotel." } },
  { id: "kuukou", japanese: "くうこう", kanji: "空港", romaji: "Kuukou", meaning: "Bandara (Airport)", scriptType: "kanji_kana", category: "place", categoryLabel: "Tempat & Sekolah", exampleSentence: { japanese: "空港へ友達を迎えに行きます。", romaji: "Kuukou e tomodachi o mukae ni ikimasu.", indonesian: "Menjemput teman ke bandara." } },
  { id: "umi", japanese: "うみ", kanji: "海", romaji: "Umi", meaning: "Laut / Pantai", scriptType: "kanji_kana", category: "place", categoryLabel: "Tempat & Sekolah", exampleSentence: { japanese: "夏休みに海へ行きます。", romaji: "Natsuyasumi ni umi e ikimasu.", indonesian: "Pergi ke laut saat liburan musim panas." } },
  { id: "yama", japanese: "やま", kanji: "山", romaji: "Yama", meaning: "Gunung", scriptType: "kanji_kana", category: "place", categoryLabel: "Tempat & Sekolah", exampleSentence: { japanese: "富士山は高いです。", romaji: "Fujisan wa takai desu.", indonesian: "Gunung Fuji sangat tinggi." } },
  { id: "machi", japanese: "まち", kanji: "町", romaji: "Machi", meaning: "Kota / Kota Kecil", scriptType: "kanji_kana", category: "place", categoryLabel: "Tempat & Sekolah", exampleSentence: { japanese: "静かな町です。", romaji: "Shizuka na machi desu.", indonesian: "Kota yang tenang." } },

  // ==================== KATEGORI 4: WAKTU & HARI (20 ITEM) ====================
  { id: "kyou", japanese: "きょう", kanji: "今日", romaji: "Kyou", meaning: "Hari Ini", scriptType: "kanji_kana", category: "time", categoryLabel: "Waktu & Hari", exampleSentence: { japanese: "今日はとても暑いです。", romaji: "Kyou wa totemo atsui desu.", indonesian: "Hari ini sangat panas." } },
  { id: "ashita", japanese: "あした", kanji: "明日", romaji: "Ashita", meaning: "Besok", scriptType: "kanji_kana", category: "time", categoryLabel: "Waktu & Hari", exampleSentence: { japanese: "明日テストがあります。", romaji: "Ashita tesuto ga arimasu.", indonesian: "Besok ada ujian." } },
  { id: "kinou", japanese: "きのう", kanji: "昨日", romaji: "Kinou", meaning: "Kemarin", scriptType: "kanji_kana", category: "time", categoryLabel: "Waktu & Hari", exampleSentence: { japanese: "昨日本を買いました。", romaji: "Kinou hon o kaimashita.", indonesian: "Kemarin saya membeli buku." } },
  { id: "ima", japanese: "いま", kanji: "今", romaji: "Ima", meaning: "Sekarang", scriptType: "kanji_kana", category: "time", categoryLabel: "Waktu & Hari", exampleSentence: { japanese: "今何時ですか。", romaji: "Ima nanji desu ka.", indonesian: "Sekarang jam berapa?" } },
  { id: "asa", japanese: "あさ", kanji: "朝", romaji: "Asa", meaning: "Pagi Hari", scriptType: "kanji_kana", category: "time", categoryLabel: "Waktu & Hari", exampleSentence: { japanese: "毎朝6時に起きます。", romaji: "Maiasa rokuji ni okimasu.", indonesian: "Tiap pagi bangun jam 6." } },
  { id: "hiru", japanese: "ひる", kanji: "昼", romaji: "Hiru", meaning: "Siang Hari", scriptType: "kanji_kana", category: "time", categoryLabel: "Waktu & Hari", exampleSentence: { japanese: "昼ご飯を食べます。", romaji: "Hirugohan o tabemasu.", indonesian: "Makan siang." } },
  { id: "yoru", japanese: "よる", kanji: "夜", romaji: "Yoru", meaning: "Malam Hari", scriptType: "kanji_kana", category: "time", categoryLabel: "Waktu & Hari", exampleSentence: { japanese: "夜早めに寝ます。", romaji: "Yoru hayame ni nemasu.", indonesian: "Tidur lebih awal di malam hari." } },
  { id: "ban", japanese: "ばん", kanji: "晩", romaji: "Ban", meaning: "Malam (Keterangan Waktu)", scriptType: "kanji_kana", category: "time", categoryLabel: "Waktu & Hari", exampleSentence: { japanese: "今晩友達と会います。", romaji: "Konban tomodachi to aimasu.", indonesian: "Malam ini bertemu teman." } },
  { id: "mainichi", japanese: "まいにち", kanji: "毎日", romaji: "Mainichi", meaning: "Setiap Hari", scriptType: "kanji_kana", category: "time", categoryLabel: "Waktu & Hari", exampleSentence: { japanese: "毎日日本語を勉強します。", romaji: "Mainichi Nihongo o benkyou shimasu.", indonesian: "Setiap hari belajar bahasa Jepang." } },
  { id: "maiasa", japanese: "まいあさ", kanji: "毎朝", romaji: "Maiasa", meaning: "Setiap Pagi", scriptType: "kanji_kana", category: "time", categoryLabel: "Waktu & Hari", exampleSentence: { japanese: "毎朝ジョギングをします。", romaji: "Maiasa jogingu o shimasu.", indonesian: "Setiap pagi jogging." } },
  { id: "maiban", japanese: "まいばん", kanji: "毎晩", romaji: "Maiban", meaning: "Setiap Malam", scriptType: "kanji_kana", category: "time", categoryLabel: "Waktu & Hari", exampleSentence: { japanese: "毎晩本を読みます。", romaji: "Maiban hon o yomimasu.", indonesian: "Setiap malam membaca buku." } },
  { id: "konshu", japanese: "こんしゅう", kanji: "今週", romaji: "Konshuu", meaning: "Minggu Ini", scriptType: "kanji_kana", category: "time", categoryLabel: "Waktu & Hari", exampleSentence: { japanese: "今週は忙しいです。", romaji: "Konshuu wa isogashii desu.", indonesian: "Minggu ini sibuk." } },
  { id: "raishu", japanese: "らいしゅう", kanji: "来週", romaji: "Raishuu", meaning: "Minggu Depan", scriptType: "kanji_kana", category: "time", categoryLabel: "Waktu & Hari", exampleSentence: { japanese: "来週旅行に行きます。", romaji: "Raishuu ryokou ni ikimasu.", indonesian: "Minggu depan pergi liburan." } },
  { id: "senshu", japanese: "せんしゅう", kanji: "先週", romaji: "Senshuu", meaning: "Minggu Lalu", scriptType: "kanji_kana", category: "time", categoryLabel: "Waktu & Hari", exampleSentence: { japanese: "先週休みでした。", romaji: "Senshuu yasumi deshita.", indonesian: "Minggu lalu libur." } },
  { id: "kongetsu", japanese: "こんげつ", kanji: "今月", romaji: "Kongetsu", meaning: "Bulan Ini", scriptType: "kanji_kana", category: "time", categoryLabel: "Waktu & Hari", exampleSentence: { japanese: "今月お祭りがあります。", romaji: "Kongetsu omatsuri ga arimasu.", indonesian: "Bulan ini ada festival." } },
  { id: "raigetsu", japanese: "らいげつ", kanji: "来月", romaji: "Raigetsu", meaning: "Bulan Depan", scriptType: "kanji_kana", category: "time", categoryLabel: "Waktu & Hari", exampleSentence: { japanese: "来月帰国します。", romaji: "Raigetsu kikoku shimasu.", indonesian: "Bulan depan pulang ke negara asal." } },
  { id: "kotoshi", japanese: "ことし", kanji: "今年", romaji: "Kotoshi", meaning: "Tahun Ini", scriptType: "kanji_kana", category: "time", categoryLabel: "Waktu & Hari", exampleSentence: { japanese: "今年二十歳になります。", romaji: "Kotoshi hatachi ni narimasu.", indonesian: "Tahun ini berusia 20 tahun." } },
  { id: "rainen", japanese: "らいねん", kanji: "来年", romaji: "Rainen", meaning: "Tahun Depan", scriptType: "kanji_kana", category: "time", categoryLabel: "Waktu & Hari", exampleSentence: { japanese: "来年日本に留学します。", romaji: "Rainen Nihon ni ryuugaku shimasu.", indonesian: "Tahun depan kuliah di Jepang." } },
  { id: "kyonen", japanese: "きょねん", kanji: "去年", romaji: "Kyonen", meaning: "Tahun Lalu", scriptType: "kanji_kana", category: "time", categoryLabel: "Waktu & Hari", exampleSentence: { japanese: "去年卒業しました。", romaji: "Kyonen sotsugyou shimashita.", indonesian: "Tahun lalu lulus sekolah." } },
  { id: "shuumatsu", japanese: "しゅうまつ", kanji: "週末", romaji: "Shuumatsu", meaning: "Akhir Pekan (Weekend)", scriptType: "kanji_kana", category: "time", categoryLabel: "Waktu & Hari", exampleSentence: { japanese: "週末映画を見ます。", romaji: "Shuumatsu eiga o mimasu.", indonesian: "Nonton film saat akhir pekan." } },

  // ==================== KATEGORI 5: BENDA SEHARI-HARI (20 ITEM) ====================
  { id: "hon", japanese: "ほん", kanji: "本", romaji: "Hon", meaning: "Buku", scriptType: "kanji_kana", category: "object", categoryLabel: "Benda Sehari-Hari", exampleSentence: { japanese: "日本語の本を読みます。", romaji: "Nihongo no hon o yomimasu.", indonesian: "Membaca buku bahasa Jepang." } },
  { id: "pen", japanese: "ペン", romaji: "Pen", meaning: "Pulpen", scriptType: "katakana", category: "object", categoryLabel: "Benda Sehari-Hari", exampleSentence: { japanese: "黒いペンで書きます。", romaji: "Kuroi pen de kakimasu.", indonesian: "Menulis dengan pulpen hitam." } },
  { id: "enpitsu", japanese: "えんぴつ", kanji: "鉛筆", romaji: "Enpitsu", meaning: "Pensil", scriptType: "kanji_kana", category: "object", categoryLabel: "Benda Sehari-Hari", exampleSentence: { japanese: "鉛筆を削ります。", romaji: "Enpitsu o kezurimasu.", indonesian: "Meraut pensil." } },
  { id: "kaban", japanese: "かばん", kanji: "鞄", romaji: "Kaban", meaning: "Tas", scriptType: "kanji_kana", category: "object", categoryLabel: "Benda Sehari-Hari", exampleSentence: { japanese: "重い鞄を持っています。", romaji: "Omoi kaban o motte imasu.", indonesian: "Membawa tas yang berat." } },
  { id: "kuruma", japanese: "くるま", kanji: "車", romaji: "Kuruma", meaning: "Mobil", scriptType: "kanji_kana", category: "object", categoryLabel: "Benda Sehari-Hari", exampleSentence: { japanese: "白い車に乗ります。", romaji: "Shiroi kuruma ni norimasu.", indonesian: "Naik mobil putih." } },
  { id: "jidensha", japanese: "じてんしゃ", kanji: "自転車", romaji: "Jitensha", meaning: "Sepeda", scriptType: "kanji_kana", category: "object", categoryLabel: "Benda Sehari-Hari", exampleSentence: { japanese: "自転車で学校に行きます。", romaji: "Jitensha de gakkou ni ikimasu.", indonesian: "Pergi ke sekolah naik sepeda." } },
  { id: "densha", japanese: "でんしゃ", kanji: "電車", romaji: "Densha", meaning: "Kereta Listrik", scriptType: "kanji_kana", category: "object", categoryLabel: "Benda Sehari-Hari", exampleSentence: { japanese: "電車が来ました。", romaji: "Densha ga kimashita.", indonesian: "Kereta telah datang." } },
  { id: "keitai", japanese: "けいたい", kanji: "携帯", romaji: "Keitai", meaning: "Handphone (HP)", scriptType: "kanji_kana", category: "object", categoryLabel: "Benda Sehari-Hari", exampleSentence: { japanese: "携帯で写真を撮ります。", romaji: "Keitai de shashin o torimasu.", indonesian: "Foto menggunakan HP." } },
  { id: "kasa", japanese: "かさ", kanji: "傘", romaji: "Kasa", meaning: "Payung", scriptType: "kanji_kana", category: "object", categoryLabel: "Benda Sehari-Hari", exampleSentence: { japanese: "雨が降るので傘をさします。", romaji: "Ame ga furu node kasa o sashimasu.", indonesian: "Memakai payung karena hujan." } },
  { id: "kagi", japanese: "かぎ", kanji: "鍵", romaji: "Kagi", meaning: "Kunci", scriptType: "kanji_kana", category: "object", categoryLabel: "Benda Sehari-Hari", exampleSentence: { japanese: "部屋の鍵を失くしました。", romaji: "Heya no kagi o nakushimashita.", indonesian: "Kunci kamar saya hilang." } },
  { id: "tokei", japanese: "とけい", kanji: "時計", romaji: "Tokei", meaning: "Jam / Arloji", scriptType: "kanji_kana", category: "object", categoryLabel: "Benda Sehari-Hari", exampleSentence: { japanese: "高い時計を買いました。", romaji: "Takai tokei o kaimashita.", indonesian: "Membeli jam mahal." } },
  { id: "shashin", japanese: "しゃしん", kanji: "写真", romaji: "Shashin", meaning: "Foto / Gambar", scriptType: "kanji_kana", category: "object", categoryLabel: "Benda Sehari-Hari", exampleSentence: { japanese: "家族の写真を見ます。", romaji: "Kazoku no shashin o mimasu.", indonesian: "Melihat foto keluarga." } },
  { id: "tegami", japanese: "てがみ", kanji: "手紙", romaji: "Tegami", meaning: "Surat", scriptType: "kanji_kana", category: "object", categoryLabel: "Benda Sehari-Hari", exampleSentence: { japanese: "友達に手紙を書きます。", romaji: "Tomodachi ni tegami o kakimasu.", indonesian: "Menulis surat untuk teman." } },
  { id: "fuku", japanese: "ふく", kanji: "服", romaji: "Fuku", meaning: "Pakaian / Baju", scriptType: "kanji_kana", category: "object", categoryLabel: "Benda Sehari-Hari", exampleSentence: { japanese: "新しい服を着ます。", romaji: "Atarashii fuku o kimasu.", indonesian: "Memakai baju baru." } },
  { id: "kutsu", japanese: "くつ", kanji: "靴", romaji: "Kutsu", meaning: "Sepatu", scriptType: "kanji_kana", category: "object", categoryLabel: "Benda Sehari-Hari", exampleSentence: { japanese: "玄関で靴を脱ぎます。", romaji: "Genkan de kutsu o nugimasu.", indonesian: "Melepas sepatu di genkan." } },
  { id: "megane", japanese: "めがね", kanji: "眼鏡", romaji: "Megane", meaning: "Kacamata", scriptType: "kanji_kana", category: "object", categoryLabel: "Benda Sehari-Hari", exampleSentence: { japanese: "眼鏡をかけます。", romaji: "Megane o kakemasu.", indonesian: "Memakai kacamata." } },
  { id: "saifu", japanese: "さいふ", kanji: "財布", romaji: "Saifu", meaning: "Dompet", scriptType: "kanji_kana", category: "object", categoryLabel: "Benda Sehari-Hari", exampleSentence: { japanese: "財布にお金があります。", romaji: "Saifu ni okane ga arimasu.", indonesian: "Ada uang di dalam dompet." } },
  { id: "okane", japanese: "おかね", kanji: "お金", romaji: "Okane", meaning: "Uang", scriptType: "kanji_kana", category: "object", categoryLabel: "Benda Sehari-Hari", exampleSentence: { japanese: "お金を大切にします。", romaji: "Okane o taisetsu ni shimasu.", indonesian: "Menghargai uang." } },
  { id: "kippu", japanese: "きっぷ", kanji: "切符", romaji: "Kippu", meaning: "Tiket", scriptType: "kanji_kana", category: "object", categoryLabel: "Benda Sehari-Hari", exampleSentence: { japanese: "電車の切符を買います。", romaji: "Densha no kippu o kaimashita.", indonesian: "Membeli tiket kereta." } },
  { id: "shimbun", japanese: "しんぶん", kanji: "新聞", romaji: "Shimbun", meaning: "Koran / Surat Kabar", scriptType: "kanji_kana", category: "object", categoryLabel: "Benda Sehari-Hari", exampleSentence: { japanese: "毎朝新聞を読みます。", romaji: "Maiasa shimbun o yomimasu.", indonesian: "Membaca koran tiap pagi." } },
];

export const VOCAB_QUIZ_QUESTIONS: VocabQuizItem[] = [
  {
    id: 1,
    word: "ごはん (Gohan)",
    romaji: "Gohan",
    questionSentence: "Apa arti dari kosakata 「ごはん」?",
    options: ["Nasi / Makanan", "Air Minum", "Roti", "Teh Hijau"],
    correctAnswer: "Nasi / Makanan",
    explanation: "「ごはん」 (Gohan) berarti Nasi atau Makanan sehari-hari.",
  },
  {
    id: 2,
    word: "家 (Ie)",
    romaji: "Ie",
    questionSentence: "Kata 「いえ (Ie)」 memiliki arti...?",
    options: ["Rumah", "Sekolah", "Stasiun", "Toko"],
    correctAnswer: "Rumah",
    explanation: "「家 (いえ)」 (Ie) berarti Rumah.",
  },
  {
    id: 3,
    word: "学校 (Gakkou)",
    romaji: "Gakkou",
    questionSentence: "Manakah bacaan Romaji yang benar untuk 「学校」?",
    options: ["Gakkou", "Gakko", "Koukou", "Daigaku"],
    correctAnswer: "Gakkou",
    explanation: "「学校」 dibaca 'Gakkou' yang berarti Sekolah.",
  },
  {
    id: 4,
    word: "今日 (Kyou)",
    romaji: "Kyou",
    questionSentence: "Kosakata 「今日 (きょう)」 merujuk pada keterangan waktu apa?",
    options: ["Hari Ini", "Besok", "Kemarin", "Lusa"],
    correctAnswer: "Hari Ini",
    explanation: "「今日」 (Kyou) berarti Hari Ini.",
  },
  {
    id: 5,
    word: "友達 (Tomodachi)",
    romaji: "Tomodachi",
    questionSentence: "Apa arti dari 「友達 (ともだち)」?",
    options: ["Teman / Sahabat", "Ayah", "Ibu", "Guru"],
    correctAnswer: "Teman / Sahabat",
    explanation: "「友達」 (Tomodachi) berarti Teman atau Sahabat.",
  },
  {
    id: 6,
    word: "本 (Hon)",
    romaji: "Hon",
    questionSentence: "Benda apakah yang dimaksud dengan kata 「本 (ほん)」?",
    options: ["Buku", "Pulpen", "Tas", "Mobil"],
    correctAnswer: "Buku",
    explanation: "「本」 (Hon) berarti Buku.",
  },
  {
    id: 7,
    word: "パン (Pan)",
    romaji: "Pan",
    questionSentence: "Mengapa kata 「パン」 ditulis menggunakan Katakana?",
    options: ["Karena kata serapan dari bahasa asing (Roti)", "Karena kata sifat", "Karena nama orang Jepang", "Karena tata bahasa khusus"],
    correctAnswer: "Karena kata serapan dari bahasa asing (Roti)",
    explanation: "「パン」 berasal dari bahasa Portugis 'pão' (roti), sehingga kata serapan ditulis dengan huruf Katakana.",
  },
  {
    id: 8,
    word: "駅 (Eki)",
    romaji: "Eki",
    questionSentence: "Apa arti dari tempat 「駅 (えき)」?",
    options: ["Stasiun Kereta", "Rumah Sakit", "Bandara", "Perpustakaan"],
    correctAnswer: "Stasiun Kereta",
    explanation: "「駅」 (Eki) berarti Stasiun Kereta.",
  },
];
