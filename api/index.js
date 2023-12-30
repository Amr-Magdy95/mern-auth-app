const express = require("express");
const app = express();

// middleware

// Server is now live
const PORT = process.env.PORT || 3000;
app.listen(PORT, console.log(`Server is now listening on port: ${PORT}...`));
