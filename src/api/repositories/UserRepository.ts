import { type IUserRepository } from '../interfaces/IUserRepository'
import { prisma } from '../../db/prisma'
import UserEntity from '../entities/UserEntity'

class UserRepository implements IUserRepository {
  async create (user: UserEntity): Promise<void> {
    const newUser = new UserEntity(user)
    if (newUser.id !== undefined) {
      await prisma.user.create({
        data: {
          name: newUser.name,
          email: newUser.email,
          password_hash: newUser.password_hash,
          id: newUser.id
        }
      })
    }
  }
}

export default UserRepository
