import UserEntity from '../../entities/UserEntity'
import { type IUserRepository } from '../../interfaces/IUserRepository'

class InMemoryUserRepository implements IUserRepository {
  public users: UserEntity[]

  constructor () {
    this.users = []
  }

  async create (user: UserEntity): Promise<void> {
    const newUser = new UserEntity(user)
    this.users.push(newUser)
  }

  async getUser (id: string): Promise<UserEntity | undefined> {
    const user = this.users.filter(user => user.id === id)
    return user[0]
  }

  async getUserByEmail (email: string): Promise<UserEntity | null> {
    const user = this.users.filter(user => user.email === email)
    return user[0]
  }
}

export default InMemoryUserRepository
