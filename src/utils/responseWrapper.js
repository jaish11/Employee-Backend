exports.success = (statusCode, result) => {
  return {
    status: "ok",
    statusCode,
    result,
  };
};

exports.error = (statusCode, message) => {
  return {
    status: "error",
    statusCode,
    message,
  };
};
