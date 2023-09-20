// we have to make middlewares for -->> auth, isStudent, isAdmin

const jwt = require("jsonwebtoken");
require('dotenv').config();

exports.auth = (req, res, next) => {
  try {
    // extracting jwt token
    console.log("Cookies token", req.cookies.token)
    console.log("Body token", req.body.token)
    console.log("Header token", req.header('Authorization') )
    //3 main ways to fetch token.. and the most secure is from header--> req.header('Authorization')
    const token = req.cookies.token || req.body.token || req.header('Authorization').replace('Bearer ', "");
    //i can't fetch token from req.cookies.token & req.body.token...i don't know why...i can only fetch token form header
    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Token missing!",
      });
    }
    // verifying the token
    try {
      // here jwt.verify() is method which gives a decoded token by which we can find out the payloads separately like email, id, and role. It takes two parameters 1st is token and 2nd is secret key
      const payload = jwt.verify(token, process.env.JWT_SECRET);
      console.log("Payload is >>>", payload);
      //here storing the payload for verifying the role and allowing the user for their specific portal based on their role ... further...
      req.user = payload;
    } catch (error) {
      return res.status(401).json({
        success: false,
        message: "Token is invalid!",
      });
    }

    // going to next middleware
    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "Something went wrong while verifying the token!",
    });
  }
};

// isStudent middleware
exports.isStudent = (req, res, next) => {
  try {
    if (req.user.role !== "Student") {
      return res.status(401).json({
        success: false,
        message: "This is protected route only for students",
      });
    }
    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "User role cannot matched!",
    });
  }
};

//isAdmin middleware
exports.isAdmin = (req, res, next) => {
  try {
    if (req.user.role !== "Admin") {
      return res.status(401).json({
        success: false,
        message: "This is protected route only for admin!",
      });
    }
    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "User role cannot matched!",
    });
  }
};
