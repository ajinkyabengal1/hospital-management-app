const express = require("express");

const {
  updateUser,
  deleteUser,
  getsingleUser,
  getallUser,
} = require("../Controllers/userController.js");

const { authenticate, restrict } = require("../auth/verifyToken.js");

const router = express.Router();

router.get("/:id", authenticate, restrict(["patient"]), getsingleUser);
router.get("/", getallUser);
router.delete("/:id", deleteUser);
router.put("/:id", updateUser);

module.exports = router;
