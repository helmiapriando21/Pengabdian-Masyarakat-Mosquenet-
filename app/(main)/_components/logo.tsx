import Image from "next/image";

interface LogoProps {
  width: number,
  height: number,
}

export default function Logo({width, height}: LogoProps) {
    return (
        <div className="flex gap-5 items-center">
            <Image
                src="/img/logo-small.jpg"
                width={width}
                height={height}
                alt=""
            />
            <h1 className="text-2xl font-semibold">{process.env.NEXT_PUBLIC_APP_NAME}</h1>
        </div>
    );
}