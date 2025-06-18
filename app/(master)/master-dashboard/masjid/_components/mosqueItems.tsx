"use client"

import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { ListMosque } from "@/interface/mosque";
import { fetchMosques } from "@/action/mosqueAction";
import Items from "./items";

export default function MosqueItems() {
  const dispatch = useAppDispatch();
  const {mosques, loading} = useAppSelector((state) => state.mosque);

  useEffect(() => {
    if(!loading && !mosques) {
      dispatch(fetchMosques('/api/master/mosque'));
    }
  }, [dispatch, mosques]);

  if(!loading && mosques && mosques.length !== 0)
    return (
      <div className="flex flex-col w-full h-full">
        {
          mosques.map((value: ListMosque, index: number) => (
            <Items key={index} data={value} />
          ))
        }
      </div>
    );
  else
    return (
      <div>Belum ada masjid yang mendaftar</div>
    )
  
} 