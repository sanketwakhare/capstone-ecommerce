const User = require("../models/User.model");
const CrudFactory = require("../common/factories/CrudFactory");

const createUser = CrudFactory.create(User);

const getUserById = CrudFactory.getById(User);

const getAllUsers = CrudFactory.getAll(User);

const updateUser = CrudFactory.update(User);

const deleteUser = CrudFactory.delete(User);

module.exports = {
  createUser,
  getUserById,
  updateUser,
  deleteUser,
  getAllUsers,
};
