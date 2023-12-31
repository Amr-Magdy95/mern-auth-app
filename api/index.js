require("dotenv").config();
require("express-async-errors");

const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;

// middleware
app.use(express.json());

// routes
app.get("/", (req, res) => {
  res.redirect("/api/user/");
});
app.use("/api/user", require("./routes/user.route"));

// Server is now live
const start = async () => {
  try {
    console.log("Connecting to the DB...");
    await require("mongoose").connect(process.env.MONGO_URI);
    console.log("Connected to the DB!");
    app.listen(
      PORT,
      console.log(`Server is now listening on port: ${PORT}...`)
    );
  } catch (err) {
    console.log(err);
  }
};
start();
