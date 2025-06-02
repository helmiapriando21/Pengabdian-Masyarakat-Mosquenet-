export type ListActivities = {
  id: number,
  address: string,
  date: string,
  image?: string | File,
  name: string,
  pic: string
};

export type DetailActivity = ListActivities & {
  description: string,
  document?: string | File,
  video_documentation?: string
}

export type CreateActivity = DetailActivity & {
  time: string,
  outcomes?: {
    reason: string;
    amount: number;
  }[] | string
}