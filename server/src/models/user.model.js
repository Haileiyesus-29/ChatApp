import mongoose from 'mongoose'

const userSchema = new mongoose.Schema(
   {
      fname: {
         type: String,
         required: true,
      },
      lname: {
         type: String,
      },
      username: {
         type: String,
         unique: true,
      },
      email: {
         type: String,
         required: true,
         unique: true,
      },
      bio: {
         type: String,
      },
      image: {
         type: String,
      },
      groups: [
         {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Group',
         },
      ],
      channels: [
         {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Channel',
         },
      ],
   },
   {
      versionKey: false,
   }
)

const User = mongoose.model('User', userSchema)
export default User
