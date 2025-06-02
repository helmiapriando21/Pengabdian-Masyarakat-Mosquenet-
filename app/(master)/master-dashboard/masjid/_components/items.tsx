import { useAppDispatch } from "@/store/hooks";
import { ListMosque } from "@/interface/mosque";
import { fetchMosques, verifyMosque } from "@/thunks/mosqueThunks";
import notificationAlert from "@/services/notificationAlert";
import confirmAlert from "@/services/confirmAlert";

interface Items {
  data: ListMosque;
}

export default function Items({data}: Items) {
  const dispatch = useAppDispatch();

  const verify = async () => {
    const verifyConfirmation = await confirmAlert("Apakah anda yakin ingin memverifikasi masjid ini?", 'Ya, saya yakin!', 'Tidak, tunggu dulu');
    if(verifyConfirmation){ 
      try {
        await dispatch(verifyMosque({id: data.id, verified: true})).unwrap();
        notificationAlert("Masjid Berhasil diverifikasi!", "success", () => { dispatch(fetchMosques('/api/master/mosque') )});
      } catch (e) {
        notificationAlert('Masjid Gagal diverifikasi!', 'error', () => {});
      }
    }
  }

  const deleteAction = async () => {
    const deleteConfirmation = await confirmAlert("Apakah anda yakin ingin menonaktifkan masjid ini?", 'Ya, saya yakin!', 'Tidak, tunggu dulu');
    if(deleteConfirmation){ 
      try {
        await dispatch(verifyMosque({id: data.id, verified: false})).unwrap();
        notificationAlert("Masjid Berhasil dinonaktifkan! Aktifkan kembali jika diinginkan", "success", () => { dispatch(fetchMosques('/api/master/mosque') )});
      } catch (e) {
        notificationAlert('Masjid Gagal dinonaktifkan!', 'error', () => {});
      }
    }
  }

  return (
    <div className="flex w-full h-full px-4 py-1 border-[1px] border-black items-center justify-between rounded-lg overflow-hidden">
      <div className="flex flex-col">
        <h1>{data.name}</h1>
        <h1>{data.location}</h1>
      </div>
      <div className="flex gap-2 items-center">
        {
          data.verified && <button
            onClick={deleteAction}
            className="bg-red-500 rounded-full w-max h-max px-2 py-1 text-xs text-white"
          >
            Delete
          </button>
        }
        {
          !data.verified && <button
          onClick={verify}
          className="bg-green-500 rounded-full w-max h-max px-2 py-1 text-xs text-white"
        >
          Verifikasi
        </button>
        }
      </div>
    </div>
  );
}