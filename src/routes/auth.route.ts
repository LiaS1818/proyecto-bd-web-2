import express from 'express'
import passport from 'passport'
import UserService from '../services/user.service'
import { UserRequestType as RequestType } from '../types/user.type'
import jwt from 'jsonwebtoken'
import { config } from '../config/config'

const router = express.Router()
const service = new UserService()


// Rutas protegidas

router.post(
  '/login',
  passport.authenticate('local', { session: false }),
  async (req: RequestType, res, next) => {
    try {
      // res.status(200).json({ message: 'todo bien (Y)'})
      const { user } = req
      //sub is the id of the subscribed user
      const payload = { sub: user.id }
      const token = jwt.sign(payload, config.jwtSecrete) //crea el token
      res.status(200).json({ user, token })
    } catch (error) {
      console.log(error)
      next(error)
    }
  }
)





export default router