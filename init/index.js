const mongoose = require("mongoose");
const Listing = require("../models/listing.js");
const initData = require("./data.js");
const MONGO_URL = "mongodb://127.0.0.1:27017/wanderlust";
main()
  .then(() => {
    console.log("DB is connected");
  })
  .catch((err) => {
    console.log("mongo db connection error");
    throw err;
  });
async function main() {
  await mongoose.connect(MONGO_URL);
}
const initDB = async () => {
  await Listing.deleteMany({});
  initData.data = initData.data.map((obj) => ({
    ...obj,
    owner: "69aef3a15f995b25633fb828",
  }));
  await Listing.insertMany(initData.data);
};
initDB();
