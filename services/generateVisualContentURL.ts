const generateVisualContentImageURL = (visual_content: string) => {
  if(visual_content?.includes("https")) {
    return visual_content;
  } else {
    return process.env.NEXT_PUBLIC_API_STATIC_URL+"/"+visual_content;
  }
}

const generateYoutubeEmbedLink = (link: string) => {
  return link.replace("watch?v=", "embed/")
}

export {
  generateVisualContentImageURL,
  generateYoutubeEmbedLink
};