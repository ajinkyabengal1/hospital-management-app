const User = require("../models/UserSchema.js");
const Booking = require("../models/BookingSchema.js");
const Doctor = require("../models/DoctorSchema.js");

// update user func
const updateUser = async (req, res) => {
  const id = req.params.id;

  try {
    const updatedUser = await User.findByIdAndUpdate(
      id,
      { $set: req.body },
      { new: true }
    );

    res.status(200).json({
      success: true,
      message: "Successfully updated",
      data: updatedUser,
    });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Failed to update", data: updatedUser });
  }
};

// delete user func
const deleteUser = async (req, res) => {
  const id = req.params.id;

  try {
    const deletedUser = await User.findByIdAndDelete(id);

    res.status(200).json({
      success: true,
      message: "Successfully deleted",
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "Failed to delete" });
  }
};

// get single user func
const getsingleUser = async (req, res) => {
  const id = req.params.id;

  try {
    const user = await User.findById(id);

    res.status(200).json({
      success: true,
      message: "User found successfully.",
      data: user,
    });
  } catch (error) {
    res.status(404).json({ success: false, message: "No user found" });
  }
};

// get all user func
const getallUser = async (req, res) => {
  try {
    const users = await User.find({});

    res.status(200).json({
      success: true,
      message: "Users found successfully.",
      data: users,
    });
  } catch (error) {
    res.status(404).json({ success: false, message: "No users found" });
  }
};

// get user profile func
const getUserProfile = async (req, res) => {
  const userId = req.userId;

  try {
    const user = await User.findById(userId);

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found." });
    }

    const { password, ...rest } = user._doc;

    res.status(200).json({
      success: true,
      message: "user found successfully !",
      data: { ...rest },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "Something went wrong !" });
  }
};

// get user appointments func
const getMyAppointments = async (req, res) => {
  try {
    // 1. retrieve appointments from booking for specific user
    const bookings = await Booking.find({ user: req.userId });

    // 2. extract doctor id from appointments
    const doctorIds = bookings.map((item) => item.doctor.id);

    // 3. retrieve doctors ids
    const doctors = await Doctor.find({ _id: { $in: doctorIds } }).select(
      "-password"
    );
    console.log(doctors);

    res
      .status(200)
      .json({ success: true, message: "Appointment found.", data: doctors });
  } catch (error) {
    res.status(500).json({ success: false, message: "Something went wrong !" });
  }
};

module.exports = {
  updateUser,
  deleteUser,
  getsingleUser,
  getallUser,
  getUserProfile,
  getMyAppointments,
};
