class ErrorHandler extends Error {
  constructor(message, statuscode) {
    super(message);
    this.statusCode = statuscode;
  }
}

export const errorMiddleware = (err, req, res, next) => {
  err.message = err.message || "Internal Server Error";

  err.statusCode = err.statusCode || 500;

  return res.status(err.statusCode).send({
    success: false,
    message: err.message,
  });
};

export default ErrorHandler;
