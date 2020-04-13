import { Server } from './server/server'
import { tokensRouter } from './tokens/tokens.router'

const server = new Server()
server.bootstrap([tokensRouter]).then(server => {
  console.log('Server is listening on:', server.application.address())
}).catch(error => {
  console.log('Serverfailed to start')
  console.error(error)
  process.exit(1)
})
