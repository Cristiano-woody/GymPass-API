import { v4 as uuidv4 } from 'uuid'

class CheckInEntity {
  public id?: string
  public createdAt?: Date
  public validatedAt?: Date
  public user_id: string
  public gym_id: string

  constructor (data: CheckInEntity) {
    this.user_id = data.user_id
    this.gym_id = data.gym_id
    this.id = data.id
    this.validatedAt = data.validatedAt
    if (data.id === undefined || data.id === null) {
      this.id = uuidv4()
    }
    if (data.createdAt === undefined || data.createdAt === null) {
      this.createdAt = new Date()
    }
  }
}

export default CheckInEntity
