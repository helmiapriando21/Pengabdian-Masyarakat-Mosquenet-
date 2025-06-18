import "../globals.css";
import MainLayoutClient from "./mainLayoutClient";

export const metadata = {
  title: `Homepage | ${process.env.NEXT_PUBLIC_APP_NAME}`
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <MainLayoutClient>{children}</MainLayoutClient>
  );
}
