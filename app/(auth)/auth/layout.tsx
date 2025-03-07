import "../../globals.css";
import ProgressBar from "../../(main)/_components/progressBar";
import Image from "next/image";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: `Autorisasi | ${process.env.NEXT_PUBLIC_APP_NAME}`
}

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`bg-white text-black`}
      >
        <ProgressBar />
        <div className="flex flex-col items-center justify-center w-screen h-screen bg-[#FFE98C] relative">
          <Image 
            src="/img/main-background.png" 
            alt="" 
            width="1000"
            height="1000"
            className="w-screen h-screen object-cover object-center opacity-30 absolute top-0 left-0 height-0 bottom-0 z-0"
          />
          <div className="z-50">
            <div className="bg-[url('/img/main-background.png')] w-[80vw] h-[80vh] bg-cover bg-no-repeat bg-center relative rounded-2xl overflow-hidden">
              {children}
            </div>
          </div>
        </div>
      </body>
    </html>
  );
}
