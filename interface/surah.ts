interface ListSurah {
  id: number;
  revelation_place: string;
  revelation_order: number;
  name_simple: string;
  name_complex: string;
  name_arabic: string;
  verses_count: number;
  translated_name: {
    name: string;
  };
}

interface Surah {
  text_uthmani: string;
  translations: Translation;
  audio: string;
}

interface Translation {
  text: string;
}

interface SurahResponse {
  text_uthmani: string;
  translations: Translation[];
  audio: {
    url: string;
  }
}

interface Recitations {
  id: number;
  reciter_name: string;
}