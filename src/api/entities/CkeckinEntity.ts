import { v4 as uuidv4 } from 'uuid'

class CheckInEntity {
  public id?: string
  public createdAt?: Date
  public validatedAt?: Date
  public userId: string
  public gymId: string

  constructor (data: CheckInEntity) {
    this.userId = data.userId
    this.gymId = data.gymId
    this.id = data.id
    if (data.id === undefined || data.id === null) {
      this.id = uuidv4()
    }
    if (data.createdAt === undefined || data.createdAt === null) {
      this.createdAt = new Date()
    }
  }
}

export default CheckInEntity
