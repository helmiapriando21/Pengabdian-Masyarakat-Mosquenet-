"use client"

import Modal from "../../_components/modal";
import CreateKegiatan from "./_components/createKegiatan";
import TableKegiatan from "./_components/tableKegiatan";

export default function Kegiatan() {
  return (
    <div className="flex flex-col gap-3 w-full min-h-full">
      <div className="flex justify-end items-end w-full gap-5">
        <Modal label="+ Tambah">
          <CreateKegiatan />
        </Modal>
      </div>
      <TableKegiatan />
    </div>
  );
}