const Todo = require("../../Models/Todo");

const deleteTodo = async (req, res) => {
  let errorCode = null;
  try {
    const todoId = req.header("todoid");
    const todo = await Todo.findById(todoId);
    if (!todo) {
      errorCode = 404;
      throw new Error("Todo item not found");
    }
    const todoUser = todo.user;
    const loggedInUser = req.user;
    if (todoUser.toHexString() != loggedInUser.userId) {
      errorCode = 401;
      throw new Error("unauthorized access");
    }
    await Todo.findOneAndDelete({ _id: todoId })
      .then(() => {
        return res
          .status(200)
          .json({ success: true, message: "Deleted Successfully" });
      })
      .catch((err) => {
        throw new Error(err.message);
      });
  } catch (err) {
    return res.status(errorCode || 500).json({
      success: false,
      message: "Internal server error",
      error: err.message,
    });
  }
};
module.exports = deleteTodo;
