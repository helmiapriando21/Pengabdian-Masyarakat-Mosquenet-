"use client"

import Modal from "../../../_components/modal";
import AddCategory from "./_components/addCategory";
import CreatePemasukan from "./_components/createPemasukan";
import TablePemasukan from "./_components/tablePemasukan";

export default function Pemasukan() {
  return (
    <div className="flex flex-col gap-3 w-full">
      <div className="flex justify-end items-end w-full gap-5">
        <Modal label="+ Tambah">
          <h1 className="font-bold text-black text-xl">Tambah Pemasukan</h1>
          <CreatePemasukan />
        </Modal>
        <Modal label="+ Tambah Kategori">
          <h1 className="font-bold text-black text-xl">Tambah Kategori Pemasukan</h1>
          <AddCategory />
        </Modal>
      </div>
      <TablePemasukan />
    </div>
  );
}