export type Content = {
  title: string;
  contents: string;
  visual_content?: File | String;
}

export type ListContent = Content & {
  post_date: string;
  id: number;
}