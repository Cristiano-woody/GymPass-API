export interface ICreateUserService {
  execute: (user: { name: string, email: string, password: string }) => Promise<void>
}
