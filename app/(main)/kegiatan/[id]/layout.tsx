import type { Metadata } from "next";
import "../../../globals.css";

export const metadata: Metadata = {
  title: `Kegiatan Masjid | ${process.env.NEXT_PUBLIC_APP_NAME}`,
  description: "",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return children;
}
