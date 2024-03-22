const CrudFactory = require("../common/factories/CrudFactory");
const Product = require("../models/Product.model");

const createProduct = CrudFactory.create(Product);
const getProductById = CrudFactory.getById(Product);
const getAllProducts = CrudFactory.getAll(Product);
const updateProduct = CrudFactory.update(Product);
const deleteProduct = CrudFactory.delete(Product);

/**
 * Searches for products in the database based on various criteria.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @param {Function} next - The next middleware function.
 * @returns {void}
 */
const searchProducts = async (req, res, next) => {
  try {
    res.setHeader("Content-Type", "application/json");

    const query = req.query;
    if (Object.keys(query).length === 0) {
      res.status(400).send({ message: "Invalid search query" });
      return;
    }
    const searchPromise = Product.find();

    // sorting
    const sort = query.sort;
    const order = query.order;
    if (sort) {
      let sortOption = sort;
      if (order === "desc") {
        sortOption = `-${sort}`;
      }
      searchPromise.sort(sortOption);
    }

    // implement pagination
    const page = !isNaN(query?.page) ? parseInt(query.page) : 1;
    const limit = !isNaN(query?.limit) ? parseInt(query.limit) : 10;
    const offset = (page - 1) * limit;
    searchPromise.limit(limit).skip(offset);

    // return only selected fields
    const selectParams = query.select;
    searchPromise.select(selectParams);

    // configure freeTextPhrase
    const freeTextPhrase = query?.freeTextPhrase;
    if (freeTextPhrase) {
      const freeTextRegex = new RegExp(freeTextPhrase, "i");
      searchPromise.find({
        $or: [{ title: freeTextRegex }, { category: freeTextRegex }]
      });
    }

    // filter params
    const filterParams = query.filter;
    if (filterParams) {
      const parsedJson = JSON.parse(filterParams);
      let filterKeys = Object.keys(parsedJson);
      filterKeys.forEach((key) => {
        searchPromise.where(key).equals(parsedJson[key]);
      });
    }

    const products = await searchPromise;
    if (!products) {
      res.status(404).send({ message: "Product not found" });
      return;
    }

    // clone searchPromise and get th total products with current search query
    const clonedSearchPromise = searchPromise.clone();
    // remove existing skip and limit options to get total count
    clonedSearchPromise.limit(undefined).skip(undefined);
    const totalCount = await clonedSearchPromise.countDocuments();
    res.status(200).send({
      data: products,
      totalCount
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Loads multiple products into the database.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @param {Function} next - The next middleware function.
 * @returns {void}
 */
const loadProducts = async (req, res, next) => {
  try {
    res.setHeader("Content-Type", "application/json");
    const { products } = req.body;
    if (products.length === 0) {
      return;
    }
    // insert multiple products into db
    await Product.insertMany(products);
    res.status(200).send({
      message: "Products loaded successfully"
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createProduct,
  getProductById,
  updateProduct,
  deleteProduct,
  getAllProducts,
  searchProducts,
  loadProducts
};
