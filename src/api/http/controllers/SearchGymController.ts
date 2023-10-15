import { type ISearchGymService } from '../../interfaces/ISearchGymService'
import { SearchGymServiceFactory } from '../../use-cases/search-gym.ts/SearchGymServiceFactory'
import { type Request, type Response } from 'express'

class SearchGymController {
  private readonly SearchGymServiceFactory: ISearchGymService
  constructor () {
    this.SearchGymServiceFactory = SearchGymServiceFactory()
  }

  async handle (req: Request, res: Response): Promise<Response> {
    const { query, page } = req.params
    if (query === '' || query === undefined || query === null) {
      return res.status(400).send({ error: 'invalid credentials error.' })
    }
    if (page === '' || page === undefined || page === null) {
      return res.status(400).send({ error: 'invalid credentials error.' })
    }
    try {
      const gyms = await this.SearchGymServiceFactory.execute(query, +page)
      return res.status(200).json(gyms)
    } catch (err) {
      if (err instanceof Error) {
        return res.status(400).send({ message: err.message })
      }

      return res.status(500).send({ message: 'internal server error' })
    }
  }
}

export default SearchGymController
