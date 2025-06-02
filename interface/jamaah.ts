export type Admin = {
  status: boolean,
  role: string
}

export type Jamaah = {
  admin: Admin,
  email: string,
  name: string, 
  isVerifiedByAdmin: boolean
};