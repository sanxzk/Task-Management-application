const getUserDetails = async (req, res) => {
  let errorCode = null;
  try {
    res.status(500).json({ success: true, user: req.user });
  } catch (err) {
    res.status(errorCode || 500).json({
      success: false,
      message: "Internal Server Error",
      error: err.message,
    });
    return;
  }
};
module.exports = getUserDetails;
