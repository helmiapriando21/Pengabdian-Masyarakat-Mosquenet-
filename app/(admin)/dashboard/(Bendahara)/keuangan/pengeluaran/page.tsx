"use client"

import Modal from "../../../_components/modal";
import AddReason from "./_components/addReason";
import CreatePengeluaran from "./_components/createPengeluaran";
import TablePengeluaran from "./_components/tablePengeluaran";

export default function Pengeluaran() {
  return (
    <div className="flex flex-col gap-3 w-full">
      <div className="flex justify-end items-end w-full gap-5">
        <Modal label="+ Tambah">
          <h1 className="font-bold text-black text-xl">Tambah Pengeluaran</h1>
          <CreatePengeluaran />
        </Modal>
        <Modal label="+ Tambah Keterangan Pengeluaran">
          <h1 className="font-bold text-black text-xl">Tambah Keterangan Pengeluaran</h1>
          <AddReason />
        </Modal>
      </div>
      <TablePengeluaran />
    </div>
  );
}