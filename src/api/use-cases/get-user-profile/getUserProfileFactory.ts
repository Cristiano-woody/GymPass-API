import UserRepository from '../../repositories/UserRepository'
import GetUserProfileService from './GetUserProfileService'
import GetUserProfileController from './GetUserProfileController'

export const getUserprofileFactory = (): GetUserProfileController => {
  const userRepository = new UserRepository()
  const getUserProfileService = new GetUserProfileService(userRepository)
  const getUserProfileController = new GetUserProfileController(getUserProfileService)
  return getUserProfileController
}
