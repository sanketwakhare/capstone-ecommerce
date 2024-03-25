const User = require("../../models/User.model");
const AppError = require("../errors/AppError");
const { verifyToken } = require("../services/jwt/JWTService");

// protect routes and add userId to request
const protectRoute = async (req, res, next) => {
  try {
    const bearerToken = req.headers.authorization;
    const splits = bearerToken?.split(" ");
    if (!bearerToken || splits?.length < 2) {
      throw new AppError(400, "Invalid bearer token");
    }
    const token = splits[1];
    const decodedTokenData = await verifyToken(token);
    const email = decodedTokenData?.email;
    const user = await User.findOne({ email: email });
    req.userId = user?.id;
    next();
  } catch (error) {
    next(error);
  }
};

module.exports = { protectRoute };
