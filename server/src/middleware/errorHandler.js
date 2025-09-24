const errorHandler = (err, req, res, next) => {
  console.error("Error", err.stack);
  return res.status(err.statusCode || 500).json({
    success: false,
    message: err.message || "Server Error",
  });
};

function AppError(res, message, statusCode = 500) {
  return res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  });
}

module.exports = { errorHandler, AppError };
