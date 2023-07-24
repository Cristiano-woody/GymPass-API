import { InvalidCredentialsError } from '../../errors/InvalidCredentialsError'
import { type ICreateGymService } from '../../interfaces/ICreateGymService'
import { type IGymRepository } from '../../interfaces/IGymRepository'

class CreateGymService implements ICreateGymService {
  constructor (private readonly GymRepository: IGymRepository) {}

  async execute (data: { title: string, latitude: number, longitude: number }): Promise<void> {
    if (data.title === undefined || data.title === '') {
      throw new InvalidCredentialsError()
    }
    if (data.latitude === undefined || data.latitude === 0) {
      throw new InvalidCredentialsError()
    }
    if (data.longitude === undefined || data.longitude === 0) {
      throw new InvalidCredentialsError()
    }

    await this.GymRepository.create({
      title: data.title,
      latitude: data.latitude,
      longitude: data.longitude
    })
  }
}

export default CreateGymService
