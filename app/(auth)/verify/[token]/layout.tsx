import type { Metadata } from "next";
import "../../../globals.css";
import NavBar from "../../../(main)/_components/navbar";
import ProgressBar from "../../../(main)/_components/progressBar";

export const metadata: Metadata = {
  title: `Verification Account | ${process.env.NEXT_PUBLIC_APP_NAME}`,
  description: "",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`bg-white text-black`}
      >
        <NavBar />
        <ProgressBar />
        {children}
      </body>
    </html>
  );
}
