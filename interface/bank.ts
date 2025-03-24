type BankAccount = {
  name: string,
  alias_name: string,
  bank: string,
  account: string,
  email: string,
  image: string | File
};

export type CreateBank = BankAccount & {
  purpose_id: number
};

export type ListBank = BankAccount & {
  purpose: string
};