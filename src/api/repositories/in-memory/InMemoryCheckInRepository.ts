import CheckInEntity from '../../entities/CkeckinEntity'
import { type ICheckinRepository } from '../../interfaces/ICheckinRepository'

class InMemoryCheckInRepository implements ICheckinRepository {
  public checkIns: CheckInEntity[] = []

  async create (user: CheckInEntity): Promise<CheckInEntity> {
    const newUser = new CheckInEntity(user)
    this.checkIns.push(newUser)
    return newUser
  }
}

export default InMemoryCheckInRepository
