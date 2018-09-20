const express = require("express");
const router = express.Router();
const Shop = require("../../models/Shop");

const authRoutes = require("./auth");
const { userMiddleware, checkLoggedIn } = require("../../utils/middleware");

router.use(userMiddleware);

router.get("/", (req, res) => {
  res.send({ hello: true });
});

router.get("/models", (req, res) => {
})

router.get("/check-out", (req, res) => {
  Shop.find({ name: "Vill Appelsin" }).then(result => {
    res.send({ result });
  });
});

router.get("/products", (req, res) => {
  Shop.find().then(result => {
    res.send({result})
  })
})

router.get("/protected", checkLoggedIn, (req, res) => {
  console.log("USER", req.user);
  res.send({ success: true });
});

router.use("/auth", authRoutes);

router.use((req, res) => {
  res.status(404).send({ error: "not-found" });
});

module.exports = router;
