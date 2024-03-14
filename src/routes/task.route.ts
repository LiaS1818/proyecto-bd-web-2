import express from "express";
import { Task } from "../types/task.type";
import TaskService from "../services/task.service";
import passport from "passport";
import { JwtRequestType, User} from "../types/user.type";
import { UserRequestType } from "../types/user.type";
import { ObjectId } from "mongoose";

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
  '/:taskId/status',
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