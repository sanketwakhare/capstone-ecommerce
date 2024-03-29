const { RoleType } = require("../common/constants/RoleType");
const AppError = require("../common/errors/AppError");
const { hashPassword, comparePasswords } = require("../common/services/bcrypt/BcryptService");
const { sendOtpViaEmail } = require("../common/services/email/BrevoEmailSenderService");
const { createToken, verifyToken } = require("../common/services/jwt/JWTService");
const { generateOTP } = require("../common/services/opt/OtpGeneratorService");
const User = require("../models/User.model");
const UserOtpMapping = require("../models/UserOtpMapping.model");
const UserRoleMapping = require("../models/UserRoleMapping.model");

// signup
const signup = async (req, res, next) => {
  try {
    // if user exist in data base, then only issue a token
    const { name, email, password, mobile } = req.body;
    const user = await User.findOne({ email: email });
    if (user) {
      // user already exists
      throw new AppError(400, `User ${email} already exists`);
    }

    const userWithSameMobile = await User.findOne({ mobile: mobile });
    if (userWithSameMobile) {
      // mobile number already exists
      throw new AppError(400, `Mobile number ${mobile} already in use`);
    }

    // hash password
    const hashedPassword = await hashPassword(password);

    const newUser = await User.create({
      name,
      email: email,
      password: hashedPassword,
      mobile
    });
    if (newUser) {
      res.status(200).send({
        message: "User created successfully"
      });
    }

    // assign 'user' role to newly created user by default
    const roles = [RoleType.USER];
    const userRoleMappingObj = new UserRoleMapping({
      roles: roles,
      userId: newUser.id
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

    // compare password with hashed password
    const isPasswordMatch = await comparePasswords(password, user.password);

    // check if password is correct
    if (!isPasswordMatch) {
      // invalid credentials
      throw new AppError(400, "Invalid credentials");
    }

    const payload = {
      email: email
    };
    const auth = await createToken(payload);
    // res.cookie("token", token, {
    //   httpOnly: true,
    //   maxAge: 1000 * 60 * 30 // 30 mins
    // });
    // res.setHeader("x-access-token", token);
    res.status(200).send({
      message: "User logged in successfully",
      auth
    });
  } catch (error) {
    next(error);
  }
};

// verify jwt token
const verify = async (req, res, next) => {
  try {
    let { token } = req.cookies;
    // if (!token) {
    //   token = req.headers["x-access-token"];
    // }
    const decodedTokenData = await verifyToken(token);
    res.status(200).send({
      message: "valid token",
      data: decodedTokenData
    });
  } catch (error) {
    next(error);
  }
};

// logout
const logout = async (req, res, next) => {
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
    const otpExistsForUser = await UserOtpMapping.find({ userId: user.id });
    if (otpExistsForUser?.length > 0) {
      // delete all existing otp for a current user form db
      await UserOtpMapping.deleteOne({ userId: otpExistsForUser[0].userId });
    }

    const UserOtpMappingObject = new UserOtpMapping({
      otp: otp,
      userId: user.id
    });
    const createdOtpMapping = await UserOtpMappingObject.save({ userId: user.id, otp: otp });

    // send opt via email template
    const emailData = {
      otp: createdOtpMapping.otp,
      to: email
    };
    await sendOtpViaEmail(emailData);
    res.status(200).send({ message: "Verification Email sent successfully", userId: user.id });
  } catch (error) {
    next(error);
  }
};

// validate OTP
const validateOtp = async (req, res, next) => {
  try {
    const { userId } = req.params;
    let { otp } = req.body;
    otp = Number(otp);
    const user = await User.findById(userId);
    if (!user) {
      // user not found
      throw new AppError(404, `User ${user?.email} not found`);
    }

    // fetch otp from database
    const dbUserOtpObj = await UserOtpMapping.findOne({
      userId: userId
    }).sort({ createdAt: -1 });

    if (!dbUserOtpObj) {
      throw new AppError(400, "OTP is either expired or not generated. Please re-generate new OTP");
    }

    // verify the otp
    const dbOtp = dbUserOtpObj.otp;

    if (dbUserOtpObj?.expiresAt < new Date()) {
      // delete otp entry from db
      await UserOtpMapping.findOneAndDelete({ userId: userId });
      throw new AppError(400, "OTP is expired. Please re-generate new OTP");
    }

    if (dbOtp === otp) {
      // delete users otp entry from db
      // await UserOtpMapping.findOneAndDelete({ userId: userId });
      return res.status(200).send({ message: "OTP verified" });
    } else {
      throw new AppError(400, "Invalid OTP");
    }
    // save user with updated password if otp is matched
  } catch (error) {
    next(error);
  }
};

// reset password
const resetPassword = async (req, res, next) => {
  try {
    const { userId } = req.params;
    const { password } = req.body;
    const user = await User.findById(userId);
    if (!user) {
      // user not found
      throw new AppError(404, `User ${user?.email} not found`);
    }
    // save user password
    user.password = await hashPassword(password);
    await user.save();

    // delete users otp entry from db
    await UserOtpMapping.findOneAndDelete({ userId: userId });

    return res.status(200).send({ message: "Password reset successfully" });
    // save user with updated password if otp is matched
  } catch (error) {
    next(error);
  }
};

// refresh token
const refreshToken = async (req, res, next) => {
  try {
    const { email } = req.body;
    const payload = {
      email: email
    };
    const auth = await createToken(payload);
    res.status(200).send({
      message: "Token refreshed successfully",
      auth
    });
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
  validateOtp,
  resetPassword,
  refreshToken
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
