const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();

const app = express();
const port = process.env.PORT || 8000;

const corsOption = {
  origin: true,
};

app.get("/", (req, res) => {
  res.send("Api is working");
});

// middleware
app.use(express.json());
app.use(cookieParser());
app.use(cors(corsOption));

app.listen(port, () => {
  console.log("Server is running on port " + port);
});
