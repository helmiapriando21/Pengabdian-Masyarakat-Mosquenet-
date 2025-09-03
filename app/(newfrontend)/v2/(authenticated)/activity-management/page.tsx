"use client";

import Text from "@/app/components/Text";
import IMG from "@/content/img";
import clsx from "clsx";
import React, { useState } from "react";

interface Kegiatan {
  id: string;
  tanggal: string;
  nama: string;
  lokasi: string;
  penanggungJawab: string;
}

const initialData: Kegiatan[] = [
  {
    id: "1",
    tanggal: "2025-07-27",
    nama: "Pengajian Ahad",
    lokasi: "Aula Masjid",
    penanggungJawab: "Ust. Ahmad",
  },
  {
    id: "2",
    tanggal: "2025-07-30",
    nama: "Baksos RT",
    lokasi: "Halaman Depan",
    penanggungJawab: "Bu Siti",
  },
];

export default function TableKegiatanMasjid() {
  const [kegiatan, setKegiatan] = useState<Kegiatan[]>(initialData);
  const [modalType, setModalType] = useState<
    "tambah" | "edit" | "delete" | "detail" | null
  >(null);
  const [selectedItem, setSelectedItem] = useState<Kegiatan | null>(null);

  const openModal = (type: typeof modalType, item?: Kegiatan) => {
    setModalType(type);
    setSelectedItem(item || null);
  };

  const closeModal = () => {
    setModalType(null);
    setSelectedItem(null);
  };

  const pillClass =
    "rounded-[25px] text-white text-center flex items-center justify-center text-sm font-semibold";

  return (
    <div
      className="min-h-screen w-full px-6 py-10 relative"
      style={{
        backgroundImage: `url(${IMG.BG_ACTIVITY_MANAGEMENT})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Overlay hitam */}
      <div className="absolute inset-0 bg-black opacity-25 z-0"></div>

      <div className="relative z-10">
        <Text
          type="header1"
          className="text-4xl font-bold text-white mb-8 text-center"
        >
          Data Kegiatan Masjid
        </Text>

        <div className="bg-[rgba(255,255,255,0.6)] rounded-[10px] shadow-[0_10px_10px_0_rgba(0,0,0,0.25)] px-[27px] py-[33px]">
          {/* Table Header */}
          <div
            className="grid grid-cols-12 mb-4 items-center bg-white rounded-[10px] py-[15px] px-[20px] shadow"
            style={{ gridTemplateColumns: "2fr 3fr 2fr 3fr 2fr" }}
          >
            {[
              "Tanggal",
              "Nama Kegiatan",
              "Lokasi",
              "Penanggung Jawab",
              "Aksi",
            ].map((header) => (
              <div
                key={header}
                className="text-xl font-semibold text-center text-black"
              >
                {header}
              </div>
            ))}
          </div>

          {/* Table Rows */}
          {kegiatan.map((item) => (
            <div
              key={item.id}
              className="grid grid-cols-12 items-center bg-white rounded-[10px] py-[15px] px-[20px] mb-4 shadow hover:bg-gray-50 transition"
              style={{ gridTemplateColumns: "2fr 3fr 2fr 3fr 2fr" }}
            >
              <div className="text-center text-lg">{item.tanggal}</div>
              <div className="text-center text-lg">{item.nama}</div>
              <div className="text-center text-lg">{item.lokasi}</div>
              <div className="text-center text-lg">{item.penanggungJawab}</div>
              <div className="flex justify-center gap-2">
                <button
                  onClick={() => openModal("edit", item)}
                  className={clsx(
                    pillClass,
                    "w-[90px] h-[33px] bg-yellow-800 cursor-pointer"
                  )}
                >
                  Edit
                </button>
                <button
                  onClick={() => openModal("delete", item)}
                  className={clsx(
                    pillClass,
                    "w-[90px] h-[33px] bg-red-700 cursor-pointer"
                  )}
                >
                  Delete
                </button>
                <button
                  onClick={() => openModal("detail", item)}
                  className={clsx(
                    pillClass,
                    "w-[90px] h-[33px] bg-blue-600 cursor-pointer"
                  )}
                >
                  Detail
                </button>
              </div>
            </div>
          ))}
        </div>
        {/* Tombol Tambah */}
        <div className="flex justify-center mt-8">
          <button
            onClick={() => openModal("tambah")}
            className="bg-green-600 text-white text-xl font-semibold rounded-full px-[97px] py-[12px] hover:bg-green-700 transition cursor-pointer"
          >
            + Tambah Kegiatan
          </button>
        </div>
      </div>

      {/* Modal */}
      {modalType && (
        <div className="fixed inset-0 flex justify-center items-center z-50">
          <div className="absolute inset-0 bg-black opacity-50 z-10" />

          <div className="bg-white rounded-[10px] w-full max-w-lg p-6 shadow-lg absolute z-[100]">
            <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">
              {modalType === "tambah"
                ? "Tambah Kegiatan"
                : modalType === "edit"
                ? "Edit Kegiatan"
                : modalType === "detail"
                ? "Detail Kegiatan"
                : "Hapus Kegiatan"}
            </h2>

            {modalType === "delete" ? (
              <>
                <p className="text-center text-lg mb-6">
                  Yakin ingin menghapus kegiatan{" "}
                  <span className="font-semibold">{selectedItem?.nama}</span>?
                </p>
                <div className="flex justify-center gap-4">
                  <button
                    onClick={closeModal}
                    className="bg-gray-300 px-6 py-2 rounded-full font-semibold cursor-pointer"
                  >
                    Batal
                  </button>
                  <button
                    onClick={() => {
                      setKegiatan((prev) =>
                        prev.filter((k) => k.id !== selectedItem?.id)
                      );
                      closeModal();
                    }}
                    className="bg-red-700 text-white px-6 py-2 rounded-full font-semibold cursor-pointer"
                  >
                    Hapus
                  </button>
                </div>
              </>
            ) : modalType === "detail" ? (
              <div className="text-lg space-y-2">
                <p>
                  <strong>Tanggal:</strong> {selectedItem?.tanggal}
                </p>
                <p>
                  <strong>Nama Kegiatan:</strong> {selectedItem?.nama}
                </p>
                <p>
                  <strong>Lokasi:</strong> {selectedItem?.lokasi}
                </p>
                <p>
                  <strong>Penanggung Jawab:</strong>{" "}
                  {selectedItem?.penanggungJawab}
                </p>
                <div className="flex justify-end mt-4">
                  <button
                    onClick={closeModal}
                    className="bg-blue-600 text-white px-6 py-2 rounded-full font-semibold cursor-pointer"
                  >
                    Tutup
                  </button>
                </div>
              </div>
            ) : (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  const formData = new FormData(e.currentTarget);
                  const newItem: Kegiatan = {
                    id: selectedItem?.id || Date.now().toString(),
                    tanggal: formData.get("tanggal") as string,
                    nama: formData.get("nama") as string,
                    lokasi: formData.get("lokasi") as string,
                    penanggungJawab: formData.get("penanggungJawab") as string,
                  };
                  setKegiatan((prev) => {
                    if (modalType === "edit") {
                      return prev.map((k) =>
                        k.id === newItem.id ? newItem : k
                      );
                    } else {
                      return [...prev, newItem];
                    }
                  });
                  closeModal();
                }}
                className="flex flex-col gap-4"
              >
                <input
                  type="date"
                  name="tanggal"
                  defaultValue={selectedItem?.tanggal}
                  required
                  className="border border-gray-300 rounded-md px-4 py-2"
                />
                <input
                  type="text"
                  name="nama"
                  defaultValue={selectedItem?.nama}
                  placeholder="Nama Kegiatan"
                  required
                  className="border border-gray-300 rounded-md px-4 py-2"
                />
                <input
                  type="text"
                  name="lokasi"
                  defaultValue={selectedItem?.lokasi}
                  placeholder="Lokasi"
                  required
                  className="border border-gray-300 rounded-md px-4 py-2"
                />
                <input
                  type="text"
                  name="penanggungJawab"
                  defaultValue={selectedItem?.penanggungJawab}
                  placeholder="Penanggung Jawab"
                  required
                  className="border border-gray-300 rounded-md px-4 py-2"
                />
                <div className="flex justify-end gap-4 mt-2">
                  <button
                    type="button"
                    onClick={closeModal}
                    className="bg-gray-300 px-5 py-2 rounded-full font-semibold cursor-pointer"
                  >
                    Batal
                  </button>
                  <button
                    type="submit"
                    className="bg-blue-600 text-white px-5 py-2 rounded-full font-semibold cursor-pointer"
                  >
                    Simpan
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
