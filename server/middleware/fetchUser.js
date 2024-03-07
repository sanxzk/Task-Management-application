const jwt = require("jsonwebtoken");
const User = require("../Models/User");
const secretKey = process.env.SECRET_KEY;

const fetchUser = async (req, res, next) => {
  let errorCode = null;
  try {
    const authToken = req.header("authToken");
    if (!authToken) {
      errorCode = 400;
      throw new Error("authentication failed");
    }
    const data = jwt.verify(authToken, secretKey);
    if (!data) {
      errorCode = 400;
      throw new Error("authentication failed");
    }
    const userId = data.userId;
    const user = await User.findById(userId);
    // console.log(user);
    if (user) {
      req.user = data;
      next();
    } else {
      errorCode = 400;
      throw new Error("authentication failed");
    }
  } catch (err) {
    return res
      .status(errorCode || 500)
      .json({
        success: false,
        message: "Internal server Error",
        error: err.message,
      });
  }
};

module.exports = fetchUser;
