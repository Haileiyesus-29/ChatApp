import bcrypt from 'bcryptjs'

import User from '../../models/user.model.js'
import ERRORS from '../../../config/_errors.js'

export const verifyUserAccount = async data => {
   const { email, password } = data
   if (!email || !password) return ERRORS.INVALID_CREDENTIAL

   const user = await User.findOne({ email: email.toLowerCase() })

   if (!user) return ERRORS.WRONG_EMAIL_OR_PASSWORD

   const passwordVerified = await bcrypt.compare(password, user.password)
   if (!passwordVerified) return ERRORS.WRONG_EMAIL_OR_PASSWORD

   user.password = undefined
   return { user }
}
