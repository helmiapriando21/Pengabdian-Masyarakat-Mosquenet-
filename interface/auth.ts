
export type AuthForgot = {
  email: string
}

export type AuthVerification = {
  token: string
}

export type AuthResetPassword = {
  password: string,
  confirmPassword: string
}

export type UserData = {
  email: string,
  password: string,
  name: string,
  telp: string,
  mosque_id: number | undefined
}

export type MosqueData = {
  name: string,
  location: string,
  subdistrict_id: number,
  cityorregency_id: number,
  province_id: number,
  ward_id: number
}