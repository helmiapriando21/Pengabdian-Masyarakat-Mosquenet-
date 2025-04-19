import { generateVisualContentImageURL, generateYoutubeEmbedLink } from "@/services/generateVisualContentURL";

interface VisualContentShowProps {
  visual_content: string;
  title: string;
}

export default function VisualContentShow({visual_content, title}: VisualContentShowProps) {
  if(typeof visual_content === "string" && visual_content?.includes("youtube"))
    return (
      <iframe 
        src={generateYoutubeEmbedLink(visual_content)}
        title={title}
        className="w-[70rem] h-[35rem]"
      />
    );
  else 
    return (
      <img 
        src={generateVisualContentImageURL(visual_content)}
        className="w-[100rem] h-[30rem]"
      />
    );
}