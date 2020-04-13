import * as restify from 'restify'
import * as mongoose from 'mongoose'
import { NotFoundError } from 'restify-errors'

export abstract class Router {
  abstract applyRoutes(application: restify.Server)

  render(resp: restify.Response, next: restify.Next) {
    return document => {
      if (document) {
        resp.json(document)
      } else {
        throw new NotFoundError('Token not found.')
      }
      return next()
    }
  }

  validateId = (req, resp, next) => {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      next(new NotFoundError('Token not found'))
    } else {
      next()
    }
  }
}
