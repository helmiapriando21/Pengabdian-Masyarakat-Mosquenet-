/* eslint-disable @typescript-eslint/no-explicit-any */

import { SelectType } from "@/interface/form";

interface SelectInputProps {
  optionsList: SelectType[],
  data: any,
  setData: React.Dispatch<React.SetStateAction<any>>,
  placeholder: string,
  dataKey: string,
  isError: boolean,
  message: string | boolean,
  label: string
}

export default function SelectInput({optionsList, data, setData, placeholder, dataKey, isError, message, label}: SelectInputProps) {
    return (
        <div>
            <label 
              htmlFor={label}
              className="font-bold"
            >
              {label}
            </label>
            <select
                id={label}
                key={dataKey}
                className="border-[#ccc] border-[1px] rounded-md bg-white px-2 py-1 w-full h-max text-black"
                value={data?.[dataKey] || ""}
                onChange={(e) => {
                    setData({
                        ...data, 
                        [dataKey]: e.target.value
                    });
                }}
            >
                <option value="" disabled>{placeholder}</option>
                {optionsList.map((value: SelectType) => {
                    return <option key={`${value.id}`} value={`${value.id}`}>{value.name}</option>
                })}
            </select>
            {isError && message && <p className="text-red-500 text-sm font-extralight px-2">{message}</p>}
        </div>
    );
}