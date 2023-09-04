import UserRepository from '../../repositories/UserRepository'
import CreateUserService from './CreateUserService'

export const createUserFactory = (): CreateUserService => {
  const userRepository = new UserRepository()
  const createUserService = new CreateUserService(userRepository)
  return createUserService
}
