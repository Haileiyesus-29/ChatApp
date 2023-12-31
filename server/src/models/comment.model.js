import mongoose from 'mongoose'

const commentSchema = new mongoose.Schema(
   {
      post: {
         type: mongoose.Schema.Types.ObjectId,
         required: true,
         ref: 'Post', // Reference to the 'Post' model
      },
      author: {
         type: mongoose.Schema.Types.ObjectId,
         required: true,
         ref: 'User', // Reference to the 'User' model
      },
      text: {
         type: String,
         required: true,
      },
      createdAt: {
         type: Date,
         default: Date.now,
         index: true,
      },
   },
   {
      versionKey: false,
   }
)
commentSchema.set('toJSON', {
   transform: function (doc, ret) {
      ret.id = ret._id
      delete ret._id
   },
})

const Comment = mongoose.model('Comment', commentSchema)
export default Comment
