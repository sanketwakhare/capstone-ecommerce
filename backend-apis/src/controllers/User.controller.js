const { Models } = require("../common/constants/Models");
const AppError = require("../common/errors/AppError");
const CrudFactory = require("../common/factories/CrudFactory");
const User = require("../models/User.model");

const createUser = CrudFactory.create(User);
const getUserById = CrudFactory.getById(User);
const getAllUsers = CrudFactory.getAll(User);
const updateUser = CrudFactory.update(User);
const deleteUser = CrudFactory.delete(User);

/**
 * Retrieves user profile information based on the user ID stored in the request object.
 * Sends a JSON response containing the user details if the user is found.
 * Responds with an error if the user is not found or if an error occurs during the process.
 *
 * @param {Object} req - The request object containing the user ID.
 * @param {Object} res - The response object to send the user profile data.
 * @param {Function} next - The next middleware function in the request-response cycle.
 * @returns {void}
 */
const getProfile = async (req, res, next) => {
  try {
    res.setHeader("Content-Type", "application/json");
    const { userId } = req;
    const user = await User.findById(userId);
    if (!user) {
      throw new AppError(404, `${Models[User]} with id ${userId} not found`);
    }
    res.status(200).send({
      data: {
        userId: user.id,
        email: user.email
      }
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createUser,
  getUserById,
  updateUser,
  deleteUser,
  getAllUsers,
  getProfile
};
