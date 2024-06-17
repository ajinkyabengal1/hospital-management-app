const jwt = require("jsonwebtoken");
const Doctor = require("../models/DoctorSchema.js");
const User = require("../models/UserSchema.js");

// Authentication middleware
const authenticate = async (req, res, next) => {
  const authToken = req.headers.authorization;

  if (!authToken || !authToken.startsWith("Bearer")) {
    return res
      .status(401)
      .json({ success: false, message: "No token, authorization denied" });
  }

  try {
    const token = authToken.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

    req.userId = decoded.id;
    req.role = decoded.role;

    next(); // Call the next function in middleware chain
  } catch (err) {
    if (err.name === "TokenExpiredError") {
      return res.status(401).json({ message: "Token is expired" });
    }

    return res.status(401).json({ success: false, message: "Invalid token." });
  }
};

// Restriction middleware
const restrict = (roles) => async (req, res, next) => {
  const userId = req.userId; // Corrected from res.userId to req.userId
  let user;

  // Query both User and Doctor collections
  const patient = await User.findById(userId);
  const doctor = await Doctor.findById(userId);

  if (patient) {
    user = patient;
  } else if (doctor) {
    user = doctor;
  }

  if (!user || !user.role) {
    return res
      .status(401)
      .json({ success: false, message: "User not found or role not defined" });
  }

  // ! is remove from this (!roles.includes(user.role))
  if (roles.includes(!user.role)) {
    return res
      .status(401)
      .json({ success: false, message: "You're not authorized" });
  }

  next(); // Call the next function in middleware chain
};

module.exports = { authenticate, restrict };
