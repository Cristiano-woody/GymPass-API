import UserEntity from '../../entities/UserEntity'
import { type IUserRepository } from '../../interfaces/IUserRepository'

class InMemoryUserRepository implements IUserRepository {
  public users: UserEntity[] = []

  async create (user: UserEntity): Promise<UserEntity> {
    const newUser = new UserEntity(user)
    this.users.push(newUser)
    return newUser
  }

  async getAllUsers (): Promise<UserEntity[]> {
    return this.users
  }

  async getUser (id: string): Promise<UserEntity | null> {
    const user = this.users.filter(user => user.id === id)
    return user[0]
  }

  async getUserByEmail (email: string): Promise<UserEntity | null> {
    const user = this.users.filter(user => user.email === email)
    return user[0]
  }

  async update (body: { id: string, name?: string, email?: string, passwod_hash?: string }): Promise<void> {
    const user = this.users.filter(user => user.id === body.id)

    if (body.email !== undefined && body.email !== null) {
      user[0].email = body.email
    }
    if (body.name !== undefined && body.name !== null) {
      user[0].name = body.name
    }
    if (body.passwod_hash !== undefined && body.passwod_hash !== null) {
      user[0].password_hash = body.passwod_hash
    }

    const users = this.users.filter(user => user.id !== body.id)
    this.users.push(user[0])
    this.users = users
  }

  async delete (id: string): Promise<void> {
    const users = this.users.filter(user => user.id !== id)
    this.users = users
  }

  async userAredyExists (id: string): Promise<boolean> {
    const user = this.users.filter(user => user.id === id)
    // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
    return !!user[0]
  }
}

export default InMemoryUserRepository
