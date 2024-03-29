const ErrorMessages = {
  // common errors
  UNAUTHORIZED_ACCESS: "Unauthorized Access: Access to this resource is restricted.",
  INTERNAL_SERVER_ERROR: "Internal server error",

  // field errors
  INVALID_EMAIL: "Invalid email address.",
  INVALID_PASSWORD:
    "Password must be at least 8 characters long and include at least one uppercase letter, one lowercase letter, one number, and one special character.",
  INVALID_MOBILE_NUMBER: "Invalid mobile number. Please enter a 10-digit number.",
  INVALID_USERNAME: "Name must be at least 3 characters long."
};

module.exports = { ErrorMessages };
