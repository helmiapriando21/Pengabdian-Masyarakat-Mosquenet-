"use client"

import "../globals.css";
import NavBar from "../components/navbar";
import ProgressBar from "./_components/progressBar";
import { Provider } from "react-redux";
import { store } from "@/store";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <html lang="en">
      <head>
        <title>{`Homepage | ${process.env.NEXT_PUBLIC_APP_NAME}`}</title>
      </head>
      <body
        className={`bg-white text-black`}
      >
        <NavBar />
        <ProgressBar />
        <Provider store={store}>
          {children}
        </Provider>
      </body>
    </html>
  );
}
