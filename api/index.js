require("dotenv").config();
require("express-async-errors");

const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;

// middleware
//app.use(require("cors")());
app.use(require("cors")({ credentials: true, origin: true }));
app.use(express.json());
app.use(require("cookie-parser")());

// routes
app.get("/", (req, res) => {
  res.redirect("/api/user/");
});
app.use("/api/user", require("./routes/user.route"));
app.use("/api/auth", require("./routes/auth.route"));

// notFound and error handling
app.use(require("./middleware/ErrorHandling"));

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
