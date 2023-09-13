// The work of createTodo.js is only to make a todo type object and insert into the database... that's it>>>

//importing schema from models folder
const Todo = require('../models/todo')

//define route handler

exports.createTodo = async (req, res)=>{
    try {
        // extract title & description from request body
        const {title, description} = req.body;
        // create a new todo object and insert it in database
        const response = await Todo.create({title, description})
        // send a json response with success flag
        res.status(200).json({
            success: true,
            data: response,
            message: 'Entry created successfully'
        })
    } catch (error) {
        console.log(error)
        console.log("Error Message -->". error.message)
        res.status(500).json({
            success: false,
            data: 'Server Problem',
            message: error.message
        })
    }
}