import express from "express";
import { Task } from "../types/task.type";
import TaskService from "../services/task.service";
import passport, { session } from "passport";
import { JwtRequestType, User} from "../types/user.type";
import { UserRequestType } from "../types/user.type";
import { ObjectId, Types } from "mongoose";
import { unknown } from "zod";

const router = express.Router()
const service = new TaskService()

router.post(
  '/',
  passport.authenticate('jwt', {session: false}),
  async (req: JwtRequestType,  res) => {
    //es lo mismo que: const sub = req.user.sub
    const {user: {sub}} = req
    console.log(sub)
    const task: Task = req.body
    const newTask = await service.create(task, sub as unknown as ObjectId)// guardando el object id a category

    res.status(201).json(newTask)
  }
)

router.put(
  '/aupdate/:taskId',
  passport.authenticate('jwt', {session: false}),
  async (req:JwtRequestType, res) => {
    const {user: {sub}} = req
    const taskId = req.params.taskId;
    const newStatus = req.body.status;

      // Actualizar la tarea con el nuevo estado
      const updateTask = await service.updateStatus(taskId, newStatus, sub as unknown as ObjectId)
    res.status(201).json(updateTask)
      
  }
)

// Obtner las tareas del usuairo
router.get(
  '/misTasks',
  passport.authenticate('jwt', {session:false}),
  async (req:JwtRequestType, res) => {
    try {
      const {user: {sub}} = req;
      if (typeof sub !== 'string') {
        return res.status(400).json({ message: 'Invalid user ID.' });
      }
      const user = new Types.ObjectId(sub)
      // Buscar tareas que coincidan con el taskId y l id del usuario
      const task = await service.find( sub as unknown as ObjectId );

      if (!task) {
        return res.status(404).json({ message: 'No se encontraron tareas para este usuario.', sub: user });
      }

      // Responder con la tarea encontrada
      res.json(task);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error al obtener la tarea.' });
    }
  }
);

router.get('/',
  passport.authenticate('jwt', {session: false}),
  async(req, res, next) =>{

    try{
      const tasks = await service.findAll()
      res.status(200).json(tasks)
    }catch(error){
      next(error)
    }
  }
)

export default router