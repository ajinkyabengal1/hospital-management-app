const jwt = require("jsonwebtoken");
const Doctor = require("../models/DoctorSchema.js");
const User = require("../models/UserSchema.js");

// authentication func
const authenticate = async (req, res, next) => {
  // get taken from headers
  const authToken = req.headers.authorization;

  // check token is exists
  if (!authToken || !authToken.startsWith("Bearer")) {
    return res
      .status(401)
      .json({ success: false, message: "No token, authorization denied" });
  }

  try {
    const token = authToken.split(" ")[1];

    // verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

    req.userId = decoded.id;
    req.role = decoded.role;

    next(); // must be call the next func
  } catch (err) {
    if (err.name === "TokenExpiredError") {
      return res.split(401).json({ message: "Token is expired" });
    }

    return res.status(401).json({ success: false, message: "Invalid token." });
  }
};

const restrict = (roles) => async (req, res, next) => {
  const userId = res.userId;

  let user;

  const patient = await User.findById(userId);
  const doctor = await Doctor.findById(userId);

  if (patient) {
    user = patient;
  }
  if (doctor) {
    user = doctor;
  }

  // Check if user is found and has a role
  if (!user || !user.role) {
    return res
      .status(401)
      .json({ success: false, message: "User not found or role not defined" });
  }

  if (!roles.includes(user.role)) {
    return res
      .status(401)
      .json({ success: false, message: "You're not authorized" });
  }

  next();
};

module.exports = { authenticate, restrict };
