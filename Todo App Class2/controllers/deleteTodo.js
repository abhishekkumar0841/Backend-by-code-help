const Todo = require("../models/todo");

exports.deleteTodo = async (req, res) => {
  try {
    const {id} = req.params;
    await Todo.findByIdAndDelete(id);
    res.json({
        success:true,
        message: 'Todo deleted'
    })

  } catch (error) {
    console.log(error);
    console.log("Error Message -->".error.message);
    res.status(500).json({
      success: false,
      data: "Server Problem while deleting todo",
      message: error.message,
    });
  }
};
