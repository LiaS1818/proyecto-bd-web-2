import type { Model } from "mongoose";
import type { Request } from "express";
import { User } from "./user.type";

export type Task = {
  id?: string
  name: string
  status: string
  description: string
  createdAt?: Date,
  lastModified?: Date
  user: User
}

export type UserRequestType = Request & {
  task: Task
}

export type TaskModel = Model<Task>