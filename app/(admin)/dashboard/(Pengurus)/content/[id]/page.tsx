"use client"

import { useParams } from "next/navigation";
import { useEffect } from "react";
import VisualContentShow from "@/app/components/visualContentShow";
import Content from "@/app/components/content";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { fetchContent } from "@/thunks/contentThunks";
import { clearContent } from "@/store/contentSlice";

export default function DetailContent() {
  const {content, loading} = useAppSelector((state) => state.contents);
  const dispatch = useAppDispatch();
  const params = useParams();
  const { id } = params;

  useEffect(() => {
    dispatch(fetchContent(Number(id)));
    return () => {
      dispatch(clearContent());
    }
  }, 
  [dispatch]);

  if(!loading && content)
    return (
      <div className="flex flex-col gap-10 w-full h-full">
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