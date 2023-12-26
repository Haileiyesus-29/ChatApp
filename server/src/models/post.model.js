import mongoose from 'mongoose'

const postSchema = new mongoose.Schema(
   {
      channel: {
         type: mongoose.Schema.Types.ObjectId,
         required: true,
         ref: 'Channel',
      },
      likes: [
         {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
         },
      ],
      unlikes: [
         {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
         },
      ],
      text: {
         type: String,
      },
      image: {
         type: String,
      },
      createdAt: {
         type: Date,
         default: Date.now,
         index: -1,
         get: createdAt => createdAt.toISOString(),
      },
   },
   {
      versionKey: false,
   }
)

const Post = mongoose.model('Post', postSchema)
export default Post
