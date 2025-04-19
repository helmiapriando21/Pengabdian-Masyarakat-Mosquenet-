"use client"

import '../../globals.css';
import NavBar from "@/app/components/navbar";
import Sidebar from "./_layouts/sidebar";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <html lang="en">
      <body
        className={`bg-white text-black min-h-screen`}
      >
        <NavBar />
        <div className="flex w-screen h-full">
          <Sidebar />
          <div className="h-full px-10 py-10 w-full">
            {children}
          </div>
        </div>
      </body>
    </html>
  );
}
