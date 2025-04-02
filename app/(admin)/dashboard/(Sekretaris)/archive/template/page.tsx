"use client"

import Modal from "../../../_components/modal";
import CreateTemplate from "./_components/createArchiveTemplate";
import ListArchiveTemplate from "./_components/listArchiveTemplate";

export default function ArchiveTemplate() {
  return (
    <div className="flex flex-col gap-3 w-full">
      <div className="flex justify-end items-end w-full gap-5">
        <Modal label="+ Tambah">
          <CreateTemplate />
        </Modal>
      </div>
      <ListArchiveTemplate />
    </div>
  );
}