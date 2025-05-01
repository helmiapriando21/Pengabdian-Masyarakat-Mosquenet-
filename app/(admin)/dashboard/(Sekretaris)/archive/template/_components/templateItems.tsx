import EditModal from "@/app/(admin)/dashboard/_components/editModal";
import { ArchiveTemplates } from "@/interface/archive";
import EditTemplates from "./editArchiveTemplate";
import confirmAlert from "@/services/confirmAlert";
import { useAppDispatch } from "@/store/hooks";
import { deleteTemplate, fetchTemplates } from "@/thunks/archiveThunks";
import notificationAlert from "@/services/notificationAlert";

interface TemplateItemsProps {
  data: ArchiveTemplates;
}

export default function TemplateItems({data}: TemplateItemsProps) {
  const dispatch = useAppDispatch();

  const deleteAction = async () => {
    const deleteConfirmation = await confirmAlert("Apakah anda yakin ingin menghapus template dokumen ini?", 'Ya, saya yakin!', 'Tidak, tunggu dulu');
    if(deleteConfirmation) {
      try {
        await dispatch(deleteTemplate(data.id)).unwrap();
        notificationAlert("Dokumen Berhasil dihapus!", "success", () => { dispatch(fetchTemplates() )});
      } catch (e) {
        notificationAlert('Dokumen Gagal dihapus!', 'error', () => {});
      }
    }
  }

  return (
    <div className="flex w-full h-full px-4 py-1 border-[1px] border-black items-center justify-between rounded-lg overflow-hidden">
      <div className="flex flex-col">
        <h1>{data.type}</h1>
      </div>
      <div className="flex gap-2 items-center">
        <button
          onClick={deleteAction}
          className="bg-red-500 rounded-full w-max h-max px-2 py-1 text-xs text-white"
        >
          Delete
        </button>
        <EditModal>
          <EditTemplates currentData={data} />
        </EditModal>
        <a 
          className="rounded-full w-max h-max px-2 py-1 text-xs border-black border-[1px]"
          href={`${process.env.NEXT_PUBLIC_API_STATIC_URL}/${data.document as string}`} 
          download
        >
          Download
        </a>
      </div>
    </div>
  );
}