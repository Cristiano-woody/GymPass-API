import { type IUserRepository } from '../interfaces/IUserRepository'
import { prisma } from '../../db/prisma'
import UserEntity from '../entities/UserEntity'

class UserRepository implements IUserRepository {
  async create (user: UserEntity): Promise<void> {
    const newUser = new UserEntity(user)
    if (newUser.id !== undefined && newUser.password_hash !== undefined) {
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

  async getUser (id: string): Promise<UserEntity | null> {
    const user = await prisma.user.findUnique({
      where: {
        id
      }
    })
    return user
  }

  async getUserByEmail (email: string): Promise<UserEntity | null> {
    const user = await prisma.user.findUnique({
      where: {
        email
      }
    })
    return user
  }

  async getAllUsers (): Promise<UserEntity[]> {
    const allUsers = await prisma.user.findMany()
    return allUsers
  }

  async update (body: { id: string, name?: string, email?: string, password_hash?: string }): Promise<void> {
    await prisma.user.update({
      where: {
        id: body.id
      },
      data: {
        name: body.name,
        email: body.email,
        password_hash: body.password_hash
      }
    })
  }

  async delete (id: string): Promise<void> {
    await prisma.user.delete({
      where: {
        id
      }
    })
  }
}

export default UserRepository
