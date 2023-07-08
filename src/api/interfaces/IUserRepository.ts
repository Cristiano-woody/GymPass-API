import type UserEntity from '../entities/UserEntity'

export interface IUserRepository {
  create: (user: UserEntity) => Promise<void>
  getUserByEmail: (email: string) => Promise<UserEntity | null>
}
