const mongoose = require("mongoose");
require("dotenv").config();

exports.connect = async () => {
  try {
    await mongoose.connect(process.env.DB_URL, {
      useNewUrlParser: true,
    });
    console.log("DB Connected");
  } catch (error) {
    console.error("mongoose error", error);
  }
};
