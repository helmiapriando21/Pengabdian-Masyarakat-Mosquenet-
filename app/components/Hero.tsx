import React from 'react';

interface HeroProps {
  backgroundImage: string;
  children?: React.ReactNode;
  className?: string;
}

const Hero: React.FC<HeroProps> = ({ backgroundImage, children, className = '' }) => {
  return (
    <section
      className={`w-full h-screen bg-cover bg-center flex items-center justify-center ${className}`}
      style={{
        backgroundImage: `url(${backgroundImage})`,
      }}
    >
      {children}
    </section>
  );
};

export default Hero;
