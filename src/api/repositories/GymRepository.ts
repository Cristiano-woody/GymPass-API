import { Decimal } from '@prisma/client/runtime/library'
import { prisma } from '../../db/prisma'
import GymEntity from '../entities/GymEntity'
import { type IGymRepository } from '../interfaces/IGymRepository'

class GymRepository implements IGymRepository {
  async create (data: { title: string, latitude: number, longitude: number }): Promise<void> {
    const newGym = new GymEntity({ title: data.title, latitude: data.latitude, longitude: data.longitude })
    if (newGym.id !== undefined) {
      await prisma.gym.create({
        data: {
          id: newGym.id,
          title: newGym.title,
          latitude: new Decimal(newGym.latitude),
          longitude: new Decimal(newGym.longitude)
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
      return new GymEntity({
        id: gym.id,
        title: gym.title,
        latitude: gym.latitude.toNumber(),
        longitude: gym.longitude.toNumber()
      })
    }
  }

  async searchMany (query: string, page: number): Promise<GymEntity[]> {
    const gyms = await prisma.gym.findMany({
      where: {
        title: {
          contains: `${query}`
        }
      }
    })
    const gymsFormated = gyms.map((gym) => {
      return new GymEntity({
        id: gym.id,
        title: gym.title,
        latitude: gym.latitude.toNumber(),
        longitude: gym.longitude.toNumber()
      })
    })
    return gymsFormated
  }
}

export default GymRepository
