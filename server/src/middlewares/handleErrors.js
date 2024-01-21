import { logger } from '../../config/_logger.js'

export async function handleErrors(err, req, res, next) {
   process.env.NODE_ENV === 'dev' && logger.error(err)
   // logger.error(err)
   // console.trace(err)
   res.status(err.status || 500).json(err)
}
