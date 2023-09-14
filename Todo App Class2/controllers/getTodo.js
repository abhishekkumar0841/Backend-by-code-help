const Todo = require("../models/todo");

exports.getTodo = async (req, res) => {
  try {
    //fetch all todo items from database
    const todos = await Todo.find({});
    //response
    res.status(200).json({
      success: true,
      data: todos,
      message: "All todo data are fetched",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      data: "Server problem while fetching all todos",
      message: error.message,
    });
  }
};

//get todo by id
exports.getTodoById = async (req, res) => {
  try {
    // extract todo item on basis of id
    const id = req.params.id;
    const todo = await Todo.findById({
      _id: id,
    });
    if (!todo) {
      res.status(404).json({
        success: false,
        message: "No data found with this id",
      });
    }
    //if data is successfully found
    res.status(200).json({
      success: true,
      data: todo,
      message: `Todo ${id} data successfully fetched`,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      data: "Server error while fetching data by Id",
      message: error.message,
    });
  }
};
