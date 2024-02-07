import express from "express";
import bodyParser from "body-parser";
import session from "express-session";
import { v4 as uuid } from 'uuid';

const app = express();
const port = 3400;

app.use(
  session({
    secret: 'your-secret-key',
    resave: false,
    saveUninitialized: true,
    genid: function(req) {
      return uuid();
    },
  })
);

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));


app.get("/", (req, res) => {
  res.render("home.ejs");
});


app.get("/calculator", regenerateSession, (req, res) => {
  renderPage(req, res, "cal.ejs");
});

app.get("/cal", regenerateSession, (req, res) => {
  renderPage(req, res, "cal.ejs");
});

app.post("/cal", (req, res) => {
  req.session.number = req.body.number;
  req.session.days = req.body.nod;
  renderPage(req, res, "cal.ejs");
});

app.get("/intake", regenerateSession, (req, res) => {
  renderPage(req, res, "daily_feed.ejs");
});

app.get("/daily-feed", regenerateSession, (req, res) => {
  renderPage(req, res, "daily_feed.ejs");
});

app.post("/daily-feed", (req, res) => {
  req.session.numberd = req.body.number1;
  req.session.countd = req.body.count1;
  renderPage(req, res, "daily_feed.ejs");
});

app.get("/number", regenerateSession, (req, res) => {
    renderPage(req, res,"number.ejs");
});
app.get("/number1", regenerateSession, (req, res) => {
  renderPage(req, res,"number.ejs");
});

app.post("/number1", (req, res) => {
  req.session.fintake = req.body.fintake3;
  req.session.fcount = req.body.fcount3;
  renderPage(req, res, "number.ejs");
});

app.get("/biomass", regenerateSession, (req, res) => {
  renderPage(req, res,"biomass.ejs");
});
app.get("/biomass1", regenerateSession, (req, res) => {
  renderPage(req, res,"biomass.ejs");
});
app.post("/biomass1", (req, res) => {
  req.session.number4 = req.body.bnumber4;
  req.session.count4 = req.body.bcount4;
  renderPage(req, res, "biomass.ejs");
});

function renderPage(req, res, template) {
  const number = req.session.number || "";
  const days = req.session.days || "";
  const numberd = req.session.numberd || "";
  const countd = req.session.countd || "";
  const fintake = req.session.fintake || "";
  const fcount = req.session.fcount || "";
  const number4 = req.session.number4 || "";
  const count4 =req.session.count4 || "";
  res.render(template, { number, days, numberd, countd, fintake, fcount, number4, count4 });
}

function regenerateSession(req, res, next) {
  req.session.regenerate((err) => {
    if (err) {
      console.error("Error during session regeneration:", err);
      return res.status(500).send("Internal Server Error");
    }
    next();
  });
}

app.get("/whitegut", (req, res) => {
  res.render("whitegut.ejs");
});

app.get("/ehp", (req, res) => {
  res.render("ehp.ejs");
});

app.get("/blackgills", (req, res) => {
  res.render("blackgill.ejs");
});

app.get("/bodycramps", (req, res) => {
  res.render("bodycramp.ejs");
});

app.get("/privacy_policy", (req, res) => {
  res.render("privacy_policy.ejs");
});

app.get("/career", (req, res) => {
  res.render("career.ejs");
});

app.get("/about", (req, res) => {
  res.render("about.ejs");
});

app.get("/disease", (req, res) => {
  res.render("disease.ejs");
});

app.get("/weather", (req, res) => {
  res.render("weather.ejs");
});

app.get("/market", (req, res) => {
  res.render("market.ejs");
});









app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});