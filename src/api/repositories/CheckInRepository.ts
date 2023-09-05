import { prisma } from '../../db/prisma'
import CheckInEntity from '../entities/CkeckinEntity'
import { type ICheckinRepository } from '../interfaces/ICheckinRepository'

class CheckInRepository implements ICheckinRepository {
  async create (data: CheckInEntity): Promise<CheckInEntity | undefined> {
    const newCheckIn = new CheckInEntity(data)
    if (newCheckIn.id !== undefined && newCheckIn.createdAt !== undefined) {
      await prisma.checkIn.create({
        data: {
          id: newCheckIn.id,
          gym_id: newCheckIn.gym_id,
          user_id: newCheckIn.user_id,
          created_at: newCheckIn.createdAt,
          validated_at: newCheckIn.validatedAt
        }
      })
      return newCheckIn
    }
  }

  async fyndByUserInOnDate (data: { date: Date, userId: string }): Promise<CheckInEntity | undefined> {
    const checkIn = await prisma.checkIn.findFirst({
      where: {
        user_id: data.userId,
        created_at: new Date(data.date)
      }
    })
    if (checkIn !== null) {
      return checkIn
    }
  }

  async findManyCheckInsByUserId (id: string): Promise<CheckInEntity[]> {
    const checkins = await prisma.checkIn.findMany(
      {
        where: {
          user_id: id
        }
      }
    )
    return checkins
  }

  async countByUserId (id: string): Promise<number> {
    const checkins = await prisma.checkIn.findMany(
      {
        where: {
          user_id: id
        }
      }
    )
    return checkins.length
  }
}

export default CheckInRepository
