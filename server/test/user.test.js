import supertest from 'supertest'
import { expect } from 'chai'
import app from '../app.js'
import { generateTestUserData } from './testHelpers.js'

describe('USER actions /api/user', () => {
   const userData = generateTestUserData()
   let userToken = null
   let userId = null

   it('should create a new user and return the user object', async () => {
      const response = await supertest(app)
         .post('/api/user')
         .set('Accept', 'application/json')
         .send(userData)

      // Check the response status
      expect(response.status).to.equal(201)

      // Check the response body structure
      expect(response.body).to.have.property('success', true)
      expect(response.body).to.have.property('data').and.to.have.property('id')
      expect(response.body.data.name).to.equal(userData.name)
      expect(response.body.data.email).to.equal(userData.email)
      expect(response.body.error).to.equal(null)

      userId = response.body.data.id

      // Extract the JWT from the response cookie
      const cookie = response.headers['set-cookie']
      const jwtCookie = cookie.find(cookie => cookie.includes('HttpOnly'))
      expect(jwtCookie).to.exist
      userToken = jwtCookie.split(';')[0].split('=')[1]
   })

   it('should get the user data by id', async () => {
      const response = await supertest(app)
         .get(`/api/user/${userId}`)
         .set('Cookie', `jwt=${userToken}`)
         .set('Accept', 'application/json')

      expect(response.status).to.equal(200)
      expect(response.body).to.have.property('success', true)
      expect(response.body).to.have.property('data')
      expect(response.body.data).to.not.equal(null)
   })

   it('should update the user data', async () => {
      const response = await supertest(app)
         .put('/api/user')
         .send({ name: 'updated' })
         .set('Accept', 'application/json')
         .set('Cookie', `jwt=${userToken}`)

      expect(response.status).to.equal(200)
      expect(response.body).to.have.property('success', true)
      expect(response.body).to.have.property('data')
      expect(response.body.data.name).to.equal('updated')
   })
})
