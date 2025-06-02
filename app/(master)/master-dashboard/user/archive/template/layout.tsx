import type { Metadata } from "next";

export const metadata: Metadata = {
  title: `Manajemen Template Arsip | ${process.env.NEXT_PUBLIC_APP_NAME}`,
  description: "",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return children;
}
