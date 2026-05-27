const express = require("express");
const { verifyJWT } = require("../middlewares/auth.middleware");
const { getPrices, createPrice, updatePrice, deletePrice } = require("../controllers/price.controller");

const router = express.Router();

// All protected routes require JWT
router.use(verifyJWT);

// Protected Price CRUD
router.get("/prices", getPrices);
router.post("/prices", createPrice);
router.patch("/prices/:priceId", updatePrice);
router.delete("/prices/:priceId", deletePrice);

module.exports = router;
