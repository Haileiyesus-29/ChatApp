import mongoose from 'mongoose'

const userSchema = new mongoose.Schema(
   {
      name: {
         type: String,
         required: true,
      },
      username: {
         type: String,
         unique: true,
         sparse: true,
      },
      email: {
         type: String,
         required: true,
         unique: true,
      },
      password: {
         type: String,
         required: true,
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
userSchema.index(
   { username: 1 },
   { unique: true, partialFilterExpression: { username: { $type: 'string' } } }
)
userSchema.set('toJSON', {
   transform: function (doc, ret) {
      ret.id = ret._id
      delete ret._id
   },
})

const User = mongoose.model('User', userSchema)
export default User
