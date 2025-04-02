"use client"

import { getRecitations, getSurah } from "@/services/getData";
import { useParams } from "next/navigation";
import { useEffect, useState, useRef } from "react";

export default function Surah() {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [surah, setSurah] = useState<Surah[]>();
  const [nama, setNama] = useState<string>();
  const [recitations, setRecitations] = useState<Recitations[]>();
  const [selectedRecitation, setSelectedRecitation] = useState<number>(1);
  const audioRefs = useRef<(HTMLAudioElement | null)[]>([]);
  const [playingIndex, setPlayingIndex] = useState<number | null>(null);
  const params = useParams();
  const { nomor } = params;

  const init = async () => {
    const namaSurah = localStorage.getItem('nama');
    const verses_count = localStorage.getItem('verses_count');
    if(namaSurah && verses_count) {
      setNama(namaSurah);
      const recitationsResponse: Recitations[] = await getRecitations(null);
      setRecitations(recitationsResponse);
      await getSurahData(Number(verses_count));
    }
  }

  const getSurahData = async (verses_count: number) => {
    const response: SurahResponse[] = await getSurah(setIsLoading, Number(nomor), verses_count, selectedRecitation);
    setSurah(response.map((value: SurahResponse) => ({
      ...value,
      translations: value.translations[0],
      audio: value.audio.url
    })));
  }

  const handlePlay = (index: number) => {
    audioRefs.current.forEach((audio: HTMLAudioElement | null, i: number) => {
      if(audio && i !== index) {
        audio.pause();
        audio.currentTime = 0;
      }
    });
    setPlayingIndex(index);
  }

  const handleEnded = (index: number) => {
    if(surah && index < surah.length - 1) {
      const nextAudio = audioRefs.current[index + 1];
      if(nextAudio) {
        nextAudio.play();
        setPlayingIndex(index + 1);
      }
    } else {
      setPlayingIndex(null);
    }
  }

  useEffect(() => {
    const verses_count = localStorage.getItem('verses_count');
    if(verses_count)
      getSurahData(Number(verses_count));
  }, [selectedRecitation])

  useEffect(() => {
    if(isLoading && !surah && !nama && !recitations) {
      init();
    }
  }, []);

  if(!isLoading && surah && nama && recitations)
    return (
      <div className="flex flex-col gap-10 w-full h-full overflow-scroll p-3">
        <h1 className="font-black text-black text-xl text-center">{nama}</h1>
        <select 
          name="recitations" 
          id="recitations"
          value={selectedRecitation}
          className="w-64"
          onChange={(e  ) => { console.log(e.target.value); setSelectedRecitation(Number(e.target.value)) }}
        >
          {
            recitations.map((value: Recitations, index: number) => (
              <option key={index} value={value.id}>{value.reciter_name}</option>
            ))
          }
        </select>
        <div className="flex flex-col gap-3 w-full h-max px-3 py-1">
          {
            surah.map((value: Surah, index: number) => (
              <div key={index} className="bg-green-300 flex flex-col gap-2 px-4 py-5">
                <audio 
                  ref={(element: HTMLAudioElement) => {
                    audioRefs.current[index] = element || null
                  }}
                  onPlay={() => handlePlay(index)}
                  onEnded={() => handleEnded(index)}
                  controls
                >
                  <source src={"https://verses.quran.com/"+value.audio} type="audio/mpeg" />
                  Browser anda tidak mendukung pemutaran audio
                </audio>
                <p>{value.text_uthmani}</p>
                <div dangerouslySetInnerHTML={{ __html: value.translations.text }} />
              </div>
            ))
          }
        </div>
      </div>
    );
}