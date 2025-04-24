
import Input from "@/app/(admin)/dashboard/_components/input";
import { Donation, ListBank } from "@/interface/bank";
import { sendDonation } from "@/services/postData";
import basicValidation from "@/validation/basic-validation";
import fileValidation from "@/validation/file-validation";
import numberValidation from "@/validation/number-validation";
import { useState } from "react";
import { useRouter } from "next/navigation";
import confirmAlert from "@/services/confirmAlert";

interface SendDonationProps {
  data: ListBank;
  masjid_id: string;
  donation_id: string
}

export default function SendDonation({ data, masjid_id, donation_id }: SendDonationProps) {
  const [formData, setFormData] = useState<Donation>();
  const [isError, setIsError] = useState<boolean>(false);
  const router = useRouter();

  const handleSubmit = async () => {
    const confirmationSubmit = await confirmAlert(`Apakah anda yakin ingin mengirimkan donasi dengan tujuan ${data.purpose}?`, 'Ya, saya yakin!', 'Tidak');
    if(confirmationSubmit) {
      if(
        !basicValidation(formData?.name || '', 'Nama') ||
        !numberValidation(formData?.amount, 'Jumlah') ||
        !fileValidation( formData?.image,'Bukti penyerahan ', 'image/ ', 'PNG/JPG/JPEG', false)
      ) {
        await sendDonation(formData!, masjid_id, donation_id, router);
      } else setIsError(true);
    }
  }

  return (
    <div className="flex flex-col h-screen w-1/2 items-center justify-center gap-3">
      <Input 
        isError={isError}
        error={basicValidation(formData?.name || '', 'Nama')}
        setValue={setFormData}
        value={formData}
        placeholder="Tambahkan Nama Anda (Tuliskan Hamba Allah jika tidak berkenan melampirkan)"
        dataKey="name"
        type="text"
      />
      <Input 
        isError={isError}
        error={numberValidation(formData?.amount, 'Jumlah')}
        setValue={setFormData}
        value={formData}
        placeholder="Berikan jumlah yang anda berikan seikhlasnya"
        dataKey="amount"
        type="number"
      />
      <Input 
        isError={isError}
        error={
          fileValidation(
            formData?.image, 
            'Bukti penyerahan ', 
            'image/ ', 
            'PNG/JPG/JPEG',
            false
          )
        }
        setValue={setFormData}
        value={formData}
        placeholder="Berikan jumlah yang anda berikan seikhlasnya"
        dataKey="image"
        type="file"
      />
      <button
        className="bg-green-600 rounded-lg px-3 py-1 text-white"
        onClick={handleSubmit}
      >
        Kirim
      </button>
    </div>
  )
}