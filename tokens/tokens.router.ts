import * as restify from 'restify'
import { Router } from '../common/router'
import { Token } from './tokens.model'

class TokensRouter extends Router {
  applyRoutes(application: restify.Server) {
    application.get('/tokens', (req, resp, next) => {
      Token.find().then(tokens => {
        resp.json(tokens)
        return next()
      })
    })

    application.get('/tokens/:id', (req, resp, next) => {
      Token.findById(req.params.id).then(token => {
        if (token) {
          resp.json(token)
          return next()
        }

        resp.send(404)
        return next()
      })
    })
  }
}

export const tokensRouter = new TokensRouter()
