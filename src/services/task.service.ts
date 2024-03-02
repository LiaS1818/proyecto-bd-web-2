import Tasks from '../models/task.model'
import { Task } from '../types/task.type' //importar modelo y tipo
import boom from '@hapi/boom'

class TaskService {

  // Crear una tarea
  async create(task: Task) {
    const newTask = await Tasks.create(task).catch((error) =>{
      console.log('Could not save category', error)
    })
    return newTask
  }

  async findAll() {
    const tasks =  await Tasks.find().catch((error)=>{
      errorDB(error)
    })
    if(!tasks){
      throw boom.notFound('There are not taks yet')
    }
    return tasks
  }

  async findById(id: string){
    const tasks =  await Tasks.findById(id).catch((error) => {
      errorDB(error)
    })
    if (!tasks) {
      throw boom.notFound('Task not found')
    }
  }

  async findByName(name: string) {
    const task = await Tasks.findOne({name}).catch((error) =>{
      errorDB(error)
    })
  }

}

function errorDB(error) {
  console.log('Error while conecting to the DB', error)
} 

export default TaskService