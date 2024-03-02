import Users from '../models/user.model'
import { User, UserModel } from '../types/user.type'
import boom from '@hapi/boom'
import bcrypt from 'bcrypt'

class UserService {
  async create(user: User) {
    
    const hashedPassword = await bcrypt.hash(user.password, 10)
    const newUser = await Users.create({...user, //le pasa individualmente cada propiedad del objeto
      password: hashedPassword
    }).catch((error) =>{
      console.log('Could not save User', error)
    })
    return newUser
  }

  async findAll() {
    // Se selecciona el atributos que se muestran en el lado del cliente, asi se ecultan datos sensible e inecesarios para el usuario
    const users = await Users.find({}, {name: 1, email: 1}).exec().catch((error) =>{
      console.log('Error while connecting to the DB')
    })

    if(!users) {
      throw boom.notFound('There are not users');
    }
    return users 
  } 

  async findbyId(id: String) {
    const user = await Users.findById(id).catch((error) => {
      console.log('Error while connecting to the DB', error)

    })
    return user
  }

  
  async findByName(name: string) {
    const category = await Users.findOne({ name }).catch((error) => {
      console.log('Error while connecting to the DB', error)
    })

    if (!category) {
      throw boom.notFound('Category not found')
    }
    return category
  }

  async findByEmail(email: string) {
    const user = await Users.findOne({ email }).catch((error) =>{
      console.log(user)
      console.log('Could not retrive user info', error)
    })
    if (!user) {
      throw boom.notFound('User not found')
    }

    return user
  }
}

export default UserService