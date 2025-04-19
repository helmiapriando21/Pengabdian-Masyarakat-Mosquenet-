"use client"

import { getDetailContentMasjid } from "@/services/getData";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { ListContent } from "@/interface/content";
import VisualContentShow from "@/app/components/visualContentShow";
import Content from "@/app/components/content";

export default function DetailContent() {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [data, setData] = useState<ListContent>();
  const params = useParams();
  const { id } = params;

  const init = async () => {
    const response = await getDetailContentMasjid(setIsLoading, Number(id));
    setData(response);
  }

  useEffect(() => {
    if(isLoading && !data) {
      init();
    }
  }, [])

  if(!isLoading && data)
    return (
      <div className="flex flex-col gap-10 w-full h-full">
        <VisualContentShow 
          visual_content={data.visual_content as string} 
          title={data.title} 
        /> 
        <Content
          title={data.title}
          post_date={data.post_date}
          contents={data.contents}
        />
      </div>
    );
}