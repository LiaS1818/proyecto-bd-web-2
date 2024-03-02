import express from "express";
import { Task } from "../types/task.type";
import TaskService from "../services/task.service";
import passport from "passport";

const router = express.Router()
const service = new TaskService()

router.post(
  '/',
  passport.authenticate('jwt', {session: false}),
  async (req, res) => {
    const task: Task = req.body
    const newTask = await service.create(task)

    res.status(201).json(newTask)
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