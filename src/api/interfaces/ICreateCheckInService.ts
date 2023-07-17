export interface ICreateCheckInService {
  execute: (data: { userId: string, gymId: string, userCoordinates: { latitude: number, longitude: number } }) => Promise<void>
}
