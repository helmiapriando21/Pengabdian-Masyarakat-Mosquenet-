"use client";

import IMG from "@/content/img";
import Modal from "../../_components/modal";
import CreateAset from "./_components/createAset";
import TableAset from "./_components/tableAset";
import Text from "@/app/components/Text";

export default function Aset() {
  return (
    // <div className="flex flex-col gap-3 w-full">
    //   <div className="flex justify-end items-end w-full gap-5">
    //     <Modal label="+ Tambah">
    //       <CreateAset />
    //     </Modal>
    //   </div>
    //   <TableAset />
    // </div>
    <div
      className=""
      style={{
        backgroundImage: `url(${IMG.BG_ASET_MANAGEMENT})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Overlay hitam */}
      <div className="absolute inset-0 bg-black opacity-25 z-0"></div>
      <div className="relative z-10">
        <TableAset />
      </div>
    </div>
  );
}
