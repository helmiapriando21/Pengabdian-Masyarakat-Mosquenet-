import type { Metadata } from "next";
import "../../../globals.css";
import NavBar from "../../../components/navbar";
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
    <>
      <NavBar />
      <ProgressBar />
      {children}
    </>
    // <html lang="en">
    //   <body
    //     className={`bg-white text-black`}
    //   >
    //   </body>
    // </html>
  );
}
