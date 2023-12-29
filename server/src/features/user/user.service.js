import bcrypt from 'bcryptjs'
import { hashPassword } from '../../helpers/hashPassword.js'
import User from '../../models/user.model.js'

export const getUserAccount = async id => {
   const user = await User.findById(id).select('-password')
   return user
}

export const createUserAccount = async body => {
   const { email, password, fname, lname, username, bio, image } = body
   const hashedPassword = await hashPassword(password)

   const account = {
      email: email.toLowerCase(),
      password: hashedPassword,
      fname,
      lname,
      bio,
      image,
      username,
   }

   const user = new User(account)
   const newUser = await user.save()

   newUser.password = undefined
   return newUser
}

export const updateUserAccount = async (body, userId) => {
   const { fname, lname, bio, image, username } = body
   const updateList = { fname, lname, bio, image, username }

   const user = await User.findByIdAndUpdate(userId, updateList, {
      new: true,
   }).select('-password')

   return user
}

export const deleteUserAccount = async (userId, password) => {
   const user = await User.findById(userId)

   const passwordVerified = await bcrypt.compare(password, user.password)

   if (!passwordVerified) return null
   const deletedAcc = await User.findByIdAndDelete(userId)
   return deletedAcc
}
