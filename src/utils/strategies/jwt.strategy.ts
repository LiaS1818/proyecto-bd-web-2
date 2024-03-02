import { Strategy, ExtractJwt } from "passport-jwt";
import {config} from '../../config/config'

const options = { //variable de opciones
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), 
  secretOrKey: config.jwtSecrete // le pasamos el secreto para desencriptarlo
}

const JwtStrategy = new Strategy(options, (payload, next) =>{ //recibe las opciones y tiene una funcion que recibe el payload con el usuario
  return next(null, payload)
})

export default JwtStrategy