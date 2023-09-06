import { type IGetUserMetricsService } from '../../interfaces/IGetUserMetricsService'
import { GetUserMetricsFactory } from '../../use-cases/get-user-metrics/GetUserMetricsFactory'
import { type Request, type Response } from 'express'

class GetUsermetricsController {
  private readonly getuserMetricsService: IGetUserMetricsService
  constructor () {
    this.getuserMetricsService = GetUserMetricsFactory()
  }

  async handle (req: Request, res: Response): Promise<Response> {
    const { id } = req.params
    if (id === '' || id === undefined || id === null) {
      return res.status(400).send({ error: 'invalid credentials error.' })
    }
    try {
      const metrics = await this.getuserMetricsService.execute(id)
      return res.status(200).json(metrics)
    } catch (err) {
      if (err instanceof Error) {
        return res.status(400).send({ message: err.message })
      }

      return res.status(500).send({ message: 'internal server error' })
    }
  }
}

export default GetUsermetricsController
