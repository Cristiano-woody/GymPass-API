import { type ICheckinRepository } from '../../interfaces/ICheckinRepository'
import { type IGetUserMetricsService } from '../../interfaces/IGetUserMetricsService'

class GetUserMetricsService implements IGetUserMetricsService {
  constructor (private readonly checkInRepository: ICheckinRepository) {}

  async execute (id: string): Promise<number> {
    const checkInsCount = await this.checkInRepository.countByUserId(id)
    return checkInsCount
  }
}

export default GetUserMetricsService
