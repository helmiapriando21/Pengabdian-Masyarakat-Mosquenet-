"use client"

import { useEffect } from "react";
import { ArchiveDocuments } from "@/interface/archive";
import TemplateItems from "./items";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { fetchDocuments } from "@/action/archiveAction";

export default function ListArchive() {
  const dispatch = useAppDispatch();
  const {documents, loading} = useAppSelector((state) => state.archive);

  useEffect(() => {
    if(!loading && (!documents || documents.length === 0)) {
      dispatch(fetchDocuments());
    }
  }, [dispatch, documents]);

  if(!loading && documents && documents.length !== 0)
    return (
      <div className="flex flex-col w-full h-full">
        {
          documents.map((value: ArchiveDocuments, index: number) => (
            <TemplateItems key={index} data={value} />
          ))
        }
      </div>
    );
}