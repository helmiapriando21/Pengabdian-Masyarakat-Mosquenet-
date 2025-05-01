"use client"

import { useParams } from "next/navigation";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { fetchActivity } from "@/thunks/activityThunks";
import { clearActivity } from "@/store/activitySlice";

export default function DetailKegiatan() {
  const dispatch = useAppDispatch();
  const {activity, loading} = useAppSelector((state) => state.activities);
  const params = useParams();
  const { id } = params;

  useEffect(() => {
    dispatch(fetchActivity(Number(id)));
    return () => {
      dispatch(clearActivity())
    }
  }, [dispatch])

  if(!loading && activity)
    return (
      <div className="flex flex-col gap-10 w-full h-full">
        <img 
          src={`${process.env.NEXT_PUBLIC_API_STATIC_URL}/${activity.image}`}
          className="w-[100rem] h-[30rem]"
          alt={`Representasi Kegiatan ${activity.name}`}
        />
        <div className="flex flex-col gap-3">
          <h1 className="font-bold text-black text-3xl text-center">{activity.name}</h1>
          <h4 className="font-bold text-black text-xl text-center">
            {
              new Date(activity.date).toLocaleDateString('id-ID', {
                weekday: 'long',
                day: '2-digit',
                month: 'long',
                year: 'numeric'
              })
            }.
            {new Date(activity.date).getUTCHours().toString().padStart(2, '0')}:{new Date(activity.date).getUTCMinutes().toString().padStart(2, '0')}
          </h4>
          <h6 className="font-bold text-black text-lg text-center">PIC: {activity.pic}</h6>
          <p className="text-lg text-center">{activity.description}</p>
          <p className="font-semibold text-black text-md text-center">Address: {activity.address}</p>
          <a 
            href={`${process.env.NEXT_PUBLIC_API_STATIC_URL}/${activity.document}`}
            className="text-blue-400 underline-offset-2 underline text-center"
            download
          >
            Documents
          </a>
        </div>
      </div>
    );
}