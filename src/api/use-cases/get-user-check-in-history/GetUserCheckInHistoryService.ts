import type CheckInEntity from '../../entities/CkeckinEntity'
import { type ICheckinRepository } from '../../interfaces/ICheckinRepository'
import { type IGetUserCheckInHistoryService } from '../../interfaces/IGetUserCheckInHistoryService'

class GetCheckInHistoryService implements IGetUserCheckInHistoryService {
  constructor (private readonly checkinRepository: ICheckinRepository) {}

  async execute (id: string, page: number): Promise<CheckInEntity[]> {
    return await this.checkinRepository.findManyCheckInsByUserId(id, page)
  }
}

export default GetCheckInHistoryService
