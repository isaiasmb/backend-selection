import * as restify from 'restify'
import { Router } from '../common/router'
import { Token } from './tokens.model'
import { NotFoundError } from 'restify-errors'

class TokensRouter extends Router {
  applyRoutes(application: restify.Server) {
    application.get('/tokens', (req, resp, next) => {
      Token.find()
        .then(this.render(resp, next))
        .catch(next)
    })

    application.get('/tokens/:id', [this.validateId, (req, resp, next) => {
      Token.findById(req.params.id)
        .then(this.render(resp, next))
        .catch(next)
    }])

    application.post('/tokens', (req, resp, next) => {
      let token = new Token(req.body)
      token.save()
        .then(this.render(resp, next))
        .catch(next)
    })

    application.put('/tokens/:id', [this.validateId, (req, resp, next) => {
      const options = { runValidator: true, overwrite: true }
      Token.update({ _id: req.params.id }, req.body, options)
        .exec().then(result => {
          if (result.n) {
            return Token.findById(req.params.id)
          } else {
            throw new NotFoundError('Token not found.')
          }
        })
        .then(this.render(resp, next))
        .catch(next)
    }])

    application.patch('/tokens/:id', [this.validateId, (req, resp, next) => {
      const options = { runValidator: true, new: true }
      Token.findByIdAndUpdate(req.params.id, req.body, options)
        .then(this.render(resp, next))
        .catch(next)
    }])

    application.del('/tokens/:id', [this.validateId, (req, resp, next) => {
      Token.remove({ _id: req.params.id }).exec().then((cmdResult: any) => {
        if (cmdResult.result.n) {
          resp.send(204)
        } else {
          throw new NotFoundError('Token not found.')
        }
        return next()
      }).catch(next)
    }])
  }
}

export const tokensRouter = new TokensRouter()
