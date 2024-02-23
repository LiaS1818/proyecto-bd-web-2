import type { Model } from 'mongoose'

export type User = {
  id?: string
  name: string
  email: string
  password: string
  phone: string
}

export type UserModel = Model<User>