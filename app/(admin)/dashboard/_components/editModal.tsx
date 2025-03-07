"use client"

import { useState } from "react";

export default function EditModal({children}: any) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  return (
    <div>
      <button 
        className="w-max px-2 py-1 rounded-full flex items-center text-center justify-center text-xs bg-yellow-600 text-yellow-200"
        onClick={() => { setIsOpen(true) }}
      >
        Edit
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