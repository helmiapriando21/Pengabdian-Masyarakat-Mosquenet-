"use client"

import { useParams } from "next/navigation";
import { useEffect } from "react";
import VisualContentShow from "@/app/components/visualContentShow";
import Content from "@/app/components/content";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { fetchContent } from "@/action/contentAction";

export default function DetailContent() {
  const dispatch = useAppDispatch();
  const {content, loading} = useAppSelector((state) => state.contents);
  const params = useParams();
  const { id } = params;

  
  useEffect(() => {
    dispatch(fetchContent(Number(id)));
  }, []);

  if(!loading && content)
    return (
      <div className="flex flex-col gap-10 w-full h-full p-10">
        <VisualContentShow 
          visual_content={content.visual_content as string}
          title={content.title} 
        />
        <Content
          title={content.title}
          post_date={content.post_date}
          contents={content.contents}
        />
      </div>
    );
}