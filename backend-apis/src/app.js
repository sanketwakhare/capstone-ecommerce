const dotenv = require("dotenv");
const { connectToMongoDb } = require("./mongoose-connector");
const { initServer } = require("./express-server");

const initialize = async () => {
  try {
    // configure .env file
    dotenv.config();

    // connect to mongodb using mongoose ODM
    await connectToMongoDb();

    // start express server
    await initServer();
  } catch (err) {
    console.dir(err);
  }
};

initialize();
