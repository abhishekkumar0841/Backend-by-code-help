const mongoose = require("mongoose");

require("dotenv").config();

const dbConnect = () => {
  mongoose
    .connect(process.env.DATABASE_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => {
      console.log("Database connected successfully");
    })
    .catch((err) => {
      console.log("Database connection failed!");
      console.log(err);
      //While database connection in Express, process.exit (1) is used to force the process to shut down if it cannot close the connections in time. This is done to avoid hanging the process indefinitely due to keep-alive connections.
      process.exit(1)
    });
};

module.exports = dbConnect;
