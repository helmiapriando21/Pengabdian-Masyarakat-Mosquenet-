"use client"

import { useEffect } from "react"
import confirmAlert from "@/services/confirmAlert";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { changeConfiguration, fetchConfiguration } from "@/action/configurationAction";
import notificationAlert from "@/services/notificationAlert";

interface ConfigurationFormProps {
  label: string;
  id: string;
  dataKey: "is_article_used" | "is_template_documents_used" | "is_donation_used" | "is_asset_outcomes_connected" | "is_activity_outcomes_connected"
}

export default function ConfigurationForm({label, id, dataKey}: ConfigurationFormProps) {
  const dispatch = useAppDispatch();
  const { loading, configuration } = useAppSelector((state) => state.config);

  const action = async (value: boolean) => {
    const isAction = await confirmAlert("Apakah anda ingin konfigurasi ini diubah?", 'Ya, tolong diubah!', 'Tidak, jangan diubah');
    if(isAction) {
      try {
        await dispatch(changeConfiguration({
          config: value,
          route: dataKey === "is_asset_outcomes_connected" 
            ? 'asset-with-outcome'
            : dataKey === "is_activity_outcomes_connected" 
            ? 'activity-with-outcome'
            : dataKey === "is_article_used"
            ? 'article'
            : dataKey === "is_donation_used"
            ? 'donation'
            : 'template'
        })).unwrap();
        notificationAlert("Konfigurasi sistem berhasil diubah!", "success", () => { dispatch(fetchConfiguration() )});
      } catch (e) {
        notificationAlert('Konfigurasi sistem gagal diubah!', 'error', () => {});
      }
    }
  }

  useEffect(() => {
    if(!loading && !configuration) {
      dispatch(fetchConfiguration());
    }
  }, [])


  if(!loading && configuration) 
    return (
      <div className="flex gap-2">
        <p>{label}</p>
        <input 
          id={id} 
          type="checkbox"
          checked={configuration[dataKey] ? true : false}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            action(e.target.checked)
          }}
        />
      </div>
    );
}