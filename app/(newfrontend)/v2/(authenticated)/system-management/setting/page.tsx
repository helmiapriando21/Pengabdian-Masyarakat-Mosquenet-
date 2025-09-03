"use client";

import Text from "@/app/components/Text";
import IMG from "@/content/img";
import { SETTING_CONTENT } from "@/content/setting";
import React, { useState } from "react";

export default function SettingPage() {
  const [config, setConfig] = useState<Record<string, boolean>>({
    notif: true,
    darkMode: false,
    autoUpdate: true,
    emailReports: false,
    sound: true,
  });

  const toggleConfig = (id: string) => {
    setConfig((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <div
      className="relative min-h-screen bg-cover bg-center"
      style={{ backgroundImage: `url(${IMG.BG_SETTING})` }}
    >
      {/* Overlay hitam */}
      <div className="absolute inset-0 bg-black opacity-30 z-0" />

      {/* Konten */}
      <div className="relative z-10 px-6 md:px-28 py-10">
        <Text
          type="header1"
          className="text-4xl text-center font-bold text-white mb-10"
        >
          Pengaturan
        </Text>

        <div className="flex flex-col gap-6">
          {SETTING_CONTENT.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-[10px] py-[32px] px-[28px] flex justify-between items-center shadow-md"
            >
              <span className="text-2xl text-gray-800">{item.label}</span>
              <input
                type="checkbox"
                checked={config[item.id]}
                onChange={() => toggleConfig(item.id)}
                className="w-6 h-6 accent-blue-600"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
