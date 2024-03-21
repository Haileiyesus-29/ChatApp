import multer from 'multer'

const storage = multer.diskStorage({
   destination: function (req, file, cb) {
      cb(null, 'uploads/')
   },
   filename: function (req, file, cb) {
      const originalExtension = file.originalname.split('.').pop()
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9)
      // const filename = `${file.fieldname}-${uniqueSuffix}.${originalExtension}`
      const filename = `${req.user.id}-${uniqueSuffix}.${originalExtension}`
      cb(null, filename)
   },
})

const fileFilter = (req, file, cb) => {
   const allowedFileTypes = ['image/jpeg', 'image/jpg', 'image/png']
   if (allowedFileTypes.includes(file.mimetype)) {
      cb(null, true)
   } else {
      cb(
         new Error(
            'Invalid file type. Only JPEG, JPG, and PNG files are allowed.'
         )
      )
   }
}

const upload = multer({
   storage,
   fileFilter: fileFilter,
   limits: {
      fileSize: 3 * 1024 * 1024,
   },
})

const uploader = fieldName => {
   return async (req, res, next) => {
      upload.single(fieldName)(req, res, function (err) {
         if (err instanceof multer.MulterError) {
            return next(err)
         } else if (err) {
            return next(err)
         }
         next()
      })
   }
}

export default uploader
