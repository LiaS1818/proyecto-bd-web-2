import express from 'express'
import { User } from '../types/user.type'
import UserService from '../services/user.service'

const router = express.Router()
const service = new UserService()

router.post('/', async (req, res) =>{
  const user: User = req.body
  const newUser = await service.create(user)
  res.status(201).json(newUser)
})

router.get('/', async (req, res) => {
  const users = await service.findAll()
  res.status(200).json(users)
})

export default router