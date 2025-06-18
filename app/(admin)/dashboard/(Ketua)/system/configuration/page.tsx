"use client"

import { useEffect } from "react"
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { fetchConfiguration } from "@/action/configurationAction";
import ConfigurationForm from "./components/configurationForm";

export default function Configuration() {
  const dispatch = useAppDispatch();
  const { loading, configuration } = useAppSelector((state) => state.config);

  useEffect(() => {
    if(!loading && !configuration) {
      dispatch(fetchConfiguration());
    }
  }, [])

  if(!loading && configuration) 
    return (
      <div className="flex flex-col gap-3 w-full">
        <div className="flex flex-col gap-1 w-full">
          <h1 className="font-bold text-3xl">Konfigurasi</h1>
          <ConfigurationForm
            label="Hubungkan pendataan aset dengan catatan pengeluaran"
            id="Aset"
            dataKey="is_asset_outcomes_connected"
          />
          <ConfigurationForm
            label="Hubungkan pendataan kegiatan dengan catatan pengeluaran"
            id="Aset"
            dataKey="is_activity_outcomes_connected"
          />
          <ConfigurationForm
            label="Sediakan artikel"
            id="Aset"
            dataKey="is_article_used"
          />
          <ConfigurationForm
            label="Sediakan donasi online"
            id="Aset"
            dataKey="is_donation_used"
          />
          <ConfigurationForm
            label="Sediakan penyimpanan template persuratan"
            id="Aset"
            dataKey="is_template_documents_used"
          />
        </div>
      </div>
    );
}