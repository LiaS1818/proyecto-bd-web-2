import { Model, Schema, model } from "mongoose"
import { Task, TaskModel } from "../types/task.type" 
import { USER_REFERENCE } from './user.model'


export const TASK_REFERENCE = 'task'
const Tasks = new Schema<Task, TaskModel>(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      index: true,
      trim: true
    },
    status: {
      type: String,
      require: true,
      unique: false,
    },
    description: {
      type: String,
      required: true,
      index: true
    },
    createdAt:{
      type: Date,
      default: () => Date.now()
    }, 
    lastModified: {
      type: Date, 
      default: () => Date.now()
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: USER_REFERENCE
    }
  }
)

export default model(TASK_REFERENCE, Tasks)