import bcrypt from 'bcryptjs'
import { hashPassword } from '../../helpers/hashPassword.js'
import User from '../../models/user.model.js'

export const getUserAccount = async id => {
   const user = await User.findById(id).select(-password)
   return { account: user }
}

export const createUserAccount = async body => {
   const { email, password, fname, lname, username, bio, image } = body
   const hashedPassword = await hashPassword(password)

   const account = { email, password, fname, lname, bio, image }
   // if (lname) account.lname = lname
   // if (bio) account.bio = bio
   // if (image) account.image = image

   const user = new User(account)
   const newUser = await user.save()
   newUser.password = undefined
   return newUser
}

export const updateUserAccount = async (body, userId) => {
   const { fname, lname, username, bio, image } = body
   const updateList = {}
   if (fname) updateList.fname = fname
   if (lname) updateList.lname = lname
   if (bio) updateList.bio = bio
   if (image) updateList.image = image

   const user = await User.findByIdAndUpdate(userId, updateList, { new: true })
   return user
}

export const deleteUserAccount = async (body, userId) => {
   const user = await User.findById(userId)
   const passwordVerified = await bcrypt.compare(body.password, user.password)

   if (!passwordVerified) return null
   const deletedAcc = await User.findByIdAndDelete(userId)
   return deletedAcc
}
