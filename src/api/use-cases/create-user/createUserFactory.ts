import UserRepository from '../../repositories/UserRepository'
import CreateUserService from './CreateUserService'
import CreateUserController from './CreateUserController'

export const createUserFactory = (): CreateUserController => {
  const userRepository = new UserRepository()
  const createUserService = new CreateUserService(userRepository)
  const createUserController = new CreateUserController(createUserService)
  return createUserController
}
