const router = require("express").Router();
const fetchUser = require("../middleware/fetchUser.js");

// @ENDPOINT: /signup
// DESC: creates and register a new user
// access: public
router.post("/signup", require("./Authentication/Signup"));

// @ENDPOINT: /login
// DESC: Logs a user
// access: public
router.post("/login", require("./Authentication/Login"));

router.get(
  "/getUserDetails",
  fetchUser,
  require("./Authentication/getUserDetails.js")
);

module.exports = router;
