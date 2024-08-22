const express = require("express");
const { authenticate, restrict } = require("../auth/verifyToken.js");

const { getCheckoutSession } = require("../Controllers/bookingController");

const router = express.Router();

router.post(`/checkout-session/:doctorId`, authenticate, getCheckoutSession);

module.exports = router;
