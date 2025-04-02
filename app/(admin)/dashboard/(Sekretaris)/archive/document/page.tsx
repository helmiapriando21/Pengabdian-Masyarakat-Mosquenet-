"use client"

import Modal from "../../../_components/modal";
import CreateArchive from "./_components/createArchive";
import ListArchive from "./_components/listArchive";

export default function ArchiveTemplate() {
  return (
    <div className="flex flex-col gap-3 w-full">
      <div className="flex justify-end items-end w-full gap-5">
        <Modal label="+ Tambah">
          <CreateArchive />
        </Modal>
      </div>
      <ListArchive />
    </div>
  );
}