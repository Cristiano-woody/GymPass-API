import { app } from './app'
import * as dotenv from 'dotenv'

dotenv.config()

const portServer = process.env.PORT_SERVER

if (portServer !== undefined) {
  app.listen(portServer, () => {
    console.log(`\n👾✨aplicação iniciada na porta ${portServer}👾✨\n`)
  })
}
