export class UserDoesNotExistError extends Error {
  constructor () {
    super('user does not exist')
  }
}
