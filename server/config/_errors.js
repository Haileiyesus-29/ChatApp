const ERRORS = {
   // Authentication and Authorization errors
   INVALID_CREDENTIAL: {
      message: 'Invalid crediantials provided',
      status: 400,
   },
   FORBIDDEN: { message: 'Access forbidden', status: 403 },
   BAD_REQUEST: { message: 'Bad request', status: 400 },
   INVALID_TOKEN: { message: 'Invalid token provided', status: 400 },
   UNAUTHORIZED: { message: 'Unauthorized access requested', status: 401 },
   NOT_FOUND: { message: 'Requested resource does not exist', status: 404 },
   SERVER_FAILED: { message: 'Internal server failure', status: 500 },
   WRONG_EMAIL_OR_PASSWORD: {
      message: 'Invalid email or password',
      status: 400,
   },

   // Validation errors
   VALIDATION_ERROR: { message: 'Validation failed', status: 422 },

   // General database-related errors
   DB_CONNECTION_ERROR: {
      message: 'Error connecting to the database',
      status: 500,
   },
   DB_QUERY_ERROR: { message: 'Error executing a database query', status: 500 },
   DB_DUPLICATE_ENTRY: {
      message: 'Email address already in use',
      status: 400,
   },

   // File upload errors
   FILE_UPLOAD_ERROR: { message: 'Error uploading the file', status: 500 },
}

export default ERRORS
