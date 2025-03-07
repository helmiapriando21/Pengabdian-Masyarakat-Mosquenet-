export default function Input({isError, error, setValue, value, placeholder, dataKey, type}: any) {
  return (
    <div className="flex flex-col gap-2">
      <input
        type={type}
        className="w-full border-[1px] border-black px-3 py-1 rounded-lg"
        onChange={(e) => {
          setValue({
            ...value,
            [dataKey]: type === "number" 
              ? Number(e.target.value) 
              : type === "file" 
              ? e.target.files?.[0] 
              : e.target.value
          });
        }}
        {...(type !== 'file' && { value: value[dataKey] || "" })}
        placeholder={placeholder}
      />
      {
        isError && <p className="text-red-500 text-xs">{error}</p>
      }
    </div>
  );
}