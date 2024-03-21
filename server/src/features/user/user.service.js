import bcrypt from 'bcryptjs'
import { hashPassword } from '../../helpers/hashPassword.js'
import User from '../../models/user.model.js'
import ERRORS from '../../../config/_errors.js'
import { validateNewAccount } from '../../validations/validateNewAccount.js'

export const getUserAccount = async id => {
   if (!id) return ERRORS.INVALID_CREDENTIAL
   const user = await User.findById(id).select('-password -channels -groups')
   if (!user) return ERRORS.NOT_FOUND
   return { user }
}

export const findUserByUsername = async username => {
   if (!username) return ERRORS.INVALID_CREDENTIAL
   const user = await User.findOne({ username }).select('name image id')
   if (!user) return ERRORS.NOT_FOUND
   return { user }
}

export const createUserAccount = async data => {
   const error = validateNewAccount(data)
   if (error?.length) return Object.assign(ERRORS.VALIDATION_ERROR, error)

   const { email, password, name, username, bio, image } = data
   const hashedPassword = await hashPassword(password)

   const account = {
      email: email.toLowerCase(),
      password: hashedPassword,
      name,
      bio,
      image,
      username:
         username ||
         `user_${
            Math.floor(Math.random() * 1000) * Math.floor(Math.random() * 1000)
         }`,
   }

   const user = new User(account)
   const newUser = await user.save()

   if (!newUser) return ERRORS.SERVER_FAILED

   newUser.password = undefined
   return { user: newUser }
}

export const updateUserAccount = async (user, data, file) => {
   const { name, bio, username } = data

   Object.assign(user, {
      bio: bio || user.bio,
      name: name || user.name,
      username: username || user.username,
      image: file?.filename || user.image,
   })
   const updated = await user.save()

   if (!updated) return ERRORS.SERVER_FAILED

   return { updated }
}

export const deleteUserAccount = async (user, data) => {
   const { password } = data
   if (!password) return ERRORS.INVALID_CREDENTIAL
   const userWithPasswordData = await User.findById(user.id)
   const passwordVerified = await bcrypt.compare(
      password,
      userWithPasswordData.password
   )

   if (!passwordVerified) return ERRORS.FORBIDDEN
   const deletedAcc = await User.findByIdAndDelete(user.id)
   return { account: deletedAcc }
}
