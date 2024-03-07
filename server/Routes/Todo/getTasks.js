const User = require("../../Models/User");
const Todo = require("../../Models/Todo");
const getTasks = async (req, res) => {
  let errorCode = null;
  try {
    const email = req.user.email;
    const user = await User.findOne({ email });
    const Todos = await Todo.find({ user });
    return res.status(200).json({ success: true, TodoList: Todos });
  } catch (err) {
    res.status(errorCode || 500).json({
      success: false,
      message: "Internal server error",
      error: err.message,
    });
  }
};

module.exports = getTasks;
