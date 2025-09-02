export interface Ayah {
  number: number;
  text: string;
  translation: string;
  juz: number;
}

export interface Surah {
  number: number;
  name: string;
  meaning: string;
  location: "Mekkah" | "Madinah";
  ayahs: Ayah[];
}

export class AlQuran {
  surahs: Surah[];

  constructor() {
    this.surahs = [
      {
        number: 1,
        name: "Al-Fatihah",
        meaning: "Pembukaan",
        location: "Mekkah",
        ayahs: [
          {
            number: 1,
            text: "بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ",
            translation:
              "Dengan nama Allah Yang Maha Pengasih, Maha Penyayang.",
            juz: 1,
          },
          {
            number: 2,
            text: "الْحَمْدُ لِلَّهِ رَبِّ الْعَالَمِينَ",
            translation: "Segala puji bagi Allah, Tuhan seluruh alam.",
            juz: 1,
          },
          {
            number: 3,
            text: "الرَّحْمَٰنِ الرَّحِيمِ",
            translation: "Yang Maha Pengasih, Maha Penyayang.",
            juz: 1,
          },
          {
            number: 4,
            text: "مَالِكِ يَوْمِ الدِّينِ",
            translation: "Pemilik hari pembalasan.",
            juz: 1,
          },
          {
            number: 5,
            text: "إِيَّاكَ نَعْبُدُ وَإِيَّاكَ نَسْتَعِينُ",
            translation:
              "Hanya kepada Engkaulah kami menyembah dan hanya kepada Engkaulah kami mohon pertolongan.",
            juz: 1,
          },
          {
            number: 6,
            text: "اهْدِنَا الصِّرَاطَ الْمُسْتَقِيمَ",
            translation: "Tunjukilah kami jalan yang lurus,",
            juz: 1,
          },
          {
            number: 7,
            text: "صِرَاطَ الَّذِينَ أَنْعَمْتَ عَلَيْهِمْ ...",
            translation:
              "Yaitu jalan orang-orang yang telah Engkau beri nikmat ...",
            juz: 1,
          },
        ],
      },
      {
        number: 2,
        name: "Al-Baqarah",
        meaning: "Sapi Betina",
        location: "Madinah",
        ayahs: [
          {
            number: 1,
            text: "الم",
            translation: "Alif Lam Mim.",
            juz: 1,
          },
          {
            number: 2,
            text: "ذَٰلِكَ الْكِتَابُ لَا رَيْبَ ۛ فِيهِ ...",
            translation:
              "Kitab (Al-Qur’an) ini tidak ada keraguan padanya; petunjuk bagi mereka yang bertakwa.",
            juz: 1,
          },
          {
            number: 3,
            text: "الَّذِينَ يُؤْمِنُونَ بِالْغَيْبِ ...",
            translation: "Yaitu mereka yang beriman kepada yang gaib ...",
            juz: 1,
          },
          // Tambah lebih banyak ayat dari surah 2 dengan masing-masing juz jika melintasi juz
        ],
      },
      // Tambah surah lainnya dengan struktur yang sama
    ];
  }

  getAllSurahs(): Surah[] {
    return this.surahs;
  }

  getSurahByNumber(number: number): Surah | undefined {
    return this.surahs.find((s) => s.number === number);
  }

  searchSurahByName(name: string): Surah[] {
    return this.surahs.filter((s) =>
      s.name.toLowerCase().includes(name.toLowerCase())
    );
  }
}
