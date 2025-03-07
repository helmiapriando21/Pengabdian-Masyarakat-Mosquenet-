"use client"

import Modal from "../../../_components/modal";
import AddPurpose from "./_components/addPurpose";
import CreateBankAccount from "./_components/createBankAccount";
import TableMosqueBank from "./_components/tableMosqueBank";

export default function ListRekeningBank() {
  return (
    <div className="flex flex-col gap-3 w-full">
      <div className="flex justify-end items-end w-full gap-5">
        <Modal label="+ Tambah">
          <h1 className="font-bold text-black text-xl">Tambah Rekening</h1>
          <CreateBankAccount />
        </Modal>
        <Modal label="+ Tambah tujuan rekening">
          <h1 className="font-bold text-black text-xl">Tambah tujuan rekening</h1>
          <AddPurpose />
        </Modal>
      </div>
      <TableMosqueBank />
    </div>
  );
}