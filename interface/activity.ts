export type ListActivities = {
  id: number,
  address: string,
  date: string,
  image: string,
  name: string,
  pic: string
};

export type DetailActivity = ListActivities & {
  description: string,
  document: string,
  video_documentation: string
}