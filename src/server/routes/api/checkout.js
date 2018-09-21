const express = require('express')
const router = express.Router()
const User = require('../../models/User')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const config = require('../../config')
const upload = require('../../utils/upload')
const stripe = require("stripe")("sk_test_UankGAeDRDHAmwDfBCv0YzaY");

router.post('/charge', async (req, res) => { // /api/checkout/charge
    console.log(req.body.token.id)
    console.log(req.body);
    try {
        let {status} = await stripe.charges.create({
            amount: 2000,
            currency: "usd",
            description: "An example charge",
            source: req.body.token.id
        });
    
        res.json({status});
      } catch (err) {
          console.error(err)
        res.status(500).end();
      }
})


module.exports = router
