import { Schema, model } from "mongoose";
import { User, UserModel } from "../types/user.type"

const Users = new Schema<User, UserModel>(
  {
    name: {
      type: String,
      required: true,
      unique: false,
      index: true,
      trim: true
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true
    },
    password: {
      type: String,
      required: true,
      unique: false,
      trim: false
    }
  },
  { timestamps: true} //agrega campos de fecha de creacion y modificacion
)

export default model('User', Users)
