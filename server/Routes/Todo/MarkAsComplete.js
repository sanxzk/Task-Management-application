const Todo = require("../../Models/Todo");

const markAsComplete = async (req, res) => {
  let errorCode = null;
  try {
    const todoId = req.body.todoId;
    let todo = await Todo.findById(todoId);
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
    todo.isCompleted = true;
    todo
      .save()
      .then((todo) => {
        res
          .status(200)
          .json({ success: true, message: "todo item marked as completed." });
      })
      .catch((err) => {
        throw new Error(err.message);
      });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Internal server Error",
      error: err.message,
    });
  }
};
module.exports = markAsComplete;
