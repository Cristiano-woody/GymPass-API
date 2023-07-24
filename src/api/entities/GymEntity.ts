import { v4 as uuidv4 } from 'uuid'

class GymEntity {
  public id?: string
  public title: string
  public description?: string | null
  public phone?: string | null
  public latitude: number
  public longitude: number

  constructor (data: GymEntity) {
    this.title = data.title
    this.description = data.description
    this.latitude = data.latitude
    this.longitude = data.longitude
    this.id = data.id
    if (data.id === undefined || data.id === null) {
      this.id = uuidv4()
    }
  }
}

export default GymEntity
