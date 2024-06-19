const express = require("express");

const {
  updateUser,
  deleteUser,
  getsingleUser,
  getallUser,
  getUserProfile,
  getMyAppointments,
} = require("../Controllers/userController.js");

const { authenticate, restrict } = require("../auth/verifyToken.js");

const router = express.Router();

router.get("/:id", authenticate, restrict(["patient"]), getsingleUser);
router.get("/", authenticate, restrict(["admin"]), getallUser);
router.delete("/:id", authenticate, restrict(["patient"]), deleteUser);
router.put("/:id", authenticate, restrict(["patient"]), updateUser);
router.get("/profile/me", authenticate, restrict(["patient"]), getUserProfile);
router.get(
  "/appointment/my-appointments",
  authenticate,
  restrict(["patient"]),
  getMyAppointments
);

module.exports = router;
