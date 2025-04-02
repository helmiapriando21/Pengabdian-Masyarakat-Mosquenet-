"use client"

import Calendar from 'react-calendar';
import { useState, useEffect } from 'react';
import CalendarLabel from './calendarLabel';
import { getKegiatanMasjid } from '@/services/getData';
import { ListActivities } from '@/interface/activity';

interface CalendarElementProps {
  masjid_id?: string | null
};

export default function CalendarElement({ masjid_id }: CalendarElementProps) {
    const [event, setEvent] = useState<ListActivities[]>();
    const [eventMonth, setEventMonth] = useState<ListActivities[]>();
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [now, setNow] = useState(new Date());

    useEffect(() => {
      const init = async () => {
        const data = await getKegiatanMasjid(setIsLoading, masjid_id || null);
        setEvent(data);
      }
  
      if(isLoading) {
        init();
      }
    }, [isLoading]);

    useEffect(() => {
        const interval = setInterval(() => {
            setNow(new Date());
        }, 100);

        return () => clearInterval(interval);
    }, []);

    const todayClassList = ({ date }: { date: Date }) => {
        const defaultClass = "border-black items-center text-center py-[10px] border-white border-[5px] text-xs font-bold ";

        if(
            date.getFullYear() === now.getFullYear() &&
            date.getMonth() === now.getMonth() &&
            date.getDate() === now.getDate()
        ) {
            return defaultClass + "bg-[#EBBB20] text-white ";
        } else if(
          event &&
          event.find(value => (
            new Date(value.date).getFullYear() === date.getFullYear() &&
            new Date(value.date).getMonth() === date.getMonth() &&
            new Date(value.date).getDate() === date.getDate()
          ))
        ) {
          return defaultClass + "bg-green-900 text-white ";
        } else return defaultClass + "bg-[#FFDE72] hover:bg-[#EBBB20] hover:text-white ";
    }

    const filterEventByMonth = (date: Date) => {
      if(event) {
        const filtered = event.filter(value => (
          new Date(value.date).getFullYear() === date.getFullYear() &&
          new Date(value.date).getMonth() === date.getMonth()
        ));
        setEventMonth(filtered);
      }
    }

    if(!isLoading && event) 
      return (
          <div className="flex flex-col gap-2 items-center justify-center p-5 bg-[#05934a8f] rounded-xl">
              <Calendar 
                  tileClassName={todayClassList}
                  value={new Date()}
                  prevLabel={<CalendarLabel label="<" />}
                  prev2Label={<CalendarLabel label="<<" />}
                  nextLabel={<CalendarLabel label=">" />}
                  next2Label={<CalendarLabel label=">>" />}
                  calendarType='islamic'
                  className="flex flex-col items-center gap-[10px]"
                  onActiveStartDateChange={({ activeStartDate }) => {
                    if (activeStartDate) filterEventByMonth(activeStartDate);
                  }}
              />
              <div className="flex flex-col gap-3">
                {
                  eventMonth && eventMonth.map((value: ListActivities, key: number) => (
                    <a
                      key={key} 
                      className="flex flex-row gap-3 underline underline-offset-2"
                      href={`/kegiatan/${value.id}`}
                    >
                      <p className="text-green-900 font-bold">Tanggal {new Date(value.date).getDate()} : {value.name}</p>
                    </a>
                  ))
                }
              </div>
          </div>
      );

}