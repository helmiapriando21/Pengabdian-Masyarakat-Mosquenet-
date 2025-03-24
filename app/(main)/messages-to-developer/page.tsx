"use client"

import Input from "@/app/(auth)/auth/_components/input";
import { sendCritics } from "@/helper/postData";
import basicValidation from "@/validation/basic-validation";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function MessageToDeveloper() {
  const [data, setData] = useState<{message: string}>();
  const [isError, setIsError] = useState<boolean>(false);
  const router = useRouter();

  const handleSend = async () => {
    if(!basicValidation(data?.message || '', "Pesan")) {
      await sendCritics(data!, router);
    } else setIsError(true);
  }

  return (
    <div className="w-full h-full flex flex-col gap-4 overflow-scroll px-4 py-48">
      <h1 className="text-center font-bold text-2xl">Kritik dan Saran</h1>
      <div>
        <p className="text-center text-lg">Anda dapat memberikan kritik dan saran untuk membantu mengembangkan website ini menjadi lebih baik untuk kedepannya.</p>
        <p className="text-center text-lg">Ayo bantu kami dengan memberikan hal - hal baru yang anda miliki.</p>
      </div>
      <div className="flex flex-col gap-3 px-52">
        <Input
          data={data}
          setData={setData}
          dataKey="message"
          type="text"
          placeholder="Tambahkan kritik dan saran yang anda miliki"
          isError={isError}
          message={basicValidation(data?.message || '', "Pesan")}
          label="Kritik dan Saran"
        />
        <button
          className="p-[10px] bg-[#6FD365] text-white rounded-md"
          onClick={handleSend}
        >
          Send
        </button>
      </div>
    </div>
  )
}