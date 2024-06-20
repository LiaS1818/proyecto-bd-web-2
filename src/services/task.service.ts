import { ObjectId } from 'mongoose'
import Tasks from '../models/task.model'
import { Task, TaskModel } from '../types/task.type' //importar modelo y tipo
import boom from '@hapi/boom'
import { ParseStatus } from 'zod'

class TaskService {

  // Crear una tarea
  async create(task: Task, userId: ObjectId) { //objectid se obtine de mongoose
    const newTask = await Tasks.create({
      ...task,
       user: userId
    }).catch((error) =>{
      console.log('Could not save category', error)
    })
    if (!newTask) {
      // Handle error or return early
      return null;
    }
    const existingTask = await Tasks.findById(newTask._id).populate('user');
    return existingTask;
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

  async updateStatus(id: string, status: string, userId: ObjectId){
    const updateTask =  await Tasks.findByIdAndUpdate(id, {status: status}, {new: true})
    console.log(updateTask)
    if(!updateTask){
      throw boom.notFound('Task not found')
    }

    const existingTask = await Tasks.findById(updateTask.id).populate({
      path: 'user',
      select: '-email -password' // Excluye al email y la contraseña
    });
    return existingTask;
   
  }

   // Método para encontrar una tarea por ID de tarea y ID de usuario
   async find( user: ObjectId) {
    try {
      const task = await Tasks.find({ user: user }).exec();
      return task;
    } catch (error) {
      throw new Error('Error al buscar la tarea: ' + error.message);
    }
  }

}

function errorDB(error) {
  console.log('Error while conecting to the DB', error)
} 



export default TaskService