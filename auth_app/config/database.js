const mongoose = require("mongoose");

const dbConnect = () => {
  mongoose
    .connect(process.env.DATABASE_URI)
    .then((conn) => {
      console.log(
        `Database is connected successfully with ${conn.connection.host}`
      );
    })
    .catch((e) => {
      console.log(`Error while database connection ${e}`);
      process.exit(1);
    });
};

module.exports = dbConnect;
