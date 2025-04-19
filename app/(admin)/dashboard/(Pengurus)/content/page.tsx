"use client"

import Modal from "../../_components/modal";
import CreateContent from "./_components/createContent";
import TableContent from "./_components/tableContent";

export default function Content() {
  return (
    <div className="flex flex-col gap-3 w-full min-h-full">
      <div className="flex justify-end items-end w-full gap-5">
        <Modal label="+ Tambah">
          <CreateContent />
        </Modal>
      </div>
      <TableContent />
    </div>
  );
}