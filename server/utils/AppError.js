class AppError extends Error {
  constructor(message, statusCode) {
    super();
    this.message = message;
    this.statusCode = statusCode;
    //status as per the status code
    this.status = `${statusCode}`.startsWith('4') ? 'fail' : 'error';
    this.isOperational = true;

    //capture stack trace
    Error.captureStackTrace(this, this.constructor);
  }
}

module.exports = AppError;
