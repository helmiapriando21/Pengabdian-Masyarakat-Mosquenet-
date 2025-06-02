"use client"

import React, { useState } from "react";

interface ModalProps {
  label: string,
  children: React.ReactNode
}

export default function Modal({ label, children }: ModalProps) {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <div>
      <button 
        className="bg-green-600 text-white px-5 py-2 text-xl rounded-xl"
        onClick={() => { setIsOpen(true); }}
      >
        { label }
      </button>
      <div className={`absolute top-0 bottom-0 left-0 right-0 bg-black bg-opacity-40 ${isOpen ? "flex" : "hidden"} items-center justify-center`}>
        <div className="bg-white rounded-xl w-[40rem] h-[30rem] relative flex flex-col gap-5 p-20">
          <button
            className="absolute top-5 right-5 text-black text-xl font-bold"
            onClick={() => { setIsOpen(false); }}
          >
            X
          </button>
          {children}
        </div>
      </div>
    </div>
  );
}