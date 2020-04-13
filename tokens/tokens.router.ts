import * as restify from 'restify'
import { Router } from '../common/router'
import { Token } from './tokens.model'

class TokensRouter extends Router {
  applyRoutes(application: restify.Server) {
    application.get('/tokens', (req, resp, next) => {
      Token.find().then(this.render(resp, next))
    })

    application.get('/tokens/:id', (req, resp, next) => {
      Token.findById(req.params.id).then(this.render(resp, next))
    })

    application.post('/tokens', (req, resp, next) => {
      let token = new Token(req.body)
      token.save().then(this.render(resp, next))
    })

    application.put('/tokens/:id', (req, resp, next) => {
      const options = { overwrite: true }
      Token.update({ _id: req.params.id }, req.body, options)
        .exec().then(result => {
          if (result.n) {
            return Token.findById(req.params.id)
          } else {
            resp.send(404)
          }
        }).then(this.render(resp, next))
    })

    application.patch('/tokens/:id', (req, resp, next) => {
      const options = { new: true }
      Token.findByIdAndUpdate(req.params.id, req.body, options)
        .then(this.render(resp, next))
    })

    application.del('/tokens/:id', (req, resp, next) => {
      Token.remove({ _id: req.params.id }).exec().then((cmdResult: any) => {
        if (cmdResult.result.n) {
          resp.send(204)
        } else {
          resp.send(404)
        }
        return next()
      })
    })
  }
}

export const tokensRouter = new TokensRouter()
