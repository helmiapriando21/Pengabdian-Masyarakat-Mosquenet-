
export default function Items({ data }: { data: { message: string } }) {

  return (
    <div className="flex w-full h-full px-4 py-1 border-[1px] border-black items-center justify-between rounded-lg overflow-hidden">
      <div className="flex flex-col">
        <h1>{data.message}</h1>
      </div>
    </div>
  );
}