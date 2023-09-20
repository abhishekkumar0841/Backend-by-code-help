const bcrypt = require("bcrypt");
const User = require("../model/user");
const jwt = require("jsonwebtoken");

// signup route handler
exports.signup = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    // check user if already exists
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "User already exists!",
      });
    }

    //secure password
    let hashedPassword;
    try {
      //bcrypt.hash takes 3 parameters 1. what to be hashed.. 2. round for hashing.. 3. callback(optional)
      hashedPassword = await bcrypt.hash(password, 10);
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: "Password cannot be hashed!",
      });
    }

    //create entry for user
    const user = await User.create({
      //here no need to map name, email & role but we have to map password with updated hashed password.
      name,
      email,
      password: hashedPassword,
      role,
    });

    return res.status(200).json({
      success: true,
      message: "User created successfully",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "user cannot be registered, please try again later",
    });
  }
};

// login
exports.login = async (req, res) => {
  try {
    // data fetch
    const { email, password } = req.body;

    // validation on email and password
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Please fill all the details!",
      });
    }

    // check user is already available on not
    let user = await User.findOne({ email });
    // if user not available
    if (!user) {
      return res.status(401).json({
        success: false,
        message: "User is not registered yet!",
      });
    }

    // this below payload is used for generating jwt token
    const payload = {
      email: user.email,
      id: user._id,
      role: user.role,
    };

    // verify password and generate JWT Token
    if (await bcrypt.compare(password, user.password)) {
      // if password successfully compared
      const token = jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: "2h",
      });
       user = user.toObject() //creating newObject again
      //creating new field inside user and placed generated token inside this field
      user.token = token;

      // removing password form user object for security purpose..not removing password form database
      user.password = undefined;

      //adding cookie inside response(res)
      //this cookie takes 3 parameters 1st name of cookie, 2nd value & 3rd options() 
      //this options object should be passed inside cookies third parameter
      const options ={
        expires: new Date( Date.now () + 30000),
        httpOnly: true
      }
      res.cookie("token", token, options).status(200).json({
        success: true,
        token, 
        user,
        message: "User logged in successfully"
      })

    } else {
      // if password not compared
      return res.status(403).json({
        success: false,
        message: "Password Incorrect!",
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({
        success: false,
        message: "Login failure!",
      });
  }
};
