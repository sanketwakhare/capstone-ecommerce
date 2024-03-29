const ErrorMessages = {
  // common errors
  UNAUTHORIZED_ACCESS: "Unauthorized Access: Access to this resource is restricted.",
  INTERNAL_SERVER_ERROR: "Internal server error",

  // field errors
  INVALID_EMAIL: "Invalid email address.",
  INVALID_PASSWORD:
    "Password must be at least 8 characters long and include at least one uppercase letter, one lowercase letter, one number, and one special character."
};

module.exports = { ErrorMessages };
