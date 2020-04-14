import 'jest'
import * as request from 'supertest'
import { Server } from '../server/server'
import { environment } from '../common/environment'
import { tokensRouter } from './tokens.router'
import { Token } from './tokens.model'

let address: string
let server: Server
beforeAll(() => {
  environment.db.url = process.env.DB_URL || 'mongodb://localhost/bandyer-test'
  environment.server.port = process.env.SERVER_PORT || 3001
  address = `http://localhost:${environment.server.port}`
  server = new Server()
  return server.bootstrap([tokensRouter])
    .then(() => Token.remove({}).exec())
    .catch(console.error)
})

test('get /tokens', () => {
  return request(address)
    .get('/tokens')
    .then(resp => {
      expect(resp.status).toBe(200)
      expect(resp.body).toBeInstanceOf(Array)
    }).catch(fail)
})

test('get /tokens/:id', () => {
  return request(address)
    .post('/tokens')
    .send({
      text: 'A simple Text 1'
    })
    .then(resp => request(address)
      .get(`/tokens/${resp.body._id}`)
      .send({
        tokenSelected: 10
      }))
    .then(resp => {
      expect(resp.status).toBe(200)
      expect(resp.body._id).toBeDefined()
      expect(resp.body.text).toBe('A simple Text 1')
    }).catch(fail)
})

test('get /tokens/invalidId - not fount', () => {
  return request(address)
    .get('/tokens/invalidId')
    .then(resp => {
      expect(resp.status).toBe(404)
    }).catch(fail)
})

test('post /tokens', () => {
  return request(address)
    .post('/tokens')
    .send({
      text: 'A simple Text 2',
      tokenSelected: 5
    })
    .then(resp => {
      expect(resp.status).toBe(200)
      expect(resp.body._id).toBeDefined()
      expect(resp.body.text).toBe('A simple Text 2')
      expect(resp.body.tokenSelected).toBe(5)
    }).catch(fail)
})

test('patch /tokens/:id', () => {
  return request(address)
    .post('/tokens')
    .send({
      text: 'A simple Text 5'
    })
    .then(resp => request(address)
      .patch(`/tokens/${resp.body._id}`)
      .send({
        tokenSelected: 10
      }))
    .then(resp => {
      expect(resp.status).toBe(200)
      expect(resp.body._id).toBeDefined()
      expect(resp.body.text).toBe('A simple Text 5')
      expect(resp.body.tokenSelected).toBe(10)
    }).catch(fail)
})

test('del /tokens/:id', () => {
  return request(address)
    .post('/tokens')
    .send({
      text: 'A simple Text 5'
    })
    .then(resp => request(address)
      .del(`/tokens/${resp.body._id}`)
    )
    .then(resp => {
      expect(resp.status).toBe(204)
    }).catch(fail)
})

test('del /tokens/invalidId - not fount', () => {
  return request(address)
    .del('/tokens/invalidId')
    .send({
      tokenSelected: 3
    })
    .then(resp => {
      expect(resp.status).toBe(404)
    }).catch(fail)
})

afterAll(() => {
  return server.shutdown()
})
