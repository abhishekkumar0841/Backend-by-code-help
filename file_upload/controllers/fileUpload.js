const File = require("../models/file");

// localfile upload--> handler function
exports.localFileUpload = async (req, res) => {
  try {
    // fetching file from request
    const file = req.files.file;
    console.log("file is -->", file);

    //create path where file need to be stored on server
    // here __dirname -->current working directory name + files--> inside current working directory it is a name of folder + Date.now() is using for unique name of the file + .${file.name.split('.')[1]} is used for extension of that file
    let path =
      __dirname + "/files/" + Date.now() + `.${file.name.split(".")[1]}`;
    console.log("Path -->", path);

    // adding path to the mover function
    file.mv(path, (err) => {
      console.log(err);
    });

    // create successful response
    res.json({
      success: true,
      message: "Local file is uploaded successfully",
    });
  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      message: "Local file cannot uploaded!",
    });
  }
};
