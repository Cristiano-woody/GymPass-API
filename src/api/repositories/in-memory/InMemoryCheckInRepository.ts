import dayjs from 'dayjs'
import CheckInEntity from '../../entities/CkeckinEntity'
import { type ICheckinRepository } from '../../interfaces/ICheckinRepository'

class InMemoryCheckInRepository implements ICheckinRepository {
  public checkIns: CheckInEntity[] = []

  async create (user: CheckInEntity): Promise<CheckInEntity> {
    const newCheckIn = new CheckInEntity(user)
    this.checkIns.push(newCheckIn)
    return newCheckIn
  }

  async fyndByUserInOnDate (data: { date: Date, userId: string }): Promise<CheckInEntity | undefined> {
    const startOfTheDay = dayjs(data.date).startOf('date')
    const endOfTheDay = dayjs(data.date).endOf('date')

    const checkInOnSameDate = this.checkIns.find((iten) => {
      const checkInDate = dayjs(iten.createdAt)
      const isOnSameDate = checkInDate.isAfter(startOfTheDay) && checkInDate.isBefore(endOfTheDay)

      return iten.user_id === data.userId && isOnSameDate
    })

    if (checkInOnSameDate === undefined) {
      return
    }

    return checkInOnSameDate
  }
}

export default InMemoryCheckInRepository
