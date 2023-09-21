const File = require("../models/file");
const cloudinary = require("cloudinary").v2;

// localfile upload--> handler function
exports.localFileUpload = async (req, res) => {
  try {
    // fetching file from request
    const file = req.files.file; //--with the help of this line(syntax) we can able to fetch file form request-- click on body--form-data, key=file, select type=file
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

//image upload handler
// function for checking file type is correct or not
function isFileTypeSupported(type, supportedTypes) {
  return supportedTypes.includes(type);
}

//function for uploading files
async function uploadFileToColudinary(file, folder, quality) {
  const options = { folder };
  console.log("temp file path..", file.tempFilePath);

  if(quality){
    options.quality = quality;
  }

  return await cloudinary.uploader.upload(file.tempFilePath, options);
}

exports.imageUpload = async (req, res) => {
  try {
    // fetch data from request
    const { name, tags, email } = req.body;
    console.log("these are name, tags, email ->", name, tags, email);

    const file = req.files.imageFile;
    console.log("file->>", file);

    // validation
    const supportedTypes = ["jpg", "png", "jpeg"];
    const fileType = file.name.split(".")[1].toLowerCase();
    console.log("File type is->", fileType);

    //if file format is supported
    if (!isFileTypeSupported(fileType, supportedTypes)) {
      return res.status(400).json({
        success: false,
        message: "This file type is not supported",
      });
    }

    //uploading to cloudinary, if file format is supported
    console.log("uploading to cloudinary...");
    const response = await uploadFileToColudinary(file, "abhishek");
    console.log("response is->", response);
    // saving entry to database
    const fileData = await File.create({
      name,
      tags,
      email,
      imageUrl: response.secure_url,
    });

    res.json({
      success: true,
      imageUrl: response.secure_url,
      message: "image successfully uploaded",
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      success: false,
      message: "Image cant't uploaded! try again",
    });
  }
};

// videoUpload handler
exports.videoUpload = async (req, res) => {
  try {
    // fetch data

    const { name, email, tags } = req.body;
    console.log("name, email, tags-->", name, email, tags);

    const file = req.files.videoFile;
    console.log("video file is ->>", file);

    //validation
    const supportedTypes = ["mp4", "mov"];
    const fileType = file.name.split(".")[1].toLowerCase();
    console.log("File type is->", fileType);

    //Todo:- set the max (5mb) upper limit for video file
    if (!isFileTypeSupported(fileType, supportedTypes)) {
      return res.status(400).json({
        success: false,
        message: "This file type is not supported",
      });
    }

    console.log("uploading to cloudinary...");
    //uploading to cloudinary, if file format is supported
    const response = await uploadFileToColudinary(file, "abhishek");
    console.log("response is->", response);

    // saving entry to database
    const fileData = await File.create({
      name,
      tags,
      email,
      imageUrl: response.secure_url,
    });

    res.json({
      success: true,
      imageUrl: response.secure_url,
      message: "Video successfully uploaded",
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      success: false,
      message: "Video cant't uploaded! try again",
    });
  }
};

exports.imageSizeReducer = async (req, res) => {
  try {
    // fetch data from request
    const { name, tags, email } = req.body;
    console.log("these are name, tags, email ->", name, tags, email);

    const file = req.files.imageFile;
    console.log("file->>", file);

    // validation
    const supportedTypes = ["jpg", "png", "jpeg"];
    const fileType = file.name.split(".")[1].toLowerCase();
    console.log("File type is->", fileType);

    //if file format is supported
    //Todo:- set the max (100kb) upper limit for image file
    if (!isFileTypeSupported(fileType, supportedTypes)) {
      return res.status(400).json({
        success: false,
        message: "This file type is not supported",
      });
    }

    //uploading to cloudinary, if file format is supported
    console.log("uploading to cloudinary...");
    const response = await uploadFileToColudinary(file, "abhishek", 10);
    console.log("response is->", response);
    // saving entry to database   
    const fileData = await File.create({
      name,
      tags,
      email,
      imageUrl: response.secure_url,
    });

    res.json({
      success: true,
      imageUrl: response.secure_url,
      message: "image successfully uploaded",
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Reduced image can't uploaded! try again",
    });
  }
};
