import type CheckInEntity from '../../entities/CkeckinEntity'
import { type ICheckinRepository } from '../../interfaces/ICheckinRepository'
import { type ICreateCheckInService } from '../../interfaces/ICreateCheckInService'
import { InvalidCredentialsError } from '../../errors/InvalidCredentialsError'
import { type IUserRepository } from '../../interfaces/IUserRepository'
import { ResourceNotFoundError } from '../../errors/ResourceNotFoundError'
import { TwoCheckInsAreNotAlowed } from '../../errors/TwoCheckInsAreNotAlowed'

class CreateCheckInService implements ICreateCheckInService {
  constructor (private readonly CheckInRepository: ICheckinRepository, private readonly UserRepository: IUserRepository) {}

  async execute (data: CheckInEntity): Promise<void> {
    if (data.gymId === undefined || data.gymId === '') {
      throw new InvalidCredentialsError()
    }
    if (data.userId === undefined || data.userId === '') {
      throw new InvalidCredentialsError()
    }

    const userAlreadyExists = await this.UserRepository.userAredyExists(data.userId)

    if (!userAlreadyExists) {
      throw new ResourceNotFoundError()
    }

    const checkInOnSameDay = await this.CheckInRepository.fyndByUserInOnDate({ userId: data.userId, date: new Date() })

    if (checkInOnSameDay !== undefined) {
      throw new TwoCheckInsAreNotAlowed()
    }

    await this.CheckInRepository.create({ gymId: data.gymId, userId: data.userId })
  }
}

export default CreateCheckInService
