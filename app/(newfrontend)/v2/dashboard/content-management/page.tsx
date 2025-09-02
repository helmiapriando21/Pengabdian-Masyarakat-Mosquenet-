"use client";

import Text from "@/app/components/Text";
import IMG from "@/content/img";
import clsx from "clsx";
import React, { useState } from "react";

interface Konten {
  id: string;
  tanggal: string;
  judul: string;
}

const initialData: Konten[] = [
  { id: "1", tanggal: "2025-07-01", judul: "Kajian Subuh Spesial" },
  { id: "2", tanggal: "2025-07-15", judul: "Peringatan Tahun Baru Hijriyah" },
];

export default function TableKontenMasjid() {
  const [kontenList, setKontenList] = useState<Konten[]>(initialData);
  const [modalType, setModalType] = useState<
    "tambah" | "edit" | "delete" | "detail" | null
  >(null);
  const [selectedKonten, setSelectedKonten] = useState<Konten | null>(null);

  const openModal = (type: typeof modalType, konten?: Konten) => {
    setModalType(type);
    setSelectedKonten(konten || null);
  };

  const closeModal = () => {
    setModalType(null);
    setSelectedKonten(null);
  };

  const pillClass =
    "rounded-[25px] text-white text-center flex items-center justify-center text-sm font-semibold";

  return (
    <div
      className="min-h-screen w-full px-6 py-10 relative"
      style={{
        backgroundImage: `url(${IMG.BG_CONTENT_MANAGEMENT})`,
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
          Data Konten Masjid
        </Text>

        {/* Card Table Container */}
        <div className="bg-[rgba(255,255,255,0.5)] rounded-[10px] px-[27px] py-[33px] shadow-[0px_10px_10px_0px_rgba(0,0,0,0.25)]">
          {/* Header Table */}
          <div
            className="grid grid-cols-12 mb-4 py-[15px] px-[20px] bg-gray-100 rounded-md"
            style={{ gridTemplateColumns: "3fr 5fr 4fr" }}
          >
            {["Tanggal", "Judul", "Aksi"].map((header) => (
              <div
                key={header}
                className="text-xl font-semibold text-center text-black"
              >
                {header}
              </div>
            ))}
          </div>

          {/* Row Konten */}
          {kontenList.map((item) => (
            <div
              key={item.id}
              className="grid grid-cols-12 bg-white rounded-[10px] py-[20px] px-[20px] mb-4 shadow hover:bg-gray-50 transition"
              style={{ gridTemplateColumns: "3fr 5fr 4fr" }}
            >
              <div className="text-lg text-center">{item.tanggal}</div>
              <div className="text-lg text-center">{item.judul}</div>
              <div className="flex justify-center gap-3 flex-wrap">
                <button
                  onClick={() => openModal("edit", item)}
                  className={clsx(
                    pillClass,
                    "w-[100px] h-[33px] bg-yellow-800 cursor-pointer"
                  )}
                >
                  Edit
                </button>
                <button
                  onClick={() => openModal("delete", item)}
                  className={clsx(pillClass, "w-[100px] h-[33px] bg-red-700 cursor-pointer")}
                >
                  Delete
                </button>
                <button
                  onClick={() => openModal("detail", item)}
                  className={clsx(pillClass, "w-[100px] h-[33px] bg-blue-700 cursor-pointer")}
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
            className="bg-green-600 text-white text-xl font-semibold rounded-full px-[97px] py-[12px] hover:bg-green-700 transition cursor-pointer flex items-center gap-2"
          >
            <span className="text-2xl">＋</span> Tambah Konten
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
                ? "Tambah Konten"
                : modalType === "edit"
                ? "Edit Konten"
                : modalType === "delete"
                ? "Hapus Konten"
                : "Detail Konten"}
            </h2>

            {modalType === "delete" ? (
              <>
                <p className="text-center text-lg mb-6">
                  Yakin ingin menghapus konten{" "}
                  <span className="font-semibold">{selectedKonten?.judul}</span>
                  ?
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
                      setKontenList((prev) =>
                        prev.filter((k) => k.id !== selectedKonten?.id)
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
              <div className="text-center text-lg">
                <p>
                  <strong>Tanggal:</strong> {selectedKonten?.tanggal}
                </p>
                <p className="mt-2">
                  <strong>Judul:</strong> {selectedKonten?.judul}
                </p>
                <div className="mt-6">
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
                  const newKonten: Konten = {
                    id: selectedKonten?.id || Date.now().toString(),
                    tanggal: formData.get("tanggal") as string,
                    judul: formData.get("judul") as string,
                  };

                  setKontenList((prev) => {
                    if (modalType === "edit") {
                      return prev.map((k) =>
                        k.id === newKonten.id ? newKonten : k
                      );
                    } else {
                      return [...prev, newKonten];
                    }
                  });
                  closeModal();
                }}
                className="flex flex-col gap-4"
              >
                <input
                  type="date"
                  name="tanggal"
                  defaultValue={selectedKonten?.tanggal}
                  required
                  className="border border-gray-300 rounded-md px-4 py-2"
                />
                <input
                  type="text"
                  name="judul"
                  defaultValue={selectedKonten?.judul}
                  placeholder="Judul Konten"
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
