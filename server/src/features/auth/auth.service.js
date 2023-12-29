import bcrypt from 'bcryptjs'

import User from '../../models/user.model.js'

export const verifyUserAccount = async (email, password) => {
   const user = await User.findOne({ email: email.toLowerCase() })
   if (!user) return null
   const passwordVerified = await bcrypt.compare(password, user.password)
   if (!passwordVerified) return null
   user.password = undefined
   return user
}
