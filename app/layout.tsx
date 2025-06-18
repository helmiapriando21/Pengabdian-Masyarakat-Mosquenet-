"use client"

import './globals.css';

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
        {children}
      </body>
    </html>
  );
}
