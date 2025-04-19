"use client"

import { getMosqueDocuments } from "@/services/getData";
import { useState, useEffect } from "react";
import { ArchiveDocuments } from "@/interface/archive";
import TemplateItems from "./items";

export default function ListArchive() {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [data, setData] = useState<ArchiveDocuments[]>();

  useEffect(() => {
    const init = async () => {
      const data = await getMosqueDocuments(setIsLoading);
      setData(data);
    }

    if(isLoading && !data) {
      init();
    }
  }, [isLoading]);

  if(!isLoading && data)
    return (
      <div className="flex flex-col w-full h-full">
        {
          data.map((value: ArchiveDocuments, index: number) => (
            <TemplateItems key={index} data={value} />
          ))
        }
      </div>
    );
}