import mongoose from 'mongoose'

const channelSchema = new mongoose.Schema(
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
      image: {
         type: String,
      },
      info: {
         type: String,
      },
      owner: {
         type: mongoose.Schema.Types.ObjectId,
         ref: 'User', // Reference to the 'User' model
         required: true,
      },
      admins: [
         {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User', // Reference to the 'User' model
         },
      ],
      members: [
         {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User', // Reference to the 'User' model
         },
      ],
   },
   {
      versionKey: false,
      timestamps: true,
   }
)
channelSchema.index(
   { username: 1 },
   { unique: true, partialFilterExpression: { username: { $type: 'string' } } }
)

channelSchema.set('toJSON', {
   transform: function (doc, ret) {
      ret.id = ret._id
      delete ret._id
   },
})

const Channel = mongoose.model('Channel', channelSchema)

export default Channel
