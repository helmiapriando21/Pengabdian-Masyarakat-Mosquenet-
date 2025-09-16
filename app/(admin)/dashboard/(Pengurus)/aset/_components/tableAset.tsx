"use client";

import Thead from "@/app/components/thead";
import { useEffect } from "react";
import EditAset from "./editAset";
import EditModal from "../../../_components/editModal";
import { ListAset } from "@/interface/aset";
import confirmAlert from "@/services/confirmAlert";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { deleteAsset, fetchAssets } from "@/action/assetAction";
import notificationAlert from "@/services/notificationAlert";
import Text from "@/app/components/Text";
import clsx from "clsx";
import Modal from "../../../_components/modal";
import CreateAset from "./createAset";

export default function TableAset() {
  const dispatch = useAppDispatch();
  const { items, loading } = useAppSelector((state) => state.assets);

  const deleteAction = async (id: number) => {
    const deleteConfirmation = await confirmAlert(
      "Apakah anda yakin ingin menghapus aset ini?",
      "Ya, saya yakin!",
      "Tidak, tunggu dulu"
    );
    if (deleteConfirmation) {
      try {
        await dispatch(deleteAsset(id)).unwrap();
        notificationAlert("Aset Berhasil dihapus!", "success", () => {
          dispatch(fetchAssets());
        });
      } catch (e) {
        notificationAlert("Aset Gagal dihapus!", "error", () => {});
      }
    }
  };

  useEffect(() => {
    if (!loading && !items) dispatch(fetchAssets());
  }, [dispatch, items]);

  if (!loading && items && items.length > 0)
    return (
      <div className="min-h-screen px-6 py-10 relative overflow-x-hidden">
        <Text
          type="header1"
          className="text-[22px] font-bold text-white mb-8 text-center"
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
          {items.map((item, index) => (
            <div
              key={index}
              className="grid grid-cols-12 bg-white rounded-[10px] py-[20px] px-[20px] mb-4 shadow hover:bg-gray-50 transition"
              style={{ gridTemplateColumns: "3fr 2fr 2fr 3fr" }}
            >
              <div className="text-lg text-center">{item.name}</div>
              <div className="text-lg text-center">{item.amount}</div>
              <div className="flex justify-center">
                <div
                  className={clsx(
                    "rounded-[25px] text-white text-center flex items-center justify-center text-sm font-semibold",
                    "w-[133px] h-[33px]",
                    item.condition === "Baik" ? "bg-green-600" : "bg-red-600"
                  )}
                >
                  {item.condition}
                </div>
              </div>
              <div className="flex justify-center gap-3">
                <button
                  onClick={() => openModal("edit", item)}
                  className={clsx(
                    "rounded-[25px] text-white text-center flex items-center justify-center text-sm font-semibold",
                    "w-[133px] h-[33px] bg-yellow-800 cursor-pointer"
                  )}
                >
                  Edit
                </button>
                <button
                  onClick={() => openModal("delete", item)}
                  className={clsx(
                    "rounded-[25px] text-white text-center flex items-center justify-center text-sm font-semibold",
                    "w-[133px] h-[33px] bg-red-700 cursor-pointer"
                  )}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
        <div className="flex justify-center mt-8">
          <Modal label="+ Tambah">
            <CreateAset />
          </Modal>
        </div>
      </div>
    );
  else if (items && items.length === 0)
    return <div>Belum ada aset yang terdata</div>;
}

function openModal(arg0: string, item: ListAset): void {
  throw new Error("Function not implemented.");
}
