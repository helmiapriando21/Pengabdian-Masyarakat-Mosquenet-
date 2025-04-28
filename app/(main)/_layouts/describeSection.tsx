import Image from "next/image";

export default function DescribeSection() {
  return (
    <div className="w-screen bg-[#FFDE72] sm:h-screen">
      <div className="flex w-full h-[50vh] max-sm:flex-col max-sm:h-full">
        <Image 
          src="/img/money-management.png"
          alt=""
          width={900}
          height={900}
          className="sm:w-[50%] h-full"
        />
        <div className="flex flex-col gap-3 sm:gap-4 items-center self-center justify-center w-[50%] h-full p-5 sm:p-10 text-center">
          <h1 className="font-bold text-2xl sm:text-4xl">Kelola Keuangan Masjid</h1>
          <p className="text-md sm:text-3xl">Kelola uang kas, infaq, zakat, dan donasi dari masjid anda.</p>
        </div>
      </div>
      <div className="flex w-full h-[50vh] max-sm:h-full max-sm:flex-col-reverse">
        <div className="flex flex-col gap-3 sm:gap-4 items-center self-center justify-center w-[50%] h-full p-5 sm:p-10 text-center">
          <h1 className="font-bold text-2xl sm:text-4xl">Kelola Acara Masjid</h1>
          <p className="text-md sm:text-3xl">Adakan dan ramaikan acara masjid. Beritahu jamaah bahwa akan ada kajian dari masjid dilokasi anda.</p>
        </div>
        <Image 
          src="/img/event-management.png"
          alt=""
          width={900}
          height={900}
          className="sm:w-[50%] h-full"
        />
      </div>
    </div>
  );
}
