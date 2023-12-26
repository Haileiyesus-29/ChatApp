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

const Group = mongoose.model('Group', groupSchema)

export default Group
