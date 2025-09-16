"use client";

import "../../globals.css";
import NavBar from "@/app/components/navbar";
import Sidebar from "./_layouts/sidebar";
import { Provider } from "react-redux";
import { store } from "@/store";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Provider store={store}>
        <NavBar />
        <div className="flex w-screen h-full">
          {/* <Sidebar /> */}
          <div className="min-h-screen w-full">{children}</div>
        </div>
      </Provider>
    </>
    // <html lang="en">
    //   <body
    //     className={`bg-white text-black min-h-screen`}
    //   >
    //   </body>
    // </html>
  );
}
