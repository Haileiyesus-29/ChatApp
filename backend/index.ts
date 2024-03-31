import app from './src/app'
const dotenv = require('dotenv')
const PORT = process.env.PORT || 5000

app.listen(PORT, () =>
   console.log(`Server running on http://127.0.0.1:${PORT}`)
)
