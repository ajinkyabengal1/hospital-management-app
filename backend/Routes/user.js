const express = require("express");

const {
  updateUser,
  deleteUser,
  getsingleUser,
  getallUser,
} = require("../Controllers/userController.js");

const router = express.Router();

router.get("/:id", getsingleUser);
router.get("/", getallUser);
router.delete("/:id", deleteUser);
router.put("/:id", updateUser);

module.exports = router;
