import mongoose from 'mongoose'

async function connectDB(cb) {
   try {
      await mongoose.connect(process.env.DB_URI)
      cb?.()
   } catch (error) {
      console.log(error)
   }
}

export default connectDB
