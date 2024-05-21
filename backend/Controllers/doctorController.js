const Doctor = require("../models/DoctorSchema.js");

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
    res
      .status(500)
      .json({
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
    const deletedDoctor = await Doctor.findByIdAndDelete(id);

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
    const Doctor = await Doctor.findById(id);

    res.status(200).json({
      success: true,
      message: "Doctor found successfully.",
      data: Doctor,
    });
  } catch (error) {
    res.status(404).json({ success: false, message: "No Doctor found" });
  }
};

// get all Doctor
const getallDoctor = async (req, res) => {
  try {
    const Doctors = await Doctor.find({});

    res.status(200).json({
      success: true,
      message: "Doctors found successfully.",
      data: Doctors,
    });
  } catch (error) {
    res.status(404).json({ success: false, message: "No Doctors found" });
  }
};

module.exports = { updateDoctor, deleteDoctor, getsingleDoctor, getallDoctor };
