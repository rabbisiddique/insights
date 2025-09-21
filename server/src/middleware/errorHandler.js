const errorHandler = (err, req, res, next) => {
  console.error("Error", err.stack);
  return res.status(err.statusCode || 500).json({
    success: false,
    message: err.message || "Server Error",
  });
};

class AppError extends Error {
  constructor(message, statusCode = 500) {
    super(message);
    this.statusCode = statusCode;
    this.isOperational = true;
  }
}

module.exports = { errorHandler, AppError };
