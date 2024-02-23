import Users from '../models/user.model'
import { User, UserModel } from '../types/user.type'
import boom from '@hapi/boom'

class UserService {
  async create(user: User) {
    const newUser = await Users.create(user).catch((error) =>{
      console.log('Could not save User', error)
    })
    return newUser
  }

  async findAll() {
    const users = await Users.find().catch((error) =>{
      console.log('Error while connecting to the DB')
    })

    if(!users) {
      throw boom.notFound('There are not users');
    }
    return users 
  } 
}

export default UserService