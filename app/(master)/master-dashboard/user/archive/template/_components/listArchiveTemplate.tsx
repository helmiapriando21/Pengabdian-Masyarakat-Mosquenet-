"use client"

import { useEffect } from "react";
import { ArchiveTemplates } from "@/interface/archive";
import TemplateItems from "./templateItems";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { fetchTemplates } from "@/thunks/archiveThunks";

export default function ListArchiveTemplate() {
  const dispatch = useAppDispatch();
  const {templates, loading} = useAppSelector((state) => state.archive);

  useEffect(() => {
    if(!loading && (!templates || templates.length === 0)) {
      dispatch(fetchTemplates());
    }
  }, [dispatch, templates]);

  if(!loading && templates && templates.length !== 0)
    return (
      <div className="flex flex-col w-full h-full">
        {
          templates.map((value: ArchiveTemplates, index: number) => (
            <TemplateItems key={index} data={value} />
          ))
        }
      </div>
    );
}