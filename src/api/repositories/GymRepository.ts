import { prisma } from '../../db/prisma'
import GymEntity from '../entities/GymEntity'
import { type IGymRepository } from '../interfaces/IGymRepository'
import { type Prisma } from '@prisma/client'

class GymRepository implements IGymRepository {
  async create (data: { title: string, latitude: Prisma.Decimal, longitude: Prisma.Decimal }): Promise<void> {
    const newGym = new GymEntity({ title: data.title, latitude: data.latitude, longitude: data.longitude })
    if (newGym.id !== undefined) {
      await prisma.gym.create({
        data: {
          id: newGym.id,
          title: newGym.title,
          latitude: newGym.latitude,
          longitude: newGym.longitude
        }
      })
    }
  }

  async getGym (id: string): Promise<GymEntity | undefined> {
    const gym = await prisma.gym.findUnique({
      where: {
        id
      }
    })
    if (gym !== null) {
      return gym
    }
  }
}

export default GymRepository
