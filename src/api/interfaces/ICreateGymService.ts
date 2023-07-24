export interface ICreateGymService {
  execute: (data: { title: string, latitude: number, longitude: number }) => Promise<void>
}
