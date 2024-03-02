import jwt, { decode, verify } from 'jsonwebtoken'
import { config } from '../../config/config'
import { authorize } from 'passport'

const verifyJwt = (token: string) => {
  if(!token)  return null
 
    try{
      const decoded = jwt.verify(token, config.jwtSecrete)// decodifica el jwt, debe de ser con el mismo secret
      if(!decoded) return null

      return decoded
    }catch(error){
      console.log(error)
    }  
}

const extractFromJwt = (authorization: string) => {
  const token = authorization.split('')[1]
  return verifyJwt(token)
}

export { verifyJwt, extractFromJwt}
