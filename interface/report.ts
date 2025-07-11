export type MainTransaction = {
  amount: number,
  date: string
}
export type ReportData = MainTransaction & {
  description: string,
  type: "Pemasukan" | "Pengeluaran"
};

export type InformationReport = {
  name: string
};

export type CreateIncome = {
  amount: number,
  source_id: number
};

export type CreateOutcome = {
  amount: number,
  reason_id: number
};

export type IncomeData = MainTransaction & {
  source: string,
  source_id: number,
  id: number
}

export type OutcomeData = MainTransaction & {
  reason: string,
  reason_id: number,
  id: number
};