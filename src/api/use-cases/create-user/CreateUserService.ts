import { InvalidCredentialsError } from '../../errors/InvalidCredentialsError'
import { UserAlreadyExistsError } from '../../errors/UserAlreadyExistserror'
import { type ICreateUserService } from '../../interfaces/ICreateUserService'
import { hash } from 'bcryptjs'
import { type IUserRepository } from '../../interfaces/IUserRepository'

class CreateUserService implements ICreateUserService {
  constructor (private readonly UserRepository: IUserRepository) {}

  async execute (user: { name: string, email: string, password: string }): Promise<void> {
    if (user.email === undefined) {
      throw new InvalidCredentialsError()
    }
    if (user.name === undefined) {
      throw new InvalidCredentialsError()
    }
    if (user.password === undefined) {
      throw new InvalidCredentialsError()
    }

    const userWithSameEmail = await this.UserRepository.getUserByEmail(user.email)
    if (userWithSameEmail !== undefined && userWithSameEmail !== null) {
      throw new UserAlreadyExistsError()
    }

    const hashedPassword = await hash(user.password, 6)
    const newUser = { name: user.name, email: user.email, password_hash: hashedPassword }
    await this.UserRepository.create(newUser)
  }
}

export default CreateUserService
