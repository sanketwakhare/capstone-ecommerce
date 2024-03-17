const mongoose = require("mongoose");

const { Models } = require("../constants/Models");
const AppError = require("../errors/AppError");

const create = (Model) => async (req, res, next) => {
  try {
    const model = new Model(req.body);
    const createdModel = await model.save();
    res.status(201).json({
      message: `${Models[Model.modelName]} created successfully`,
      data: {
        id: createdModel.id
      }
    });
  } catch (err) {
    next(err);
  }
};

const getAll = (Model) => async (req, res, next) => {
  try {
    res.setHeader("Content-Type", "application/json");
    const models = await Model.find();
    res.status(200).send({
      data: models
    });
  } catch (error) {
    next(error);
  }
};

const getById = (Model) => async (req, res, next) => {
  try {
    res.setHeader("Content-Type", "application/json");
    const id = req.params.id;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new AppError(400, `Invalid ${Models[Model.modelName]} id ${id}`);
    }
    const model = await Model.findById(id);
    if (!model) {
      throw new AppError(404, `${Models[Model.modelName]} with id ${id} not found`);
    }
    res.status(200).send({
      data: model
    });
  } catch (error) {
    next(error);
  }
};

const update = (Model) => async (req, res, next) => {
  try {
    res.setHeader("Content-Type", "application/json");
    const id = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new AppError(400, `Invalid ${Models[Model.modelName]} id ${id}`);
    }
    const model = await Model.findByIdAndUpdate(id, req.body);
    if (!model) {
      throw new AppError(404, `${Models[Model.modelName]} with id ${id} not found`);
    }
    res.status(200).send({
      message: `${Models[Model.modelName]} updated successfully`,
      data: await Model.findById(id)
    });
  } catch (error) {
    next(error);
  }
};

const deleteModel = (Model) => async (req, res, next) => {
  try {
    res.setHeader("Content-Type", "application/json");

    const id = req.params.id;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new AppError(400, `Invalid ${Models[Model.modelName]} id ${id}`);
    }
    const model = await Model.findByIdAndDelete(id);
    if (!model) {
      throw new AppError(404, `${Models[Model.modelName]} with id ${id} not found`);
    }
    res.status(200).send({
      message: `${Models[Model.modelName]} deleted successfully`
    });
  } catch (error) {
    next(error);
  }
};

const getTotalCount = (Model) => async (req, res, next) => {
  try {
    res.setHeader("Content-Type", "application/json");
    const count = await Model.countDocuments();
    res.status(200).send({
      totalCount: count
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  create,
  getAll,
  getById,
  update,
  delete: deleteModel,
  getTotalCount
};
