const express = require("express");

const {
  updateDoctor,
  deleteDoctor,
  getsingleDoctor,
  getallDoctor,
} = require("../Controllers/doctorController.js");

const router = express.Router();

router.get("/:id", getsingleDoctor);
router.get("/", getallDoctor);
router.delete("/:id", deleteDoctor);
router.put("/:id", updateDoctor);

module.exports = router;
