const express = require("express");
const router = express.Router();
const User = require("../../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const config = require("../../config");
const upload = require("../../utils/upload");
const stripe = require("stripe")("sk_test_UankGAeDRDHAmwDfBCv0YzaY");

router.post("/charge", async (req, res, next) => {
  // /api/checkout/charge
  try {
    let totalPrice = 0;
    User.findById(req.user._id).then(result => {
      //let products = []
      //REMEMBER: totalPrice * 100
      result.shoppingCart.map(el => {
        totalPrice += el.price * el.quantity;
      }); 
      totalPrice.toString()
      console.log(totalPrice)
    });
    let { status } = await stripe.charges.create({
      amount: "1000",
      currency: "NOK",
      description: "An example charge",
      source: req.body.token.id
    });
    User.findById(req.user._id).then(result => {
      //let products = []
      //REMEMBER: totalPrice * 100
      result.shoppingCart = [];
      result.save();
      return res.json({ status })
    });
  } catch (err) {
    console.error(err);
    res.status(500).end();
  }
});

module.exports = router;
