"use client";

import React from "react";
import IMG from "@/content/img";
import { useRouter } from "next/navigation";
import TopbarDashboard from "@/app/components/TopbarDashboard";
import DASHBOARD_CONTENT from "@/content/dashboard";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const route = useRouter();

  return (
    <div className="min-h-screen">
      <TopbarDashboard
        logoSrc={IMG.LOGO_WHITE}
        onLoginClick={() => {
          route.push("/v2/profile");
        }}
        features={DASHBOARD_CONTENT.FEATURE_LIST}
        showFeatures={true}
      />
      <main>{children}</main>
    </div>
  );
}
