interface ContentProps {
  title: string;
  post_date: string;
  contents: string;
}

export default function Content({title, post_date, contents}: ContentProps) {
  return (
    <div className="flex flex-col gap-3">
      <h1 className="font-bold text-black text-3xl">{title}</h1>
      <h4 className="font-bold text-black text-xl">
        {
          new Date(post_date).toLocaleDateString('id-ID', {
            weekday: 'long',
            day: '2-digit',
            month: 'long',
            year: 'numeric'
          })
        }
      </h4>
      <div className="text-lg text-justify" dangerouslySetInnerHTML={{ __html: contents }} />
    </div>
  );
}