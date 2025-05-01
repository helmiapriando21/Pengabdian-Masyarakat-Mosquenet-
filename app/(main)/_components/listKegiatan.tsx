"use client"

import { ListActivities } from "@/interface/activity";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { fetchActivities } from "@/thunks/activityThunks";

interface ListKegiatanProps {
  masjid_id: string | null
};

export default function ListKegiatan({ masjid_id }: ListKegiatanProps) {
  const dispatch = useAppDispatch();
  const {activities, loading} = useAppSelector((state) => state.activities);

  useEffect(() => {
    if(!activities || activities.length === 0)
      dispatch(fetchActivities(masjid_id));
  }, [dispatch, activities])

  if(!loading && activities && activities.length !== 0)
    return (
      <div className="flex flex-col">
        {
          activities.map((value: ListActivities, index: number) => (
            <div key={index} className="flex max-sm:flex-col h-max items-center border-[1px] border-black overflow-hidden">
              { value.image && <img src={`${process.env.NEXT_PUBLIC_API_STATIC_URL}/${value.image}`} className="w-full sm:w-52 h-52 sm:h-full bg-center" /> }
              <div className="flex flex-col gap-2 px-5 py-2">
                <h1 className="text-sm sm:text-xl font-extrabold">{value.name}</h1>
                <div className="flex sm:items-center sm:justify-between max-sm:flex-col">
                  <p className="text-xs sm:text-sm">
                      {
                        new Date(value.date).toLocaleDateString('id-ID', {
                          weekday: 'long',
                          day: '2-digit',
                          month: 'long',
                          year: 'numeric'
                        })
                      }
                  </p>
                  <p className="text-xs sm:text-sm">{value.pic}</p>
                </div>
                <a href={`/kegiatan/${value.id}`} className="bg-yellow-500 rounded-lg h-max w-max px-3 py-1 font-bold text-white text-[0.5rem] sm:text-xs">Lihat Selengkapnya</a>
              </div>
            </div>
          ))
        }
      </div>
    );
}