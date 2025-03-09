export type ListAset = {
  amount: number,
  condition: "Baik" | "Sedang_diperbaiki" | "Rusak",
  id?: number,
  name: string,
  unit: string
};

export type AsetAnalytic = {
  total: number,
  [key: string]: number
};

export type AsetDashboard = {
  baik: AsetAnalytic,
  rusak: AsetAnalytic,
  sedang_diperbaiki: AsetAnalytic
};