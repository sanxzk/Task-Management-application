const bcrypt = require("bcryptjs");
const json = require("jsonwebtoken");
const SecretKey = process.env.SECRET_KEY;

const User = require("../../Models/User");

const Login = async (req, res) => {
  let errorCode = null;
  try {
    let { email, password } = req.body;
    email = email.toLowerCase();
    const user = await User.findOne({ email });
    if (!user) {
      res
        .status(403)
        .json({ success: false, message: "email or password is incorrect" });
      return;
    }
    const savedPassword = user.password;
    const verified = await bcrypt.compare(password, savedPassword);
    if (!verified) {
      errorCode = 403;
      throw new Error("email or password is incorrect");
    }
    const data = {
      email,
      name: user.name,
      userId: user._id
    };
    const authToken = json.sign(data, SecretKey);
    res.status(200).json({
      success: true,
      message: "Logged in successfully",
      authToken,
      user,
    });
    return;
  } catch (err) {
    res.status(errorCode || 500).json({
      success: false,
      message: "Internal Server Error",
      error: err.message,
    });
    return;
  }
};

module.exports = Login;
