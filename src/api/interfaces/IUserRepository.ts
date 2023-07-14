import type UserEntity from '../entities/UserEntity'

export interface IUserRepository {
  create: (user: UserEntity) => Promise<void>
  getUser: (id: string) => Promise<UserEntity | null>
  getUserByEmail: (email: string) => Promise<UserEntity | null>
  getAllUsers: () => Promise<UserEntity[]>
  userAredyExists: (id: string) => Promise<boolean>
  update: (body: { id: string, name?: string, email?: string, password_hash?: string }) => Promise<void>
  delete: (id: string) => Promise<void>
}
