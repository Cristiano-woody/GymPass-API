import UserRepository from '../../repositories/UserRepository'
import GetUserProfileService from './GetUserProfileService'

export const getUserprofileFactory = (): GetUserProfileService => {
  const userRepository = new UserRepository()
  const getUserProfileService = new GetUserProfileService(userRepository)
  return getUserProfileService
}
