import app from './app'
import * as dotenv from 'dotenv'
import { prisma } from './db/prisma'

dotenv.config()

class Server {
  private readonly port: number
  constructor (port: number) {
    this.port = port
  }

  async start (): Promise<void> {
    await prisma.$connect()
    app.listen(this.port, () => {
      console.log(`\n👾✨aplicação iniciada na porta ${this.port}👾✨\n`)
    })
  }
}

if (process.env.PORT_SERVER !== undefined) {
  const server = new Server(parseInt(process.env.PORT_SERVER))
  void server.start()
}
