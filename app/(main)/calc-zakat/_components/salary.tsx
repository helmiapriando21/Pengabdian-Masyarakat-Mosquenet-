import { SalaryType } from "@/interface/calculator_zakat";
import { ChangeEvent, useState } from "react";

export default function Salary() {
  const [salary, setSalary]  = useState<SalaryType>({
    salaryPerMonth: [0],
    totalSalaryPerMonth: 0,
  });

  const addNewSalary = () => {
    setSalary((prevSalary: SalaryType) => ({
      ...prevSalary,
      salaryPerMonth: [...prevSalary.salaryPerMonth, 0]
    }));
  }

  const changeSalary = (e: ChangeEvent<HTMLInputElement>, index: number) => {
    setSalary((prevSalary: SalaryType) => {
      const currentSalary = [...prevSalary.salaryPerMonth];
      currentSalary[index] = Number(e.target.value);
      const totalSalaryPerMonth = currentSalary.reduce((acc: number, curr: number) => acc + curr, 0);

      return {
        ...prevSalary,
        salaryPerMonth: currentSalary,
        totalSalaryPerMonth: totalSalaryPerMonth
      }
    });
  }

  const countSalary = () => {
    setSalary((prevPenghasilan: SalaryType) => ({
      ...prevPenghasilan,
      result: salary.totalSalaryPerMonth >= 7140498 
        ? (prevPenghasilan.totalSalaryPerMonth * (2.5)) / 100 
        : undefined
    }));
  }

  return (
    <div className="flex flex-col">
        <h1>{salary?.totalSalaryPerMonth.toLocaleString('id-ID')}</h1>
        <p>Untuk dapat mengikuti zakat penghasilan, pastikan Nisab per tahun sebesar 85 Gram Emas (Setara Rp 85.685.972) atau untuk perbulannya 1/12 dari nisab per tahun.</p>
        <p>Total zakat : {salary?.result?.toLocaleString('id-ID')}</p>
        <button
          onClick={addNewSalary}
        >
          Tambah Penghasilan
        </button>
        {
          salary?.salaryPerMonth?.map((value: number, index: number) => (
            <input 
              key={index}
              type="number"
              min={0}
              onChange={(e: ChangeEvent<HTMLInputElement>) => changeSalary(e, index)}
              value={value}
              className="border-2 border-black"
            />
          ))
        }
        <button
          onClick={countSalary}
        >
          hitung
        </button>
    </div>
  );
}