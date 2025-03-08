import "../../../globals.css";
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
