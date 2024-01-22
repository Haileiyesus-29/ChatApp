function generateTestUserData() {
   return {
      name: 'John Doe',
      bio: 'someting right here',
      username: `usr-${Math.random().toString().slice(-5)}`,
      email: `john.${Math.random().toString().slice(-5)}@example.com`,
      password: 'Pa$$w0rd',
   }
}

function getJwtTokenFromCookie(cookie) {
   const jwtCookie = cookie.find(cookie => cookie.includes('HttpOnly'))
   return jwtCookie ? jwtCookie.split(';')[0].split('=')[1] : null
}

export { generateTestUserData, getJwtTokenFromCookie }
