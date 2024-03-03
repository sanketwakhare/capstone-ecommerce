const jwt = require("jsonwebtoken");

const createToken = (payload) => {
  const { JWT_SECRET_KEY } = process.env;
  const token = jwt.sign(payload, JWT_SECRET_KEY, {
    algorithm: "HS256",
    expiresIn: "30m",
    allowInsecureKeySizes: false
  });
  return token;
};

const verifyToken = (token) => {
  const { JWT_SECRET_KEY } = process.env;
  const decodedTokenData = jwt.verify(token, JWT_SECRET_KEY);
  return decodedTokenData;
};

module.exports = {
  createToken,
  verifyToken
};
