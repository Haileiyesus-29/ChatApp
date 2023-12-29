import mongoose from 'mongoose'

const groupSchema = new mongoose.Schema(
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
            ref: 'User',
         },
      ],
   },
   {
      versionKey: false,
      timestamps: true,
   }
)
groupSchema.index(
   { username: 1 },
   { unique: true, partialFilterExpression: { username: { $type: 'string' } } }
)

groupSchema.set('toJSON', {
   transform: function (doc, ret) {
      ret.id = ret._id
      delete ret._id
   },
})

const Group = mongoose.model('Group', groupSchema)

export default Group
