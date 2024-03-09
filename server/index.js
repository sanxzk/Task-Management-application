// imports
require("dotenv").config();
const express = require("express");
const { json } = require("express");
const cors = require("cors");
const connectToMongo = require("./Database/DataBase.js");

// actual implementation
const app = express();
app.use(json());
app.use(cors());

const PORT = process.env.PORT || 5000;

connectToMongo();

app.listen(PORT, () => {
  console.log(`TO DO list backend is listening on http://localhost:${PORT}`);
});

app.use("/api/auth", require("./Routes/Authentication.js")); //localhost:5000/api/auth/.....
app.use("/api/todo", require("./Routes/Todo.js")); //localhost:5000/api/todo/.....

app.use("/", (req, res) => {
  res.json({ success: true, Endpoint: "home" });
});
