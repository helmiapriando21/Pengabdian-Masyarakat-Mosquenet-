/* eslint-disable @typescript-eslint/no-explicit-any */

import React from "react";

interface InputProps {
  isError: boolean,
  error: string | boolean,
  setValue: React.Dispatch<React.SetStateAction<any>>,
  value: any,
  placeholder: string,
  dataKey: string | number,
  type: string
};

export default function Input({isError, error, setValue, value, placeholder, dataKey, type}: InputProps) {
  return (
    <div className="flex flex-col gap-2">
      <input
        key={type}
        type={type}
        className="w-full border-[1px] border-black px-3 py-1 rounded-lg"
        onChange={(e) => {
          setValue({
            ...value,
            [dataKey]: type === "number" 
              ? Number(e.target.value) 
              : type === "file" 
              ? e.target.files?.[0] 
              : e.target.value
          });
        }}
        {...(type !== 'file' && { value: value?.[dataKey] || "" })}
        placeholder={placeholder}
      />
      {
        isError && <p className="text-red-500 text-xs">{error}</p>
      }
    </div>
  );
}