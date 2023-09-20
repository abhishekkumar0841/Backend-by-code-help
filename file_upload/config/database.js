const mongoose = require("mongoose");

require("dotenv").config();

exports.connect = () => {
  mongoose
    .connect(process.env.DATABASE_URI)
    .then((conn) => {
      console.log(
        `Database is connected successfully with ${conn.connection.host}`
      );
    })
    .catch((e) => {
      console.log("Error while database connectivity!");
      console.log(e);
      process.exit(1);
    });
};
