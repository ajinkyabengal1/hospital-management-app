const Doctor = require("../models/DoctorSchema.js");
const Booking = require("../models/BookingSchema.js");

// update Doctor func
const updateDoctor = async (req, res) => {
  const id = req.params.id;

  try {
    const updatedDoctor = await Doctor.findByIdAndUpdate(
      id,
      { $set: req.body },
      { new: true }
    );

    res.status(200).json({
      success: true,
      message: "Successfully updated",
      data: updatedDoctor,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to update",
      data: updatedDoctor,
    });
  }
};

// delete Doctor func
const deleteDoctor = async (req, res) => {
  const id = req.params.id;

  try {
    await Doctor.findByIdAndDelete(id);

    res.status(200).json({
      success: true,
      message: "Successfully deleted",
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "Failed to delete" });
  }
};

// get single Doctor func
const getsingleDoctor = async (req, res) => {
  const id = req.params.id;

  try {
    const doctor = await Doctor.findById(id)
      .populate("reviews")
      .select("-password");

    res.status(200).json({
      success: true,
      message: "Doctor found successfully.",
      data: doctor,
    });
  } catch (error) {
    res.status(404).json({ success: false, message: "No Doctor found" });
  }
};

// get all Doctor func
const getallDoctor = async (req, res) => {
  try {
    const { query } = req.query;
    let doctors;

    if (query) {
      doctors = await Doctor.find({
        isApproved: "approved",
        $or: [
          { name: { $regex: query, $options: "i" } },
          {
            specialization: { $regex: query, $options: "i" },
          },
        ],
      }).select("-password");
    } else {
      doctors = await Doctor.find({ isApproved: "approved" }).select(
        "-password"
      );
    }

    const Doctors = await Doctor.find({ isApproved: "approved" }).select(
      "-password"
    );

    res.status(200).json({
      success: true,
      message: "Doctors found successfully.",
      data: Doctors,
    });
  } catch (error) {
    res.status(404).json({ success: false, message: "No Doctors found" });
  }
};

// get doctors profile func
const getDoctorProfile = async (req, res) => {
  const doctorId = req.doctorId;

  try {
    const doctor = await Doctor.findById(doctorId);

    if (!doctor) {
      return res
        .status(404)
        .json({ success: false, message: "Doctor not found." });
    }

    const { password, ...rest } = doctor._doc;

    const appointments = await Booking.find({ doctor: doctorId });

    res.status(200).json({
      success: true,
      message: "doctor found successfully !",
      data: { ...rest, appointments },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "Something went wrong !" });
  }
};

module.exports = {
  updateDoctor,
  deleteDoctor,
  getsingleDoctor,
  getallDoctor,
  getDoctorProfile,
};
