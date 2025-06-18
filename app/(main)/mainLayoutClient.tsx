"use client"

import "../globals.css";
import NavBar from "../components/navbar";
import ProgressBar from "./_components/progressBar";
import { Provider } from "react-redux";
import { store } from "@/store";

export default function MainLayoutClient({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <>
      <NavBar />
      <ProgressBar />
      <Provider store={store}>
        {children}
      </Provider>
    </>
  );
}
