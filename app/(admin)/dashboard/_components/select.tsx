export default function Select({isError, error, setValue, value, placeholder, dataKey, options, type}: any) {
  return (
    <div className="flex flex-col gap-2">
      <select
        onChange={(e) => {
          console.log(value[dataKey]);
          console.log(e.target.value);
          console.log(type);
          setValue({
            ...value,
            [dataKey]: type === "text" ? e.target.value : Number(e.target.value)
          });
        }}
        className="w-full border-[1px] border-black px-3 py-1 rounded-lg"
        value={type === "text" ? value[dataKey] : (value[dataKey] || "")}
      >
        <option value="" disabled>{placeholder}</option>
        {options.map((optionData: any, index: number) => (
          <option key={index} value={optionData.id}>{optionData.name}</option>
        ))}
      </select>
      {
        isError && <p className="text-red-500 text-xs">{error}</p>
      }
    </div>
  );
}