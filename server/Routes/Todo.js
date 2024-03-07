const router = require("express").Router();
const fetchUser = require("../middleware/fetchUser");

router.post("/create", fetchUser, require("./Todo/CreateTodo"));

router.put("/markComplete", fetchUser, require("./Todo/MarkAsComplete"));

router.delete("/deleteTodo", fetchUser, require("./Todo/deleteTodo"));

router.put("/editTodo", fetchUser, require("./Todo/editTodo"));

router.get("/getTasks", fetchUser, require("./Todo/getTasks"));

module.exports = router;
