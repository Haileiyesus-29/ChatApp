import express from 'express'
const router = express.Router()

router.get('/', (req, res) => res.send('channel route'))

export default router
