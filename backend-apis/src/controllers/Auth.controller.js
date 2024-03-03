const User = require("../models/User.model");
const {
  createToken,
  verifyToken,
} = require("../common/services/jwt/JWTService");
const {
  sendOtpViaEmail,
} = require("../common/services/email/BrevoEmailSenderService");
const { generateOTP } = require("../common/services/opt/OtpGeneratorService");
const UserOtpMapping = require("../models/UserOtpMapping.model");
const AppError = require("../common/errors/AppError");
const { RoleType } = require("../common/constants/RoleType");
const UserRoleMapping = require("../models/UserRoleMapping.model");

// signup
const signup = async (req, res, next) => {
  try {
    // if user exist in data base, then only issue a token
    const { email, password } = req.body;
    const user = await User.findOne({ email: email });
    if (user) {
      // user already exists
      throw new AppError(400, `User ${email} already exists`);
    }

    const newUser = await User.create({ email: email, password: password });
    if (newUser) {
      res.status(200).send({
        message: "User created successfully",
      });
    }

    // assign 'user' role to newly created user by default
    const roles = [RoleType.USER];
    const userRoleMappingObj = new UserRoleMapping({
      roles: roles,
      userId: newUser.id,
    });
    await userRoleMappingObj.save();
  } catch (error) {
    next(error);
  }
};

// login
const login = async (req, res, next) => {
  try {
    // if user exist in data base, then only issue a token
    const { email, password } = req.body;
    const user = await User.findOne({ email: email });
    if (!user) {
      // user not found
      throw new AppError(404, `User ${email} not found`);
    }

    // check if password is correct
    if (password !== user.password) {
      // invalid credentials
      throw new AppError(400, "Invalid credentials");
    }

    const payload = {
      email: email,
    };
    const token = createToken(payload);
    res.cookie("token", token, {
      httpOnly: true,
      maxAge: 1000 * 60 * 30, // 30 mins
    });
    res.status(200).send({
      message: "User logged in successfully",
    });
  } catch (error) {
    next(error);
  }
};

// verify jwt token
const verify = (req, res, next) => {
  try {
    const { token } = req.cookies;
    const decodedTokenData = verifyToken(token);
    res.status(200).send({
      message: "valid token",
      data: decodedTokenData,
    });
  } catch (error) {
    next(error);
  }
};

// logout
const logout = (req, res, next) => {
  try {
    res.clearCookie("token");
    res.status(200).send({ message: "User logged out successfully" });
  } catch (error) {
    next(error);
  }
};

// forgot password
const forgotPassword = async (req, res, next) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email: email });
    if (!user) {
      // user not found
      throw new AppError(404, `User ${email} not found`);
    }
    // generate random otp
    const otp = generateOTP();

    // store OTP and expiry in database against userId
    const otpExistsForUser = await UserOtpMapping.findOne({ userId: user.id });
    if (otpExistsForUser) {
      await otpExistsForUser.deleteOne({ userId: user.id });
    }

    const UserOtpMappingObject = new UserOtpMapping({
      otp: otp,
      userId: user.id,
    });
    await UserOtpMappingObject.save({ userId: user.id, otp: otp });

    // send opt via email template
    const emailData = {
      otp: otp,
      to: email,
    };
    await sendOtpViaEmail(emailData);
    res.status(200).send({ message: "Verification Email sent successfully" });
  } catch (error) {
    next(error);
  }
};

// reset password
const resetPassword = async (req, res, next) => {
  try {
    const { userId } = req.params;
    const { password, otp } = req.body;
    const user = await User.findById(userId);
    if (!user) {
      // user not found
      throw new AppError(404, `User ${email} not found`);
    }

    // fetch otp from database
    const dbUserOtpObj = await UserOtpMapping.findOne({ userId: userId });

    if (!dbUserOtpObj) {
      throw new AppError(400, "OTP is not generated");
    }

    // verify the otp
    const dbOtp = dbUserOtpObj.otp;

    if (dbUserOtpObj?.expiresAt < Date.now()) {
      throw new AppError(400, "OTP is expired");
    }

    if (dbOtp === otp) {
      // save user password
      const user = await User.findById(userId);
      user.password = password;
      await user.save();

      // delete users otp entry from db
      await UserOtpMapping.findOneAndDelete({ userId: userId });

      return res.status(200).send({ message: "Password reset successfully" });
    } else {
      throw new AppError(400, "Invalid OTP");
    }
    // save user with updated password if otp is matched
  } catch (error) {
    next(error);
  }
};

module.exports = {
  signup,
  login,
  verify,
  logout,
  forgotPassword,
  resetPassword,
};

// const sendEmailApi = async (req, res, next) => {
//   try {
//     const emailData = req.body;
//     await sendEmail(emailData);
//     res.status(200).send({ message: "Email sent successfully" });
//   } catch (error) {
//     next(error);
//   }
// };

// const sendOtpViaEmailApi = async (req, res, next) => {
//   try {
//     const emailData = req.body;
//     await sendOtpViaEmail(emailData);
//     res.status(200).send({ message: "Email sent successfully" });
//   } catch (error) {
//     next(error);
//   }
// };
