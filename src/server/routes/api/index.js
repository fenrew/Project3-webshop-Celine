const express = require("express");
const router = express.Router();
const Shop = require("../../models/Shop");
const User = require("../../models/User");
const Events = require("../../models/Events");
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
    let userRole = result.role
    res.send({ result, userRole });
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
        return new Date(b.date).getTime() - new Date(a.date).getTime();
      });
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
    ).then(result => {
      console.log(result);
    });
  });
});

router.post("/get/productId", checkLoggedIn, (req, res) => {
  User.findById(req.user._id).then(user => {
    if (user.role !== "admin") return;
    return Purchase.findById(req.body.id).then(result => {
      let newColor = result.color;
      res.send({ newColor });
    });
  });
});

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

//-------------------------- BLOG -------------------------//
const request = require("request");
const cheerio = require("cheerio");

let url = "http://www.celineheldrup.no/";

router.get("/blog", (req, res) => {
  request(url, function(err, resp, body) {
    var $ = cheerio.load(body);
    let headerOne = $(".entry-title").eq(0);
    let headerTwo = $(".entry-title").eq(1);
    let headerThree = $(".entry-title").eq(2);
    let headerOneText = headerOne.text();
    let headerTwoText = headerTwo.text();
    let headerThreeText = headerThree.text();
    let paragraphOne = $(".entry-content").eq(0).find("p").eq(0);
    let paragraphOneText = paragraphOne.text();
    let paragraphTwo = $(".entry-content").eq(1).find("p").eq(0);
    let paragraphTwoText = paragraphTwo.text();
    let paragraphThree = $(".entry-content").eq(2).find("p").eq(0);
    let paragraphThreeText = paragraphThree.text();
    let imgOne = $(".entry-content img").attr('src');
    // let imgOneText = imgOne.text();
    let imgTwo = $(".entry-content").eq(1).find("img").eq(0).attr('src');
    // let imgTwoText = imgTwo.text();
    let imgThree = $(".entry-content").eq(2).find("img").eq(0).attr('src')
    res.send({
      headerOneText,
      paragraphOneText,
      imgOne,
      headerTwoText,
      paragraphTwoText,
      imgTwo,
      headerThreeText,
      paragraphThreeText,
      imgThree,
    });
  });
});

//---------------

//--------------- EVENT -------------//

router.get("/user/admin", (req, res) => {
  User.findById(req.user._id).then(user => {
    if (user.role !== "admin") {
      let response = false
      res.send({response})
    }
    if (user.role === "admin") {
      let response = true
      res.send({response})
    }
  })
})

router.get("/all/events", (req, res) => {
  Events.find().then((events) => {
    res.send({events});
  })
})

router.post("/events", (req, res) => {
  User.findById(req.user._id).then(user => {
    if (user.role !== "admin") return;
    let eventInfo = req.body.eventInfo
    const newEvent = Events({
      fromTime: eventInfo.fromTime,
      toTime: eventInfo.toTime,
      header: eventInfo.header,
      oneliner: eventInfo.oneliner,
      info: eventInfo.info,
      img: eventInfo.img,
    })
    newEvent.save();
    res.send(true)
  })
})

router.post("/remove/event", (req, res) => {
  User.findById(req.user._id).then(user => {
    if (user.role !== "admin") return;
    console.log(req.body)
    Events.findByIdAndDelete(req.body.removedElement._id).then((result) => {
      res.send(true)
    })
  })
})

//---------------

router.use("/auth", authRoutes);
router.use("/checkout", checkoutRoutes);

router.use((req, res) => {
  res.status(404).send({ error: "not-found" });
});

module.exports = router;
