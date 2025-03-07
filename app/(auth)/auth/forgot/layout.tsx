import "../../../globals.css";
import ProgressBar from "../../../(main)/_components/progressBar";
import Image from "next/image";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: `Lupa Password | ${process.env.NEXT_PUBLIC_APP_NAME}`
}

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
