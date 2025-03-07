export default function Checkbox({ label, value, onChange }: any) {
  return (
    <div className="flex flex-col gap-2">
      <input 
        id={label} 
        type="checkbox" 
        value={label} 
        checked={value === label}
        onChange={onChange}
      />
      <label htmlFor={label}>{label}</label>
    </div>
  );
}