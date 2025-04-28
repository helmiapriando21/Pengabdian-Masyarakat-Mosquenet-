import Image from "next/image";
import { useRouter } from "next/navigation";

interface LogoProps {
  width: number,
  height: number,
}

export default function Logo({width, height}: LogoProps) {
  const router = useRouter();
    return (
        <div 
          className="flex max-sm:flex-col sm:gap-5 items-center"
          onClick={() => { router.push("/") }}
        >
            <Image
                src="/img/logo-small.jpg"
                width={width}
                height={height}
                alt=""
            />
            <h1 className="text-md sm:text-2xl font-semibold">{process.env.NEXT_PUBLIC_APP_NAME}</h1>
        </div>
    );
}