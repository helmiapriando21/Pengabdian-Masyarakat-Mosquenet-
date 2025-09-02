import Image from "next/image";
import React from "react";

interface LogoProps {
  img?: string;
}

const Logo = ({ img = "/img/logo.svg" }: LogoProps) => {
  return (
    <div>
      <Image src={img} height={75} width={310} alt="logo" />
    </div>
  );
};

export default Logo;
