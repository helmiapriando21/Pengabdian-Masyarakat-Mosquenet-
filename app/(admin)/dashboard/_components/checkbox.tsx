import { ChangeEventHandler } from "react";

interface CheckboxProps {
  label: string,
  value: string,
  onChange: ChangeEventHandler<HTMLInputElement>
}

export default function Checkbox({ label, value, onChange }: CheckboxProps) {
  return (
    <div className="flex flex-col gap-2 items-center">
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