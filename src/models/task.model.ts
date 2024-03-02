import { Model, Schema, model } from "mongoose"
import { Task, TaskModel } from "../types/task.type" 

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
    createdAt:{
      type: Date,
      default: () => Date.now()
    }, 
    lastModified: {
      type: Date, 
      default: () => Date.now()
    }
  }
)

export default model('Task', Tasks)