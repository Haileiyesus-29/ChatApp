import mongoose from 'mongoose'

const uri = {
   test: process.env.DB_URI_TEST,
   dev: process.env.DB_URI_DEV,
   prod: process.env.DB_URI_PROD,
}

async function connectDB(cb) {
   try {
      await mongoose.connect(
         uri[process.env.NODE_ENV] || 'mongodb://127.0.0.1:27017/cha-app-test'
      )
      cb?.()
   } catch (error) {
      console.log(error)
   }
}

export default connectDB
