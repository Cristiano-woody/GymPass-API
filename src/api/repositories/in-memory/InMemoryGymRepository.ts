import GymEntity from '../../entities/GymEntity'
import { type IGymRepository } from '../../interfaces/IGymRepository'

class InMemoryGymRepository implements IGymRepository {
  public gym: GymEntity[] = []

  async create (data: GymEntity): Promise<void> {
    const newCheckIn = new GymEntity(data)
    this.gym.push(newCheckIn)
  }

  async getGym (id: string): Promise<GymEntity | undefined> {
    const gym = this.gym.find(gym => gym.id === id)
    return gym
  }

  async searchMany (query: string, page: number): Promise<GymEntity[]> {
    return this.gym.filter(gym => gym.title.includes(query)).slice((page - 1) * 20, page * 20)
  }
}

export default InMemoryGymRepository
