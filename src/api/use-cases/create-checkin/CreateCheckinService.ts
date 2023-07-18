import { type ICheckinRepository } from '../../interfaces/ICheckinRepository'
import { type ICreateCheckInService } from '../../interfaces/ICreateCheckInService'
import { InvalidCredentialsError } from '../../errors/InvalidCredentialsError'
import { type IUserRepository } from '../../interfaces/IUserRepository'
import { ResourceNotFoundError } from '../../errors/ResourceNotFoundError'
import { TwoCheckInsAreNotAlowed } from '../../errors/TwoCheckInsAreNotAlowed'
import { type IGymRepository } from '../../interfaces/IGymRepository'
import { getDistanceBetweenCoordinates } from '../../helpers/getDistanceBetweenCoordinates'
import { MaxDistanceError } from '../../errors/MaxDistanceError'

class CreateCheckInService implements ICreateCheckInService {
  constructor (private readonly CheckInRepository: ICheckinRepository, private readonly UserRepository: IUserRepository, private readonly GymRepository: IGymRepository) {}

  async execute (data: { userId: string, gymId: string, userCoordinates: { latitude: number, longitude: number } }): Promise<void> {
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

    const gym = await this.GymRepository.getGym(data.gymId)

    if (gym === undefined) {
      throw new ResourceNotFoundError()
    }

    const distance = getDistanceBetweenCoordinates({ latitude: gym.latitude, longitude: gym.longitude }, { latitude: data.userCoordinates.latitude, longitude: data.userCoordinates.longitude })

    const maximumDistanceAllowedInKM = 0.1

    if (distance > maximumDistanceAllowedInKM) {
      throw new MaxDistanceError()
    }

    const checkInOnSameDay = await this.CheckInRepository.fyndByUserInOnDate({ userId: data.userId, date: new Date() })

    if (checkInOnSameDay !== undefined) {
      throw new TwoCheckInsAreNotAlowed()
    }

    await this.CheckInRepository.create({ gym_id: data.gymId, user_id: data.userId })
  }
}

export default CreateCheckInService
