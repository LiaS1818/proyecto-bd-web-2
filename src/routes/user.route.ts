import express from 'express'
import passport from 'passport'
import { User } from '../types/user.type'
import UserService from '../services/user.service'

const router = express.Router()
const service = new UserService()

router.post('/', async (req, res) =>{
  const user: User = req.body
  const newUser = await service.create(user)
  res.status(201).json(newUser)
})

router.get('/all',
  passport.authenticate('jwt', { session: false }),
  async (req, res) => {
  const users = await service.findAll()
  res.status(200).json(users)
})

router.get('/:id',
  passport.authenticate('jwt', { session: false }),
  async (req, res, next) => {
  try {
    const users = await service.findbyId(req.params.id)
    res.status(200).json(users)
  } catch (error) {
    next(error)
  }
 
})

router.get('/', 
  passport.authenticate('jwt', { session: false }),
  async(req, res, next) =>{
    try {
      const user = await service.findByEmail(req.query.name as string)
      res.status(200).json(user)
    } catch (error) {
     next(error)
    }
})

router.get('/user')

export default router