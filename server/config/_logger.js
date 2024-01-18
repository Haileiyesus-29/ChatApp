import winston from 'winston'

const logLevels = {
   error: 0,
   warn: 1,
   info: 2,
   debug: 3,
}

const logColors = {
   error: 'red',
   warn: 'yellow',
   info: 'green',
   debug: 'blue',
}

const logger = winston.createLogger({
   levels: logLevels,
   format: winston.format.combine(
      winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
      winston.format.simple()
   ),
   transports: [
      new winston.transports.Console({
         format: winston.format.combine(
            winston.format.colorize({ all: true }),
            winston.format.printf(({ level, message, timestamp }) => {
               return `[${timestamp}] ${level}: ${message}`
            })
         ),
      }),
      new winston.transports.File({ filename: 'app.log' }),
   ],
})

winston.addColors(logColors)

// Function to log custom errors
const logCustomError = error => {
   if (error instanceof Error) {
      logger.error(
         `Error: ${error.message} (Status: ${error.status || 'unknown'})`
      )
      // Optionally, log the stack trace
      logger.debug(`Stack Trace: ${error.stack || 'not available'}`)
   } else {
      logger.error('Invalid error object provided:', error)
   }
}

export { logger, logCustomError }
