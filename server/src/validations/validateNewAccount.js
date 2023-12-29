import ERRORS from '../../config/_errors.js'

export const validateNewAccount = payload => {
   const { fname, email, password } = payload
   const error = []

   // Check if any required field is missing
   if (!fname) error.push('first name is required')
   if (!email) error.push('email is required')
   if (!password) error.push('password is required')

   // Validate email format
   const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
   if (email && !emailRegex.test(email)) error.push('Invalid email')

   // Validate password format
   const passwordRegex =
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/
   if (password && !passwordRegex.test(password)) error.push('Invalid password')

   if (error.length) return { ...ERRORS.BAD_REQUEST, error }
   return null
}
