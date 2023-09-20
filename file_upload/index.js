//creating app
const express = require("express");
const app = express();

//finding PORT
require("dotenv").config();
const PORT = process.env.PORT || 3000;

//adding middleware
app.use(express.json());
// this express middleware is used for uploading files
const fileUpload = require("express-fileupload");
app.use(fileUpload());

//db connection
const db = require("./config/database");
db.connect();

//cloudinary connection
const cloudinary = require("./config/cloudinary");
cloudinary.cloudinaryConnect();

//api route mount
const Upload = require("./routes/fileUpload");
app.use("/api/v1/upload", Upload);

// activating server
app.listen(PORT, () => {
  console.log(`This app is running on http://localhost:${PORT}`);
});
