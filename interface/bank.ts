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
  purpose: string,
  id?: string
};

export type Donation = {
  name: string;
  amount: number;
  image: File | String;
}

export type AdminDonationDisplay = Donation & {
  type: string;
  verified: boolean;
  masjid_id: string;
  id: string;
}