"use client"

import Modal from "../../_components/modal";
import CreateAset from "./_components/createAset";
import TableAset from "./_components/tableAset";

export default function Aset() {
  return (
    <div className="flex flex-col gap-3 w-full">
      <div className="flex justify-end items-end w-full gap-5">
        <Modal label="+ Tambah">
          <CreateAset />
        </Modal>
      </div>
      <TableAset />
    </div>
  );
}