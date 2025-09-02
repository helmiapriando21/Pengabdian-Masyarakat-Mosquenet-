// components/Button.tsx
import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: 'default' | 'primary' | 'secondary' | string;
  className?: string;
}

const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'default',
  className = '',
  ...props
}) => {
  const baseStyle =
    'px-4 py-2 font-medium focus:outline-none transition duration-150 ease-in-out';

  const variants: Record<string, string> = {
    default: 'bg-gray-200 text-black rounded',
    primary: 'bg-blue-500 text-white rounded',
    secondary: 'bg-gray-500 text-white rounded',
  };

  const variantStyle = variants[variant] || '';

  return (
    <button className={`${baseStyle} ${variantStyle} ${className}`} {...props}>
      {children}
    </button>
  );
};

export default Button;
