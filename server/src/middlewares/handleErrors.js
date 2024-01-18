import { logger } from '../../config/_logger.js'

export async function handleErrors(err, req, res, next) {
   logger.error(err)
   res.status(err.status || 500).json(err)
}
