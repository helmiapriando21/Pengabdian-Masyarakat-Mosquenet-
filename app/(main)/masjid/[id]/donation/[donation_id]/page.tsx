"use client"

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { getDonation } from "@/services/getData";
import { ListBank } from "@/interface/bank";
import DonationData from "./_components/donationData";
import SendDonation from "./_components/sendDonation";

export default function MosqueDetail () {
  const params = useParams();
  const [masjidId, setMasjidId] = useState<string>();
  const [donationId, setDonationId] = useState<string>();
  const [data, setData] = useState<ListBank>();
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const init = async () => {
    if(masjidId && donationId) {
      const account = await getDonation(masjidId, donationId, setIsLoading);
      setData(account);
    }
  }

  useEffect(() => {
    if(params?.id && params?.donation_id) {
      setMasjidId(params.id as string);
      setDonationId(params.donation_id as string);
    }
  }, [params]);

  useEffect(() => {
    init()
  }, [masjidId, donationId])

  if(masjidId && donationId && data && !isLoading)
    return (
      <div className="flex w-screen h-[calc(100vh-200px)] items-center justify-center">
        <DonationData data={data} />
        <SendDonation data={data} masjid_id={masjidId} donation_id={donationId} />
      </div>
    );
}