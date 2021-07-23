const path = require("path");
var bodyParser = require("body-parser");
const express = require("express");
const hbs = require("hbs");
const Profile = require("./models/profileSchema");
const Bet = require("./models/betSchema");
const Outcome = require("./models/outcomeSchema");
const momenttimezone = require("moment-timezone");
const moment = require("moment");
const { API } = require("@callofduty/api");
const percentile = require("percentile");

const AuthController = require("./controller/AuthController");
const session = require("cookie-session");
var flash = require("connect-flash");
const { assert } = require("console");
const { title } = require("process");
const { randomUUID } = require("crypto");

require("./db/mongoose");
require("dotenv").config();

const app = express();
const port = process.env.PORT || 3000;

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

// Setup handlebars engine and views location
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);

// Setup static directory to serve
app.use(express.static(publicDirectoryPath));
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());
app.use(flash());

app.use(
  session({
    secret: "secretkey",
    resave: false,
    saveUninitialized: false,
  })
);

const CallOfDutyAPI = new API();
const xsrf = "PoqIOFB0Y_88i-Wd43BB-Ck2m-XY0j383HHuTNqI6mLLPPy90zcAwE8PLl2IG6c8";
const sso =
  "MTU3MTAyODI1OTQwNjc3NjI4MTU6MTYyODE2NzkxMzQwNjpjNzZhNTNjNWJjNGYzNGY4YTBkYmE2OWJmNTUzMzk4MA";
const atkn =
  "eyJhbGciOiAiQTEyOEtXIiwgImVuYyI6ICJBMTI4R0NNIiwgImtpZCI6ICJ1bm9fcHJvZF9sYXNfMSJ9.b-1PIla58S3hIixRYW1G7Mqwr1qZaG_NXJCfoQXX5l6W45o-ijwIJg.oi8LEDhzF1bgcRWV.sxSI7GvAc_6ksbDd3d0nGDvmYcauFr8JBKSlhYMbK0F72KqRmFFPlG6HztALL64rXEYoZb5jPBUp50Hy5LaxHgJl_IL_OgXoh8J03NKH93aBG-frqBxkH6HobJvDXR8apfUiE1Sj2OIGDj6TLCLRcZLvSTLglvH2m0wmT8pEBPxklTpFGDjCrcyLbJpShnmrLG3ExgHsBZ2QoEkYSu2sdXBZiW-ptendDYBLx2hkeitvcHsgxTx2x2IH_CdyVDQ45p5kdyLWBiU0m3VvjGoVLQHE0c6QRsV0j-BhRIuPyRPdrlgRwHMW0XN_SqpQkrJKTrwaPW2GcJdiUPP1YPWC-aNHuB09kwILCdgmbX0TsQKpLB_0O8uBUa39VtjT7cfi2k0NOnhBg2jCRAwC0fueUkDJ96pj8xSSPQ0Bs2slBgEyGx3R6ZFZ0kVaz6_xXkzj138uwO98vCop5fh1QB2w3suoR5Y.fQvtxaqNmGpCzbAPeqaZQA";
CallOfDutyAPI.UseTokens({ xsrf, sso, atkn });

//const { titleIdentities } = await CallOfDutyAPI.Identity();
//const { username, platform } = titleIdentities.find(identity => identity.title === 'mw')
//console.log(titleIdentities)

app.get("", async (req, res) => {
  try {
    //const { titleIdentities } = await CallOfDutyAPI.Identity();
    //const { username, platform } = titleIdentities.find(identity => identity.title === 'mw')
    //console.log(titleIdentities)
  } catch (Error) {
    console.log(Error);
  }
  res.render("index", {
    title: "ShitOn.gg",
    name: "Jongbin Won",

    flash: req.flash("msg"),
  });
});

app.get("/info", (req, res) => {
  res.render("help", {
    helpText: "This is some helpful text.",
    title: "Info",
  });
});

app.get("/play", async (req, res) => {
  const date = moment.utc().format("MM-DD HH:mm");
  user = await Profile.findOne({ email: req.session.email });
  options = await Outcome.find({ timeStart: { $gt: date } }).sort({
    timeStart: 1,
  });
  if (!req.session.email) {
    res.redirect("/account");
  }
  if (user.codUsername == "") {
    res.redirect("/account");
  } else {
    res.render("play", {
      helpText: "This is some helpful text.",
      title: "Play",
      codAccount: user.codUsername,
      platform: user.codPlatform,
      options: options,
      tokens: user.tokens
    });
  }
});

app.get("/logout", (req, res) => {
  req.session.email = null;
  res.redirect("/");
});

app.get("/account", async (req, res) => {
  if (!req.session.email) {
    res.redirect("/");
  } else {
    user = await Profile.findOne({ email: req.session.email });
    games = await Bet.find({ creatorEmail: req.session.email, status:'no' });
    gamesf = await Bet.find({ creatorEmail: req.session.email, status:'done' });
    if (user.codUsername == "") {
      res.render("account", {
        name: req.session.email,
        title: "Account",
        tokens: user.tokens
      });
    } else {
      res.render("account", {
        name: req.session.email,
        title: "Account",
        codAccount: user.codUsername,
        codPlatform: user.codPlatform,
        tokens: user.tokens,
        games: games,
        gamesf: gamesf 
      });
    }
  }
});

app.get("/tokens", (req, res) => {
  res.render("tokens", {
    helpText: "This is some helpful text.",
    title: "Tokens",
  });
});

app.post("/auth/register", AuthController.register);
app.post("/auth/login", AuthController.login);

app.post("/auth/connect", async (req, res) => {
  try {
    const prof = await CallOfDutyAPI.Profile(
      { username: req.body.id, platform: req.body.platform },
      "wz",
      "mw"
    );
    console.log(prof);
    res.redirect("/account");
  } catch (error) {
    console.log(error);
    res.redirect("/");
  }
});

app.get("/testee", async (req, res) => {
  const count = await Bet.count({});
  const limit = Math.floor(count * 0.6);
  console.log(count, limit);
  await Bet.find({})
    .select("totalScore")
    .sort({ totalScore: 1 })
    .limit(limit)
    .exec(async (err, docs) => {
      const totalScores = docs.map((doc) => doc.totalScore);
      console.log(totalScores);
      const deleted = await Bet.deleteMany({
        totalScore: { $in: totalScores },
      });
      console.log(deleted);
    });
  res.redirect("/account");
});

app.get("/fakedata", async (req, res) => {
  for (let i = 0; i < 20; i++) {
    function getRandomInt(max) {
      return Math.floor(Math.random() * max);
    }
    const random = getRandomInt(5000);
    const em = getRandomInt(50000);
    console.log(random);
    const prof = await Bet.create({
      creatorEmail: "test" + em.toString() + "@gmail.com",
      creatorUsername: "JBW01#3751",
      platform: "battle",
      timeStart: "7-23 10:00",
      timeEnd: "7-23 11:00",
      betAmount: 500,
      totalScore: random,
      status: "no",
    });
  }
  res.redirect("/account");
});


app.post("/auth/claim", async (req, res) => {
  try {
    const timeStart = req.body.timeStart
    const outcome = await Outcome.find({ timeStart: "07-23 11:00" });
    const bet = await Bet.findOne({
      creatorEmail: req.session.email,
      timeStart: timeStart,
    });
    const percentilel = percentile(70, outcome[0].scores);
    if (bet.status == "done") {
      console.log(percentilel, bet.totalScore, bet.status)
      if (bet.totalScore > percentilel) {
        Profile.findOneAndUpdate(
          { email: req.session.email },
          { $inc: { tokens: (bet.betAmount*3) } },
          (req, res, error) => {
            if (error) {
              console.log(error);
            }
          }
        );
        Bet.deleteOne(
            { creatorEmail: req.session.email },
            (req, res, error) => {
              if (error) {
                console.log(error);
              }
            }
        );
        res.redirect("/account");
      } else {
        Bet.deleteOne(
            { creatorEmail: req.session.email },
            (req, res, error) => {
              if (error) {
                console.log(error);
              }
            }
        );
        res.redirect("/account");
      }
    } else {
      res.redirect("/account");
    }
  } catch (err) {
      console.log(err)
      res.redirect("/account");
  }
});

app.post("/auth/bet", async (req, res) => {
  try {
    const balance = await Profile.findOne({email: req.session.email})
    const date2 = moment.utc(req.body.hour).format("MM-DD HH:mm");
    const date3 = moment.utc(date2).add(1, "hours").format("MM-DD HH:mm");
    if(balance>req.body.amount){
        Profile.findOneAndUpdate(
            { email: req.session.email },
            { $inc: { tokens: -req.body.amount} },
            (req, res, error) => {
              if (error) {
                console.log(error);
              }
            }
        );
        const prof = await Bet.create({
            creatorEmail: req.session.email,
            creatorUsername: req.body.username,
            platform: req.body.platform,
            timeStart: date2,
            timeEnd: date3,
            betAmount: req.body.amount,
            totalScore: 0,
            status: "no",
          });
          res.redirect("/account");
    }else{
        res.redirect("/account");
    }
  } catch (error) {
    console.log(error);
    res.redirect("/");
  }
});

app.get("/canU", async (req, res) => {
  //const now = new Date().valueOf()
  //const newt = new Date(Date.UTC(2021, 6, 22, 0, 0, 0)).valueOf()
  Array.prototype.max = function () {
    return Math.max.apply(null, this);
  };

  Array.prototype.min = function () {
    return Math.min.apply(null, this);
  };
  const bets = await Bet.find({});
  try {
    bets.forEach(async (bet) => {
      const prof = await CallOfDutyAPI.MatchHistory(
        { username: bet.creatorUsername, platform: bet.platform },
        "wz",
        "mw",
        0,
        5
      );
      const matches = prof.matches;
      const email = bet.creatorEmail;
      function getRandomInt(max) {
        return Math.floor(Math.random() * max);
      }
      const random = getRandomInt(1000);
      let matcheslist = [];
      matches.forEach((match) => {
        i = match.playerStats.kills;
        if (match.playerStats.teamPlacement > 11) {
          matcheslist.push(i);
        }
        if (
          match.playerStats.teamPlacement < 11 &&
          match.playerStats.teamPlacement > 6
        ) {
          matcheslist.push(5 + i);
        }
        if (match.playerStats.teamPlacement == 6) {
          matcheslist.push(6 + i);
        }
        if (
          match.playerStats.teamPlacement < 6 &&
          match.playerStats.teamPlacement > 1
        ) {
          matcheslist.push(8 + i);
        }
        if (match.playerStats.teamPlacement == 1) {
          matcheslist.push(15 + i);
        }
      });
      console.log(email, matcheslist.max() + random, matcheslist);
      Bet.findOneAndUpdate(
        { creatorEmail: email },
        { totalScore: matcheslist.max() + random, status: "done" },
        (req, res, error) => {
          if (error) {
            console.log(error);
          }
          Outcome.updateOne(
            { timeStart: res.timeStart },
            { $addToSet: { scores: [matcheslist.max() + random] } },
            (req, res, error) => {
              if (error) {
                console.log(error);
              }
            }
          );
        }
      );
    });
    res.redirect("/account");
  } catch (err) {
    console.log(err);
    res.redirect("/account");
  }
});

app.get("*", (req, res) => {
  res.render("404", {
    title: "404",
    errorMessage: "Page not found.",
  });
});

app.listen(port, () => {
  console.log("Server is up on port " + port);
});
