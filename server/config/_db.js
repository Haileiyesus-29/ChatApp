import mongoose from 'mongoose'

async function connectDB(cb) {
   try {
      await mongoose.connect(process.env.DB_URI_DEV)
      cb?.()
   } catch (error) {
      console.log(error)
   }
}

export default connectDB
