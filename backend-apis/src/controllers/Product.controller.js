const CrudFactory = require("../common/factories/CrudFactory");
const Product = require("../models/Product.model");

const createProduct = CrudFactory.create(Product);
const getProductById = CrudFactory.getById(Product);
const getAllProducts = CrudFactory.getAll(Product);
const updateProduct = CrudFactory.update(Product);
const deleteProduct = CrudFactory.delete(Product);

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
    const page = parseInt(query.page) || 1;
    const limit = parseInt(query.limit) || 10;
    const offset = (page - 1) * limit;
    searchPromise.limit(limit).skip(offset);

    // return only selected fields
    const selectParams = query.select;
    searchPromise.select(selectParams);

    // filter whose price > 20
    // searchPromise.where("price").gt(20);
    // // filter with categories electronics and clothing
    // searchPromise.where("category").in(["electronics", "clothing"]);
    // // filter with name containing "phone"
    // searchPromise.where("name").regex(/phone/i);

    // filter params
    const filterParams = query.filter;
    if (filterParams) {
      const parsedJson = JSON.parse(filterParams);
      let filterKeys = Object.keys(parsedJson);
      filterKeys = filterKeys.filter((k) => k !== "freeTextPhrase");

      // if freeTextPhrase is present
      const freeTextPhrase = parsedJson.freeTextPhrase;
      if (freeTextPhrase) {
        const freeTextRegex = new RegExp(freeTextPhrase, "i");
        searchPromise.find({
          $or: [{ title: freeTextRegex }, { category: freeTextRegex }, { description: freeTextRegex }]
        });
      }

      filterKeys.forEach((key) => {
        searchPromise.where(key).equals(parsedJson[key]);
      });
    }

    const products = await searchPromise;
    if (!products) {
      res.status(404).send({ message: "Product not found" });
      return;
    }

    res.status(200).send({
      data: products
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
  searchProducts
};
