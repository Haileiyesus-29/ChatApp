const ERRORS = {
   // Authentication and Authorization errors
   INVALID_CREDENTIAL: {
      error: {
         code: 'INVALID_CREDENTIAL',
         message: 'Invalid credentials provided',
      },
      status: 400,
   },
   FORBIDDEN: {
      error: {
         code: 'FORBIDDEN',
         message: 'Access forbidden',
      },
      status: 403,
   },
   BAD_REQUEST: {
      error: {
         code: 'BAD_REQUEST',
         message: 'Bad request',
      },
      status: 400,
   },
   INVALID_TOKEN: {
      error: {
         code: 'INVALID_TOKEN',
         message: 'Invalid token provided',
      },
      status: 400,
   },
   UNAUTHORIZED: {
      error: {
         code: 'UNAUTHORIZED',
         message: 'Unauthorized access requested',
      },
      status: 401,
   },
   NOT_FOUND: {
      error: {
         code: 'NOT_FOUND',
         message: 'Requested resource does not exist',
      },
      status: 404,
   },
   SERVER_FAILED: {
      error: {
         code: 'SERVER_FAILED',
         message: 'Internal server failure',
      },
      status: 500,
   },
   WRONG_EMAIL_OR_PASSWORD: {
      error: {
         code: 'WRONG_EMAIL_OR_PASSWORD',
         message: 'Invalid email or password',
      },
      status: 400,
   },

   // Validation errors
   VALIDATION_ERROR: {
      error: {
         code: 'VALIDATION_ERROR',
         message: 'Validation failed',
      },
      status: 422,
   },

   // General database-related errors
   DB_CONNECTION_ERROR: {
      error: {
         code: 'DB_CONNECTION_ERROR',
         message: 'Error connecting to the database',
      },
      status: 500,
   },
   DB_QUERY_ERROR: {
      error: {
         code: 'DB_QUERY_ERROR',
         message: 'Error executing a database query',
      },
      status: 500,
   },
   DB_DUPLICATE_ENTRY: {
      error: {
         code: 'DB_DUPLICATE_ENTRY',
         message: 'Email address already in use',
      },
      status: 400,
   },

   // File upload errors
   FILE_UPLOAD_ERROR: {
      error: {
         code: 'FILE_UPLOAD_ERROR',
         message: 'Error uploading the file',
      },
      status: 500,
   },
}

export default ERRORS
