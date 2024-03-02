import { Schema, model } from "mongoose";
import { User, UserModel } from "../types/user.type"
const z = require('zod')

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
      trim: true,
      // match: [EMAIL_REGEX, 'Please enter a valid email']
    },
    password: {
      type: String,
      required: true
    },
    phoneNumber: {
      type: String,
      trim: true,
      // match: [PHONE_NUMBER_REGEX, 'Please enter a valid phone number']
    },
    createdAt: {
      type: Date,
      default: () => Date.now()
    },
    lastModified: {
      type: Date,
      default: () => Date.now()
    }
  }
)

export default model('User', Users)
