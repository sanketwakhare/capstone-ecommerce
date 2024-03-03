const mongoose = require("mongoose");

// mongoose connection with mongo db
async function connect() {
  try {
    const { DB_USER, DB_PASSWORD, DB_NAME } = process.env;
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

module.exports = {
  connectToMongoDb: connect
};
