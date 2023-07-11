import { type IUserRepository } from '../../interfaces/IUserRepository'
import { InvalidCredentialsError } from '../../errors/InvalidCredentialsError'
import { emailValidator } from '../../validators/emailValidator'
import { compare } from 'bcryptjs'
import type UserEntity from '../../entities/UserEntity'

class AutenticateService {
  constructor (private readonly UserRepository: IUserRepository) {}

  async execute (data: { email: string, password: string }): Promise<UserEntity> {
    if (data.email === undefined || data.email === '') {
      throw new InvalidCredentialsError()
    }
    if (data.password === undefined || data.password === '') {
      throw new InvalidCredentialsError()
    }

    const isValidEmail = emailValidator(data.email)
    if (!isValidEmail) {
      throw new InvalidCredentialsError()
    }

    const user = await this.UserRepository.getUserByEmail(data.email)

    if (user === null || user === undefined) {
      throw new InvalidCredentialsError()
    }

    const doesPasswordMatches = await compare(data.password, user.password_hash)
    if (!doesPasswordMatches) {
      throw new InvalidCredentialsError()
    }

    return user
  }
}

export default AutenticateService
