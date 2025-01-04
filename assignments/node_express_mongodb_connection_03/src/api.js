const express = require("express");
const mongoose = require("mongoose");
const { productRoutes } = require("./routes/Product.routes");

const app = express();

const initialize = async () => {
  try {
    // Your code goes here
    await connect();

    app.use(express.json());

    app.use('/products', productRoutes);

    app.listen(3000, () => {
        console.log("Server is running at http://localhost:3000");
    });
  } catch (err) {
    console.dir(err);
  }
};

initialize();

// mongoose connection with mongo db
async function connect() {
  try {
    const DB_USER = 'sanketwakhare';
    const DB_PASSWORD = 'aDMuRzDXtD0R74Qf';
    const DB_NAME = 'assignments';
    const uri = `mongodb+srv://${DB_USER}:${DB_PASSWORD}@cluster-capstone-projec.m4tykul.mongodb.net/${DB_NAME}?retryWrites=true&w=majority`;
    const clientOptions = {
      serverApi: { version: "1", strict: true, deprecationErrors: true }
    };
    // Create a Mongoose client with a MongoClientOptions object to set the Stable API version
    await mongoose.connect(uri, clientOptions);
    await mongoose.connection.db.admin().command({ ping: 1 });
    console.log("You successfully connected to MongoDB!");
  } catch (err) {
    mongoose.disconnect();
    throw err;
  }
}

module.exports = { app };
