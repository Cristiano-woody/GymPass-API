import { v4 as uuidv4 } from 'uuid'

class UserEntity {
  public readonly id?: string

  public name: string
  public email: string
  public password_hash: string

  constructor (data: UserEntity) {
    this.name = data.name
    this.email = data.email
    this.password_hash = data.password_hash
    this.id = data.id
    if (data.id === undefined || data.id === null) {
      this.id = uuidv4()
    }
  }
}

export default UserEntity
