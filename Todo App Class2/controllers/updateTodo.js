const Todo = require("../models/todo");

exports.updateTodo = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description } = req.body;

    const todo = await Todo.findByIdAndUpdate(
        {_id: id},
        {title, description, updatedAt: Date.now()}
    );
        res.status(200).json({
            success: true,
            data: todo,
            message: `Todo ${id} data successfully updated`,
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
};
