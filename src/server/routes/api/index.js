const express = require("express");
const router = express.Router();
const Shop = require("../../models/Shop");
const User = require("../../models/User");
const Events = require("../../models/Events");
const Purchase = require("../../models/Purchase");
const Blogpost = require("../../models/Blogpost");
const Sale = require("../../models/Sale")
const upload = require('../../utils/upload')

const authRoutes = require("./auth");
const checkoutRoutes = require("./checkout");
const { userMiddleware, checkLoggedIn } = require("../../utils/middleware");

const util = require('util')

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

router.post("/shop/cart/remove", (req, res) => {
  const user = req.body.user;
  User.findByIdAndUpdate(
    user._id,
    { shoppingCart: [] },
    { new: true }
  ).then(result => {
    console.log(result)
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

//---------------------- CREATE BLOG POST -----------------------//
router.post("/blog-post", (req, res) => {
  let blogInfo = req.body;
  let files = req.files;
  let arrayOfUrls = [];
  // console.log("UTILS",util.inspect(req.body, {showHidden: false, depth: null}))
  // for(var key in files) {
  //   // upload(files[key]).then((url) => {
  //   //   console.log("URL", url)
  //   //   arrayOfUrls.push(url)
  //   // })
  // }
  // User.findById(req.user._id).then(user => {
  //   if(user.role !== "admin") return
  //   console.log("Array OF URLS2", arrayOfUrls)
  //   return req.files && req.files.picture ? upload(req.files.picture) : Promise.resolve()
  // }).then(pictureUrl => {
  //   console.log("PICTUREURL", pictureUrl)
  //     const newBlog = Blogpost({
  //      header: blogInfo.header,
  //      oneliner: blogInfo.oneliner,
  //      info: blogInfo.info,
  //      mainPicture: pictureUrl,
  //      date: new Date,
  //    })
  //     newBlog.save();
  //     res.send(true)
  // })

  User.findById(req.user._id).then(user => {
    if(user.role !== "admin") return
    console.log("Array OF URLS2", arrayOfUrls)
    console.log("PICTURE", req.files.picture)
    console.log(files[Object.keys(files)[0]])
    return req.files && req.files[Object.keys(req.files)[0]] ? upload(files[Object.keys(files)[0]]) : Promise.resolve()
  }).then(pictureUrl => {
    arrayOfUrls.push(pictureUrl)
    console.log("PICTUREURL", pictureUrl)
    return req.files && req.files[Object.keys(req.files)[1]] ? upload(req.files[Object.keys(req.files)[1]]) : Promise.resolve()
  }).then(pictureUrl2 => {
    arrayOfUrls.push(pictureUrl2)
    console.log("PICTUREURL2", pictureUrl2)
    console.log("ARRAY", arrayOfUrls)
    return req.files && req.files[Object.keys(req.files)[2]] ? upload(req.files[Object.keys(req.files)[2]]) : Promise.resolve()
  }).then(pictureUrl3 => {
    arrayOfUrls.push(pictureUrl3)
    console.log("ARRAY", arrayOfUrls)
    return req.files && req.files[Object.keys(req.files)[3]] ? upload(req.files[Object.keys(req.files)[3]]) : Promise.resolve()
}).then(pictureUrl4 => {
  arrayOfUrls.push(pictureUrl4)
  console.log("ARRAY", arrayOfUrls)
  return req.files && req.files[Object.keys(req.files)[4]] ? upload(req.files[Object.keys(req.files)[4]]) : Promise.resolve()
}).then(pictureUrl5 => {
  arrayOfUrls.push(pictureUrl5)
  console.log("ARRAY", arrayOfUrls)
  return req.files && req.files[Object.keys(req.files)[5]] ? upload(req.files[Object.keys(req.files)[5]]) : Promise.resolve()
}).then(pictureUrl5 => {
  arrayOfUrls.push(pictureUrl5)
  console.log("ARRAY", arrayOfUrls)
      const newBlog = Blogpost({
       header: blogInfo.header,
       oneliner: blogInfo.oneliner,
       info: blogInfo.info,
       mainPicture: arrayOfUrls[blogInfo.numberOfImages],
       img: arrayOfUrls,
       date: new Date,
     })
      newBlog.save();
      res.send(true)
})
})

router.get("/latest/blogposts", (req,res) => {
  Blogpost.find().then(posts => {
    posts.reverse()
    res.send({posts})
  })
})

//---------------

//----------- CREATE SALE -----------//

router.post("/create-sale", (req, res) => {
  User.findById(req.user._id).then(user => {
    if(user.role !== "admin") return
    console.log(req.body.header)
    const newSale = Sale({
      header: req.body.header,
      text: req.body.text,
    })
    newSale.save(),
    res.send(true)
  })
})

router.get("/sale", (req,res) => {
  Sale.find().then(sale => {
    sale.reverse();
    res.send(sale[0])
  })
})

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
