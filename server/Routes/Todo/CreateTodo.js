const User = require("../../Models/User");
const Todo = require("../../Models/Todo");

const createTodo = async (req, res) => {
  let errorCode = null;
  try {
    const userId = req.user.userId;
    const user = await User.findById(userId);
    if (!user) {
      errorCode = 404;
      throw new Error("No user found");
    }
    let todo = req.body;
    todo.user = user;
    const newTodo = new Todo(todo);
    newTodo
      .save()
      .then((newTodo) => {
        return res.status(201).json({
          success: true,
          message: "New Todo created",
          data: newTodo,
        });
      })
      .catch((err) => {
        errorCode = 500;
        throw new Error("todo creation failed");
      });
  } catch (err) {
    res.status(errorCode || 500).json({
      success: false,
      message: "Internal Server Error",
      error: err.message,
    });
    return;
  }
};
module.exports = createTodo;
