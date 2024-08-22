const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const authRoute = require("./Routes/auth.js");
const userRoute = require("./Routes/user.js");
const doctorRoute = require("./Routes/doctor.js");
const reviewRoute = require("./Routes/review.js");
const bookingRoute = require("./Routes/booking.js");

dotenv.config();

const app = express();
const port = process.env.PORT || 8000;

const corsOption = {
  origin: true,
};

app.get("/", (req, res) => {
  res.send("Api is working");
});

// database connection
mongoose.set("strictQuery", false);
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log("mongodb database is connected");
  } catch (error) {
    console.log("mongodb database connection failed");
  }
};

// middleware
app.use(express.json());
app.use(cookieParser());
app.use(cors(corsOption));
app.use("/api/v1/auth", authRoute); //domain/api/v1/auth/register
app.use("/api/v1/users", userRoute); //domain/api/v1/auth/users
app.use("/api/v1/doctors", doctorRoute); //domain/api/v1/auth/doctors
app.use("/api/v1/reviews", reviewRoute); //domain/api/v1/auth/doctors/review
app.use("/api/v1/bookings", bookingRoute); //domain/api/v1/auth/doctors/bookings

app.listen(port, () => {
  connectDB();
  console.log("Server is running on port " + port);
});
