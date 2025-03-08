export default function Input({ data, setData, dataKey, type, placeholder, isError, message, label}: any) {
    return (
        <div className="flex flex-col gap-1">
            <label 
              htmlFor={label}
              className="font-bold"
            >
                {label}
            </label>
            <input
                id={label}
                type={type}
                onChange={(e) => {
                    setData({
                        ...data,
                        [dataKey]: e.target.value
                    });
                }}
                className="border-[#ccc] border-[1px] rounded-md bg-white px-2 py-1 w-full h-max"
                placeholder={placeholder}
                value={data?.[dataKey] || ""}
            />
            {isError && message && <p className="text-red-500 text-sm font-extralight px-2">{message}</p>}
        </div>
    );
}