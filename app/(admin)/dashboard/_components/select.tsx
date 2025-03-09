import { SelectType } from "@/interface/form";

interface SelectProps {
  isError: boolean,
  error: string | boolean,
  setValue: React.Dispatch<React.SetStateAction<any>>,
  value: any,
  placeholder: string,
  dataKey: string,
  type: string,
  options: SelectType[]
}

export default function Select({isError, error, setValue, value, placeholder, dataKey, options, type}: SelectProps) {
  return (
    <div className="flex flex-col gap-2">
      <select
        onChange={(e) => {
          setValue({
            ...value,
            [dataKey]: type === "text" ? e.target.value : Number(e.target.value)
          });
        }}
        className="w-full border-[1px] border-black px-3 py-1 rounded-lg"
        value={value?.[dataKey] || ""}
      >
        <option value="" disabled>{placeholder}</option>
        {options.map((optionData: SelectType, index: number) => (
          <option key={index} value={optionData.id}>{optionData.name}</option>
        ))}
      </select>
      {
        isError && <p className="text-red-500 text-xs">{error}</p>
      }
    </div>
  );
}