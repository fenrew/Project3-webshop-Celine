const express = require("express");
const router = express.Router();
const Shop = require("../../models/Shop");
const User = require("../../models/User");
const Purchase = require("../../models/Purchase");

const authRoutes = require("./auth");
const checkoutRoutes = require("./checkout");
const { userMiddleware, checkLoggedIn } = require("../../utils/middleware");

router.use(userMiddleware);

router.get("/", (req, res) => {
  res.send({ hello: true });
});

router.get("/models", (req, res) => {});

router.get("/shop/user", (req, res) => {
  User.findById(req.user._id).then(result => {
    res.send({ result });
  });
});

router.post("/shop/cart", (req, res) => {
  const user = req.body.user;
  User.findByIdAndUpdate(
    user._id,
    { shoppingCart: user.shoppingCart },
    { new: true }
  ).then(result => {
    result.save();
  });
});

router.get("/purchased", checkLoggedIn, (req, res) => {
  User.findById(req.user._id).then(user => {
    if (user.role !== "admin") return;
    return Purchase.find().then(result => {
      result.sort((a, b) => {
        return new Date(b.date).getTime() - new Date(a.date).getTime() 
      })
      res.send({ result });
    });
  });
});

router.post("/post/productId", checkLoggedIn, (req, res) => {
  User.findById(req.user._id).then(user => {
    if (user.role !== "admin") return;
    return Purchase.findByIdAndUpdate(
      req.body.id,
      { color: "green" },
      { new: true }
    ).then((result) => {
      console.log(result)
    })
  })
});

router.post("/get/productId", checkLoggedIn, (req, res) => {
  User.findById(req.user._id).then(user => {
    if (user.role !== "admin") return;
    return Purchase.findById(req.body.id).then(result => {
    let newColor = result.color
    res.send({ newColor });
  });
});
})

router.get("/check-out", (req, res) => {
  Shop.find({ name: "Vill Appelsin" }).then(result => {
    res.send({ result });
  });
});

router.get("/products", (req, res) => {
  Shop.find().then(result => {
    res.send({ result });
  });
});

router.get("/protected", checkLoggedIn, (req, res) => {
  console.log("USER", req.user);
  res.send({ success: true });
});

router.use("/auth", authRoutes);
router.use("/checkout", checkoutRoutes);

router.use((req, res) => {
  res.status(404).send({ error: "not-found" });
});

module.exports = router;
