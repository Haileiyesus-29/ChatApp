describe('Auth actions /api/auth', () => {
   let userToken = null
   it('should login the user and return new token', async () => {
      const response = await supertest(app)
         .post('/api/auth/login')
         .set('Accept', 'application-json')
         .send(userData)

      expect(response.status).to.equal(200)
      expect(response.body).to.have.property('success', true)
      expect(response.body).to.have.property('data')
      expect(response.body.data).to.not.equal(null)
      expect(response.body.error).to.equal(null)

      const cookie = response.headers['set-cookie']
      const jwtCookie = cookie.find(cookie => cookie.includes('HttpOnly'))
      expect(jwtCookie).to.exist
      userToken = jwtCookie.split(';')[0].split('=')[1]
   })

   it('should verify the user login status as logged in', async () => {
      const response = await supertest(app)
         .post('/api/auth/verify')
         .set('Accept', 'application-json')
         .set('Cookie', `jwt=${userToken}`)

      expect(response.status).to.equal(200)
      expect(response.body).to.have.property('success', true)
      expect(response.body).to.have.property('data')
      expect(response.body.error).to.equal(null)
   })

   it('should logout the user and accept an expire token', async () => {
      const response = await supertest(app)
         .post('/api/auth/logout')
         .set('Accept', 'application-json')

      expect(response.status).to.equal(204)

      const cookie = response.headers['set-cookie']
      const jwtCookie = cookie.find(cookie => cookie.includes('HttpOnly'))
      expect(jwtCookie).to.exist
      userToken = jwtCookie.split(';')[0].split('=')[1]
   })
   it('should verify the user login status as logged out', async () => {
      const response = await supertest(app)
         .post('/api/auth/verify')
         .set('Accept', 'application-json')
         .set('Cookie', `jwt=${userToken}`)

      expect(response.status).to.equal(400)
      expect(response.body).to.have.property('success', false)
      expect(response.body.data).to.equal(null)
   })
})
