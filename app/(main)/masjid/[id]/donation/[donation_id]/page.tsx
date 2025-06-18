"use client"

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import DonationData from "./_components/donationData";
import SendDonation from "./_components/sendDonation";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { fetchDonationBank } from "@/action/accountBankAction";
import { clearAccountBank } from "@/store/accountBankSlice";

export default function MosqueDetail () {
  const params = useParams();
  const [masjidId, setMasjidId] = useState<string>();
  const [donationId, setDonationId] = useState<string>();
  const dispatch = useAppDispatch();
  const {accountBank, loading} = useAppSelector((state) => state.accountBank);

  useEffect(() => {
    if(params?.id && params?.donation_id) {
      setMasjidId(params.id as string);
      setDonationId(params.donation_id as string);
    }
  }, [params]);

  useEffect(() => {
    if(masjidId && donationId && !loading && !accountBank)
      dispatch(fetchDonationBank({masjid_id: masjidId, donation_id: donationId}));

    return () => {
      dispatch(clearAccountBank());
    }
  }, [masjidId, donationId, dispatch])

  if(masjidId && donationId && accountBank && !loading)
    return (
      <div className="flex w-screen h-[calc(100vh-200px)] items-center justify-center">
        <DonationData data={accountBank} />
        <SendDonation data={accountBank} masjid_id={masjidId} donation_id={donationId} />
      </div>
    );
}