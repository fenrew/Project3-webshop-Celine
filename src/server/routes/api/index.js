const express = require("express");
const router = express.Router();
const Shop = require("../../models/Shop");
const User = require("../../models/User")

const authRoutes = require("./auth");
const checkoutRoutes = require("./checkout");
const { userMiddleware, checkLoggedIn } = require("../../utils/middleware");

router.use(userMiddleware);

router.get("/", (req, res) => {
  res.send({ hello: true });
});

router.get("/models", (req, res) => {
  const newProductOne = Shop({
  name: "Vill Appelsin",
  price: 50,
  stock: true,
   image: "url('wild-orange.1bdbdb4c.png')",   
   info: "Vill Appelsin er full av antioksidanter og kan virke oppløftende emosjonelt og fysisk i kroppen. Den kan også dempe engstelige følelser samt dempe høy puls ved å støtte hjertet.",
});
newProductOne.save();

const newProductTwo = Shop({
  name: "Lavendel",
  price: 10,
  stock: true,
 image: "url('lavender.5d7b2790.png')",      
 info: "Lavendel virker avslappende på kroppen og er dermed ypperlig for å fremme søvn. Oljen har den egenkapen at den er lindrende for irritert hud, og er super for vonde muskler."
});
newProductTwo.save();

const newProductThree = Shop({
  name: "Oregano",
  price: 30,
  stock: true,
 image: "url('oregano.e9a963d2.png')",       
 info: "Oregano har kraftfulle anioksidanter som støtter immunsystemet og luftveiene. Oljen har også dene egenskapen av å kunne fjerne vanskelige flekker."
});
newProductThree.save();

const newProductFour = Shop({
  name: "Peppermynte",
  price: 100,
  stock: true,
 image: "url('peppermint.a938653e.png')",    
 info: "Peppermynte er oppkvikkende og støtter luftveier og pusten. Den lindrer stive muskler og virker avkjølende og behagelig. Oljen støtter også hodeplager, og sammen med Rosmarin og Frankincense er de en super kombinasjon for fokus og konsentrasjon."
});
newProductFour.save();

const newProductFive = Shop({
  name: "Sitron",
  price: 400,
  stock: true,
 image: "url('lemon.48757a11.png')",
 info: "Sitron kan virke rensende og avgiftende ved å støtte fordøyelsen og leveren. Ved å drikke ett glass med vann og 1 dråpe sitron om morgenen vil det gi en super start på dagen. Kan kombineres med Vill Appelsin for et naturlig vaskemiddel."
});
newProductFive.save();

const newProductSix = Shop({
  name: "Frankincense",
  price: 200,
  stock: true,
  image: "url('frankincense.9ce16d4b.png')",  
  info: "Frankincense kan virke cellefornyende og aniinflammatorisk. Oljen støtter immunsystemet og roer ned nervesystemet. Dette gjør at Frankincense utmerket til å fremme dyp konsentrasjon og følelsen av fred."
});
newProductSix.save();

const newProductSeven = Shop({
  name: "Rosmarin",
  price: 200,
  stock: true,
 image: "url('rosemary.c59334fb.png')",  
   info: "De tre ordene som beskriver Rosmarin oljen best er Fokus, Innlæring, og Konsentrasjon! Rosmarin er ypperlig ved inntak av ny kunnskap og nye utfordringer. Rosmarin demper nervøsitet og virker oppkvikkende."
});
newProductSeven.save();

const newProductEight = Shop({
  name: "On Guard",
  price: 200,
  stock: true,
 image: "url('on-guard.ac775d25.png')",
 info: "On Guard er en blanding av Vill Appelsin, Clove, Kanel, Eucalyptus og Rosmarin, en perfekt kombinasjon for å stimulere immunsystemet. Oljen kan beskrives som naturens svar på antibac, og virker i tillegg energisk og oppløftende."
});
newProductEight.save();

const newProductNine = Shop({
  name: "Digest Zen",
  price: 140,
  stock: true,
 image: "url('digest-zen.6c48f870.png')",    
 info: "Digest Zen er en blanding av fenikkel, Karve, Ingefær, Korriander, Peppermynte og Anis. Dette er en kombinasjon som støtter fordøyelsen of er spesifikt rettet for fordøyelsesproblemer. Kan også dempe oppblåsthet, gass, sporadiske fordøyelsesbesvær, kvalme, og bidra til å fordøye tunge måltider."
});
newProductNine.save();
})

router.get("/shop/user", (req, res) => {
  User.findById(req.user._id).then((result) => {
    res.send({result})
  })
})

router.post("/shop/cart", (req, res) => {
  const user = req.body.user;
  User.findByIdAndUpdate(user._id, {shoppingCart: user.shoppingCart}, {new:true}).then((result) => {
    result.save();
  })
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
router.use("/checkout", checkoutRoutes);

router.use((req, res) => {
  res.status(404).send({ error: "not-found" });
});

module.exports = router;