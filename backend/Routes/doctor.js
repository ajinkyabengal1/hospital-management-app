const express = require("express");

const {
  updateDoctor,
  deleteDoctor,
  getsingleDoctor,
  getallDoctor,
} = require("../Controllers/doctorController.js");

const { authenticate, restrict } = require("../auth/verifyToken.js");

const reviewRouter = require("./review.js");

const router = express.Router();

// nested routes
router.use("/:doctorId/reviews", reviewRouter);

router.get("/:id", getsingleDoctor);
router.get("/", getallDoctor);
router.delete("/:id", authenticate, restrict(["doctor"]), deleteDoctor);
router.put("/:id", authenticate, restrict(["doctor"]), updateDoctor);

module.exports = router;
