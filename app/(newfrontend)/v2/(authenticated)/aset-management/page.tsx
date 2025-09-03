"use client";

import Text from "@/app/components/Text";
import IMG from "@/content/img";
import clsx from "clsx";
import React, { useState } from "react";

interface Asset {
  id: string;
  name: string;
  quantity: number;
  condition: "baik" | "rusak";
}

const initialData: Asset[] = [
  { id: "1", name: "Kursi", quantity: 12, condition: "baik" },
  { id: "2", name: "Karpet", quantity: 5, condition: "rusak" },
];

export default function TableAssetMasjid() {
  const [assets, setAssets] = useState<Asset[]>(initialData);
  const [modalType, setModalType] = useState<
    "tambah" | "edit" | "delete" | null
  >(null);
  const [selectedAsset, setSelectedAsset] = useState<Asset | null>(null);

  const openModal = (type: "tambah" | "edit" | "delete", asset?: Asset) => {
    setModalType(type);
    setSelectedAsset(asset || null);
  };

  const closeModal = () => {
    setModalType(null);
    setSelectedAsset(null);
  };

  const pillClass =
    "rounded-[25px] text-white text-center flex items-center justify-center text-sm font-semibold";

  return (
    <div
      className="min-h-screen w-full px-6 py-10 relative"
      style={{
        backgroundImage: `url(${IMG.BG_ASET_MANAGEMENT})`,
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
          Data Aset Masjid
        </Text>

        {/* Card Table Container */}
        <div className="bg-[rgba(255,255,255,0.5)] rounded-[10px] px-[27px] py-[33px] shadow-[0px_10px_10px_0px_rgba(0,0,0,0.25)]">
          {/* Header Table */}
          <div
            className="grid grid-cols-12 mb-4 py-[15px] px-[20px] bg-gray-100 rounded-md"
            style={{ gridTemplateColumns: "3fr 2fr 2fr 3fr" }}
          >
            {["Nama Aset", "Jumlah", "Kondisi", "Aksi"].map((header) => (
              <div
                key={header}
                className="text-xl font-semibold text-center text-black"
              >
                {header}
              </div>
            ))}
          </div>

          {/* Row Aset */}
          {assets.map((item) => (
            <div
              key={item.id}
              className="grid grid-cols-12 bg-white rounded-[10px] py-[20px] px-[20px] mb-4 shadow hover:bg-gray-50 transition"
              style={{ gridTemplateColumns: "3fr 2fr 2fr 3fr" }}
            >
              <div className="text-lg text-center">{item.name}</div>
              <div className="text-lg text-center">{item.quantity}</div>
              <div className="flex justify-center">
                <div
                  className={clsx(
                    pillClass,
                    "w-[133px] h-[33px]",
                    item.condition === "baik" ? "bg-green-600" : "bg-red-600"
                  )}
                >
                  {item.condition}
                </div>
              </div>
              <div className="flex justify-center gap-3">
                <button
                  onClick={() => openModal("edit", item)}
                  className={clsx(
                    pillClass,
                    "w-[133px] h-[33px] bg-yellow-800 cursor-pointer"
                  )}
                >
                  Edit
                </button>
                <button
                  onClick={() => openModal("delete", item)}
                  className={clsx(
                    pillClass,
                    "w-[133px] h-[33px] bg-red-700 cursor-pointer"
                  )}
                >
                  Delete
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
            <span className="text-2xl">＋</span> Tambah Aset
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
                ? "Tambah Aset"
                : modalType === "edit"
                ? "Edit Aset"
                : "Hapus Aset"}
            </h2>

            {modalType === "delete" ? (
              <>
                <p className="text-center text-lg mb-6">
                  Yakin ingin menghapus aset{" "}
                  <span className="font-semibold">{selectedAsset?.name}</span>?
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
                      setAssets((prev) =>
                        prev.filter((a) => a.id !== selectedAsset?.id)
                      );
                      closeModal();
                    }}
                    className="bg-red-700 text-white px-6 py-2 rounded-full font-semibold cursor-pointer"
                  >
                    Hapus
                  </button>
                </div>
              </>
            ) : (
              <>
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    const formData = new FormData(e.currentTarget);
                    const newAsset: Asset = {
                      id: selectedAsset?.id || Date.now().toString(),
                      name: formData.get("name") as string,
                      quantity: Number(formData.get("quantity")),
                      condition: formData.get("condition") as "baik" | "rusak",
                    };

                    setAssets((prev) => {
                      if (modalType === "edit") {
                        return prev.map((a) =>
                          a.id === newAsset.id ? newAsset : a
                        );
                      } else {
                        return [...prev, newAsset];
                      }
                    });
                    closeModal();
                  }}
                  className="flex flex-col gap-4"
                >
                  <input
                    type="text"
                    name="name"
                    defaultValue={selectedAsset?.name}
                    placeholder="Nama Aset"
                    required
                    className="border border-gray-300 rounded-md px-4 py-2"
                  />
                  <input
                    type="number"
                    name="quantity"
                    defaultValue={selectedAsset?.quantity}
                    placeholder="Jumlah"
                    required
                    className="border border-gray-300 rounded-md px-4 py-2"
                  />
                  <select
                    name="condition"
                    defaultValue={selectedAsset?.condition || "baik"}
                    className="border border-gray-300 rounded-md px-4 py-2"
                  >
                    <option value="baik">Baik</option>
                    <option value="rusak">Rusak</option>
                  </select>
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
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
