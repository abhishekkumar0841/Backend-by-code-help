const bcrypt = require('bcrypt')
const User = require('../model/user')

// signup route handler
exports.signup = async (req, res)=>{
    try {
        const {name, email, password, role} = req.body;
        
        // check user if already exists
        const existingUser = await User.findOne({email})

        if(existingUser){
            return res.status(400).json({
                success: false,
                message: "User already exists!"
            })
        }

        //secure password
        let hashedPassword;
        try {
            //bcrypt.hash takes 3 parameters 1. what to be hashed.. 2. round for hashing.. 3. callback(optional) 
            hashedPassword = await bcrypt.hash(password, 10);
        } catch (error) {
            return res.status(500).json({
                success: false,
                message: "Password cannot be hashed!"
            })
        }

        //create entry for user
        const user = await User.create({
            //here no need to map name, email & role but we have to map password with updated hashed password.
            name, email, password:hashedPassword, role
        });

        return res.status(200).json({
            success: true,
            message: "User created successfully"
        })

    } catch (error) {
        console.log(error)
        return res.status(500).json({
            success: false,
            message: "user cannot be registered, please try again later"
        })
    }
}