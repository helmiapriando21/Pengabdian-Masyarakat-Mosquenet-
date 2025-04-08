import { ListBank } from "@/interface/bank";

export default function DonationData({data}: {data: ListBank}) {
  return (
    <div className="flex flex-col h-screen w-1/2 items-center justify-center gap-3">
      <h1 className="font-bold text-3xl uppercase">{data.purpose}</h1>
      {
        data && data.image 
          && <img 
            src={`${process.env.NEXT_PUBLIC_API_STATIC_URL}/${data.image}`}
            className="w-80 h-80"
          />
      }
      {
        data && data.account 
          && <div className="flex flex-col items-center justify-center gap-3 ">
            <p>{data.name} - {data.alias_name}</p>
            <p className="uppercase">{data.bank}</p>
            <p>{data.account}</p>
          </div>
      }
    </div>
  );
}