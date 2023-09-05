export interface IGetUserMetricsService {
  execute: (id: string) => Promise<number>
}
