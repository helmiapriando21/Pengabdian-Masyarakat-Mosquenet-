"use client"

import { getMosqueTemplateDocuments } from "@/services/getData";
import { useState, useEffect } from "react";
import { ArchiveTemplates } from "@/interface/archive";
import TemplateItems from "./templateItems";

export default function listArchiveTemplate() {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [data, setData] = useState<ArchiveTemplates[]>();

  useEffect(() => {
    const init = async () => {
      const data = await getMosqueTemplateDocuments(setIsLoading);
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
          data.map((value: ArchiveTemplates, index: number) => (
            <TemplateItems key={index} data={value} />
          ))
        }
      </div>
    );
}