const User = require("../../models/User.model");
const { verifyToken } = require("../services/jwt/JWTService");

// protect routes and add userId to request
const protectRoute = async (req, res, next) => {
  try {
    const { token } = req.cookies;
    const decodedTokenData = await verifyToken(token);
    const email = decodedTokenData.email;
    const user = await User.findOne({ email: email });
    req.userId = user.id;
    next();
  } catch (error) {
    next(error);
  }
};

module.exports = { protectRoute };