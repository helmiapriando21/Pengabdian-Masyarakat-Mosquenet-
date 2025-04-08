import { Metadata } from "next";

export const metadata: Metadata = {
  title: `Masjid | ${process.env.NEXT_PUBLIC_APP_NAME}`
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return children;
}