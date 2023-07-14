export class TwoCheckInsAreNotAlowed extends Error {
  constructor () {
    super('it is not allowed to make two checkins in a single day')
  }
}
