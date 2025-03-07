import { useEffect, useState } from "react";
import Input from "../../_components/input";
import numberValidation from "@/validation/number-validation";
import { createKasPayment } from "@/helper/postData";
import { QRCodeCanvas } from "qrcode.react";
import { getValidKasTransaction } from "@/helper/getData";
import { useRouter } from "next/navigation";

export default function KasPayment() {
  const [data, setData] = useState({
    amount: undefined
  });
  const [payment, setPayment] = useState<any>();
  const [isError, setIsError] = useState(false);
  const router = useRouter();

  const action = async () => {
    if(!numberValidation(data.amount, "Nominal Pembayaran Kas") && data.amount) {
      const paymentResponse = await createKasPayment(data.amount);
      setPayment(paymentResponse);
    } else setIsError(true);
  }

  const verifyAction = async () => {
    if(payment) {
      await getValidKasTransaction(payment.order_id, router);
    }
  }
  
  if(payment) 
    return (
      <div className="flex flex-col gap-3 items-center justify-center">
        <h2>Scan QR Code untuk membayar</h2>
        <p>Nominal: Rp. {Number(payment.amount).toLocaleString('id-ID')},-</p>
        <img src={payment.qr} width="200" height="200" />
        <button
            className="bg-green-600 rounded-lg px-3 py-1 text-white"
            onClick={() => verifyAction()}
        >
          Verifikasi Pembayaran
        </button>
      </div>
    );
  else
    return (
      <div className="flex flex-col gap-3">
        <Input
          isError={isError}
          error={numberValidation(data.amount, "Nominal Pembayaran Kas")}
          setValue={setData}
          value={data}
          placeholder="Masukkan nominal pembayaran kas"
          dataKey="amount"
          type="number"
        />
        <button
            className="bg-green-600 rounded-lg px-3 py-1 text-white"
            onClick={() => action()}
        >
          Bayar
        </button>
      </div>
    );
}