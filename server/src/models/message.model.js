import mongoose from 'mongoose'

const messageSchema = new mongoose.Schema(
   {
      sender: {
         type: mongoose.Schema.Types.ObjectId,
         required: true,
         ref: 'User',
      },
      receiver: {
         type: mongoose.Schema.Types.ObjectId,
         required: true,
         refPath: 'chatType',
      },
      chatType: {
         type: String,
         required: true,
         enum: ['message', 'group', 'channel'],
      },
      content: {
         type: String,
         required: true,
         enum: ['text', 'image'],
      },
      text: { type: String },
      images: [{ type: String }],
      createdAt: {
         type: Date,
         default: Date.now,
         get: createdAt => createdAt.toISOString(),
      },
   },
   {
      versionKey: false,
   }
)

messageSchema.index({ sender: 1, createdAt: -1 })

messageSchema.set('toJSON', {
   transform: function (doc, ret) {
      ret.id = ret._id
      delete ret._id
   },
})

const Message = mongoose.model('Message', messageSchema)
export default Message
