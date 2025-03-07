"use client"

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Input from "../../../_components/input";
import basicValidation from "@/validation/basic-validation";
import { getDetailKegiatanMasjid } from "@/helper/getData";
import showAlert from "@/helper/showAlert";



export default function EditKegiatan({ id }: any) {
  const [data, setData] = useState({
    name: "",
    description: "",
    pic: "",
    document: null as File | null,
    image: null as File | null,
    address: "",
    video: "",
    date: "",
    time: ""
  });
  const [isError, setIsError] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [previousDocument, setPreviousDocument] = useState<string>();
  const [previousImage, setPreviousImage] = useState<string>();
  const router = useRouter();

  const init = async () => {
    const response = await getDetailKegiatanMasjid(setIsLoading, Number(id));
    console.log(response);

    const date = response.date;
    response.date = new Date(date).toISOString().split("T")[0];
    response.time = `${new Date(date).getUTCHours().toString().padStart(2, "0")}:${new Date(date).getUTCMinutes().toString().padStart(2, "0")}`;

    if(response.document) setPreviousDocument(response.document);
    if(response.image) setPreviousImage(response.image);
    response.video = response.video_documentation;

    const { document, image, video_documentation, ...rest } = response;
    setData(rest);
  }

  useEffect(() => {
    if(isLoading && id) {
      init();
    }
  }, [id])

  const action = async () => {
    if(
      !basicValidation(data.name, 'Nama kegiatan') &&
      !basicValidation(data.description, 'Deskripsi kegiatan') &&
      !basicValidation(data.pic, 'Penanggungjawab kegiatan') &&
      !basicValidation(data.address, 'Alamat kegiatan') &&
      !basicValidation(data.date, 'Tanggal kegiatan') &&
      !basicValidation(data.time, 'Jam mulai kegiatan')
    ) {
      try {
        const formData = new FormData();
        Object.entries(data).forEach(([key, value]) => {
          if (value) formData.append(key, value);
        });

        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/kegiatan/edit`, {
          method: "POST",
          body: formData
        });

        const responseData = await response.json();
        if(response.ok) {
          showAlert(responseData.message, router, "success", '/this-page');
        } else {
          showAlert(responseData.error || "Terjadi kesalahan pada mengubah kegiatan, silahkan coba lagi!", router, "error", '/auth');
        }
      } catch (e) {
        showAlert("Terjadi kesalahan pada menambahkan kegiatan, silahkan coba lagi!", router, "error", '/auth');
      }
    } else setIsError(true);
  }
  
  if(!isLoading && data)
    return (
      <div className="flex flex-col gap-3 h-full">
        <h1 className="font-bold text-black text-xl">Edit Kegiatan</h1>
        <div className="flex flex-col gap-3 overflow-scroll h-full px-10">
          <Input 
            isError={isError}
            setValue={setData}
            value={data}
            placeholder="Masukkan nama kegiatan"
            dataKey="name"
            type="text"
            error={basicValidation(data.name, 'Nama kegiatan')}
          />
          <Input 
            isError={isError}
            setValue={setData}
            value={data}
            placeholder="Masukkan deskripsi kegiatan"
            dataKey="description"
            type="text"
            error={basicValidation(data.description, 'Deskripsi kegiatan')}
          />
          <Input 
            isError={isError}
            setValue={setData}
            value={data}
            placeholder="Masukkan penanggungjawab kegiatan"
            dataKey="pic"
            type="text"
            error={basicValidation(data.pic, 'Penanggungjawab kegiatan')}
          />
          <Input 
            isError={isError}
            setValue={setData}
            value={data}
            placeholder="Masukkan Alamat kegiatan"
            dataKey="address"
            type="text"
            error={basicValidation(data.address, 'Alamat kegiatan')}
          />
          <Input 
            isError={isError}
            setValue={setData}
            value={data}
            placeholder="Masukkan Tanggal kegiatan"
            dataKey="date"
            type="date"
            error={basicValidation(data.date, 'Tanggal kegiatan')}
          />
          <Input 
            isError={isError}
            setValue={setData}
            value={data}
            placeholder="Masukkan Jam mulai kegiatan"
            dataKey="time"
            type="time"
            error={basicValidation(data.time, 'Jam mulai kegiatan')}
          />
          <div className="flex flex-col gap-1">
            <Input 
              isError={false}
              setValue={setData}
              value={data}
              placeholder="Masukkan Dokumen pelaksanaan kegiatan"
              dataKey="document"
              type="file"
              error={""}
            />
            {
              previousDocument 
                && <a 
                  href={`${process.env.NEXT_PUBLIC_API_STATIC_URL}/${previousDocument}`}
                  className="text-blue-400 underline-offset-2 underline text-start"
                  download
                >
                  Dokumen Sebelumnya
                </a>
            }
          </div>
          <div className="flex flex-col gap-1">
            <Input 
              isError={false}
              setValue={setData}
              value={data}
              placeholder="Masukkan Gambar kegiatan"
              dataKey="image"
              type="file"
              error={""}
            />
            {
              previousImage 
                && <img 
                  src={`${process.env.NEXT_PUBLIC_API_STATIC_URL}/${previousImage}`} 
                  className="w-32 h-auto"
                />
            }
          </div>
          <Input 
            isError={false}
            setValue={setData}
            value={data}
            placeholder="Masukkan URL video dokumentasi kegiatan"
            dataKey="video"
            type="text"
            error={""}
          />
          <button
            className="bg-green-600 rounded-lg px-3 py-1 text-white"
            onClick={action}
          >
            Edit Kegiatan
          </button>
        </div>
      </div>
    );
}