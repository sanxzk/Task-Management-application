const json = require("jsonwebtoken"); // for auth token creation
const bcrypt = require("bcryptjs"); // for hashing the password and storing the hashed pass in db
const User = require("../../Models/User");
const secretKey = process.env.SECRET_KEY;

const Signup = async (req, res) => {
  let errorCode = null;
  try {
    let { name, email, password } = req.body;
    name = name.toLowerCase();
    email = email.toLowerCase();
    const alreadyUser = await User.findOne({ email });
    if (alreadyUser) {
      errorCode = 409;
      throw new Error("Account with email already exists.");
    }

    const securedPassword = bcrypt.hashSync(password, 10);
    const user = new User({ name, email, password: securedPassword });
    await user
      .save()
      .then((user) => {
        const data = {
          name,
          email,
          userId: user._id,
        };
        const authToken = json.sign(data, secretKey);
        res.status(201).json({
          success: true,
          message: "User created successfully.",
          authToken,
          user,
        });
      })
      .catch((err) => {
        errorCode = 500;
        throw new Error(err.message);
      });
  } catch (err) {
    res.status(errorCode || 500).json({
      success: false,
      message: "Internal Server Error",
      error: err.message,
    });
  }
};
module.exports = Signup;
