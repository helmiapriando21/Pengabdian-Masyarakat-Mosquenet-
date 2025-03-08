import React from "react";
import RedirectSolution from "./redirectSolution";

interface SelectMenuProps {
  setMenu: React.Dispatch<React.SetStateAction<string>>,
  setIsChoose: React.Dispatch<React.SetStateAction<boolean>>,
  setSelectedRegisterMenu: React.Dispatch<React.SetStateAction<string>>
}

export default function SelectMenu({ setMenu, setIsChoose, setSelectedRegisterMenu }: SelectMenuProps) {
    return (
        <>
            <button
                onClick={() => {
                    setSelectedRegisterMenu('admin');
                    setIsChoose(true);
                }}
                className="p-[10px] bg-[#6FD365] font-bold uppercase text-white rounded-md"
            >
                Register sebagai admin
            </button>
            <button
                onClick={() => {
                    setSelectedRegisterMenu('jamaah');
                    setIsChoose(true);
                }}
                className="p-[10px] bg-[#6FD365] font-bold uppercase text-white rounded-md"
            >
                Register sebagai jamaah
            </button>
            <RedirectSolution
              question="Sudah punya akun?"
              answer="Klik disini"
              solution={() => {
                setMenu('login');
                setIsChoose(false);
              }}
              textAlign="text-center"
            />
        </>
    );
}