const Todo = require("../../Models/Todo");

const editTodo = async (req, res) => {
  let errorCode = null;
  try {
    const todoId = req.header("todoid");
    const editTodo = req.body;
    
    const todo = await Todo.findById(todoId);
    const todoUser = todo.user;
    const loggedInUser = req.user;
    if (todoUser.toHexString() != loggedInUser.userId) {
      errorCode = 401;
      throw new Error("unauthorized access");
    }

    const edited = await Todo.findByIdAndUpdate(todoId, editTodo, {
      returnDocument: true,
    })
      .then(() => {
        return res
          .status(200)
          .json({ success: true, message: "Todo item edited" });
      })
      .catch((err) => {
        throw new Error(err.message);
      });
  } catch (err) {
    res
      .status(errorCode || 500)
      .json({ success: false, message: "Internal server", error: err.message });
  }
};
module.exports = editTodo;
