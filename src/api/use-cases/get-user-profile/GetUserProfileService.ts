import type UserEntity from '../../entities/UserEntity'
import { type IGetUserProfileService } from '../../interfaces/IGetUserProfileService'
import { InvalidCredentialsError } from '../../errors/InvalidCredentialsError'
import { ResourceNotFoundError } from '../../errors/ResourceNotFoundError'
import { type IUserRepository } from '../../interfaces/IUserRepository'

class GetUserProfileService implements IGetUserProfileService {
  constructor (private readonly userRepository: IUserRepository) {}
  //
  async execute (id: string): Promise<UserEntity> {
    if (id === undefined || id === '') {
      throw new InvalidCredentialsError()
    }

    const user = await this.userRepository.getUser(id)
    if (user === null || user === undefined) {
      throw new ResourceNotFoundError()
    }
    return user
  }
}

export default GetUserProfileService
