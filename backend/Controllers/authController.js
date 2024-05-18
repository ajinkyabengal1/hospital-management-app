const { User } = require("../models/UserSchema");
const { Doctor } = require("../models/DoctorSchema");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const register = async (req, res) => {
  const { email, password, name, role, photo, gender } = req.body;

  try {
    let user = null;

    if (role === "patient") {
      user = user.findOne({ email });
    } else if (role === "doctor") {
      user = user.findOne({ email });
    }

    // check if user  exist
    if (user) {
      return res.status(400).json({ message: "User already exist." });
    }
  } catch (error) {
    // Error handling
  }
};

const login = async (req, res) => {
  try {
    // Login logic
  } catch (error) {
    // Error handling
  }
};

module.exports = { register, login };
