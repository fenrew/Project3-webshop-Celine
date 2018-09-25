const express = require("express");
const router = express.Router();
const User = require("../../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const config = require("../../config");
const upload = require("../../utils/upload");
const stripe = require("stripe")("sk_test_UankGAeDRDHAmwDfBCv0YzaY");
const Purchase = require("../../models/Purchase");

router.post("/charge", async (req, res, next) => {
  let statusSend = ""
  const shoppingCart = req.body.shoppingCart;
  let totalPrice = 0;
  shoppingCart.forEach(el => {
    totalPrice += el.price * el.quantity
  })
  totalPrice = Math.floor(totalPrice * 100);
  
  let { status } = await stripe.charges.create({
    amount: totalPrice,
    currency: "NOK",
    description: "An example charge",
    source: req.body.token.id
  })
    .then(({ status }) => {
      statusSend = { status }
      return User.findById(req.user._id);
    }).then((user) => {
      totalPrice /= 100;
      if (!user) {
        const newPurchase = Purchase({
          date: new Date,
          userEpost: "",
          userRef: "",
          userInformation: req.body.userInformation,
          items: shoppingCart,
          totalPrice: totalPrice,
          charged: true,
        });
        newPurchase.save()
      } else if (user) {
          const newPurchase = Purchase({
            date: new Date,
            userEpost: user.email,
            userRef: user._id,
            userInformation: req.body.userInformation,
            items: shoppingCart,
            totalPrice: totalPrice,
            charged: true,
          });
        newPurchase.save()
      }
      res.send(statusSend);
    })
    .catch(err => {
      console.error(err);
      res
        .status(500)
        .send({ error: "something bad happened in the checkout process." });
    });
});

module.exports = router;
