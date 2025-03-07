export default function SelectInput({optionsList, data, setData, placeholder, dataKey, isError, message, label}: any) {
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
                value={data[dataKey] || ""}
                onChange={(e) => {
                    setData({
                        ...data, 
                        [dataKey]: e.target.value
                    });
                }}
            >
                <option value="" disabled>{placeholder}</option>
                {optionsList.map((value: any) => {
                    return <option key={value.id} value={value.id}>{value.name}</option>
                })}
            </select>
            {isError && message && <p className="text-red-500 text-sm font-extralight px-2">{message}</p>}
        </div>
    );
}