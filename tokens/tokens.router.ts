import * as restify from 'restify'
import { Router } from '../common/router'
import { Token } from './tokens.model'

class TokensRouter extends Router {
  applyRoutes(application: restify.Server) {
    application.get('/tokens', (req, resp, next) => {
      Token.findAll().then(tokens => {
        resp.json(tokens)
        return next()
      })
    })
  }
}

export const tokensRouter = new TokensRouter()
