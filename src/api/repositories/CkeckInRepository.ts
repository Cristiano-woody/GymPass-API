import { prisma } from '../../db/prisma'
import CheckInEntity from '../entities/CkeckinEntity'
import { type ICheckinRepository } from '../interfaces/ICheckinRepository'

class UserRepository implements ICheckinRepository {
  async create (data: CheckInEntity): Promise<CheckInEntity | undefined> {
    const newCheckIn = new CheckInEntity(data)
    if (newCheckIn.id !== undefined && newCheckIn.createdAt !== undefined) {
      await prisma.checkIn.create({
        data: {
          id: newCheckIn.id,
          gym_id: newCheckIn.gymId,
          user_id: newCheckIn.userId,
          created_at: newCheckIn.createdAt,
          validated_at: newCheckIn.validatedAt
        }
      })
      return newCheckIn
    }
  }
}

export default UserRepository
