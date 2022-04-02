const path = require("path");
var bodyParser = require("body-parser");
const express = require("express");
const hbs = require("hbs");
const Profile = require("./models/profileSchema");
const Bet = require("./models/betSchema");
const Betp = require("./models/betpSchema");
const winLoss = require("./utils/winLoss")
const Outcome = require("./models/outcomeSchema");
const momenttimezone = require("moment-timezone");
const moment = require("moment");
const { API } = require("@callofduty/api");
const percentile = require("percentile");
var request = require("request");

const userMatches = require("./utils/userMatches");
const AuthController = require("./controller/AuthController");
const session = require("cookie-session");
var flash = require("connect-flash");
const { assert } = require("console");
const { title } = require("process");
const { randomUUID } = require("crypto");
const { ConnectionStates } = require("mongoose");

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
app.use(bodyParser.urlencoded({ extended: true }));
// parse application/json
app.use(bodyParser.json());
app.use(flash());
app.use(express.json());
app.use(
  session({
    secret: "secretkey",
    resave: false,
    saveUninitialized: false,
  })
);

/*const CallOfDutyAPI = new API();
const xsrf = "PoqIOFB0Y_88i-Wd43BB-Ck2m-XY0j383HHuTNqI6mLLPPy90zcAwE8PLl2IG6c8";
const sso =
  "MTU3MTAyODI1OTQwNjc3NjI4MTU6MTY0NDYxODc4ODc3MzpkMDc1MWRhMmQwMzNmYzQ2OGY2NzZmOWE2ZWYyMGExMw";
const atkn =
  "eyJhbGciOiAiQTEyOEtXIiwgImVuYyI6ICJBMTI4R0NNIiwgImtpZCI6ICJ1bm9fcHJvZF9sYXNfMSJ9.KhY0nID8TK0ACxkIj9EJrZ1g04gyrDPYSKM441w3Uh4Nk9uG2_XOiA.SuXGY7FVG-gA1qVM.5IWjFAtgD5VGSG5CjQwMBkcKkbDuRD-44vGTp4FSa5OUgxHxc8KR8VFMbtGH-rU9tUAAGy0KcFhBB0-UYo1yGDPRVpnE9m9eD_R-NYjK4mheBJIDxy73_TEQOTahJjjkaVr_4_Yd-GbQZ1ms3ZDDuHuYqK5ky4ovBSte4GA9HQYSFF2CB0rWeiQnuBJ6MFDFz-YxnJYUytV7Lnqi1OCdBBs8YGwiKvnl3ew0hcxOj1JZr5_eDagvPybiMO4AsfSelrXs5IL2YX4gEGxhHq6adRXRC56yYAfB-iJUC--UhEriFnmQkGK8TTpR4lPaycE_-vXupfGt6HnpLgMf0TkDZvvJWk-u2z6TCF4rz5EOcQPvuSoDbVZZWewGLfgjOp2COr1JYpqTDqF1EWCdhcXN6bHNJJi2OaNMpklZkcWXDU0qE6nr5E5MJBIsCtyimZkjOayv9W6kG9lgwbqUi9U5nBJrHeDqnQ.Cn8y2hEvBvpqGesxaQgwjA";
CallOfDutyAPI.UseTokens({ xsrf, sso, atkn });*/

//const { titleIdentities } = await CallOfDutyAPI.Identity();
//const { username, platform } = titleIdentities.find(identity => identity.title === 'mw')
//console.log(titleIdentities)


app.get("/needed", (req, res) => {
  var request = require("request");
  /*var options = {
      'method': 'GET',
      'url': 'https://s.activision.com/activision/login',
      'headers': {
      }
    };*/
  var options = {
    method: "POST",
    url: "https://s.activision.com/do_login?new_SiteId=activision",
    headers: {
      Cookie:
        "XSRF-TOKEN=yiSgnTFaAiOBpK9Dme062puBvns-cDXfBcj5SRZnAZKMKpmKJPKEessZzCHjyqYm; new_SiteId=activision;",
    },
    form: {
      username: "Jongbin1010@gmail.com",
      password: "Jongbin1",
      remember_me: "true",
      _csrf: "yiSgnTFaAiOBpK9Dme062puBvns-cDXfBcj5SRZnAZKMKpmKJPKEessZzCHjyqYm",
    },
  };
  request(options, function (error, response) {
    if (error) throw new Error(error);
    console.log(response.body);
  });
  res.render("help", {
    helpText: "This is some helpful text.",
    title: "Info",
  });
});

app.get("/net", (req, res) => {
  console.log("hello");
  var request = require("request");
  var options = {
    method: "POST",
    url: "https://s.activision.com/do_login?new_SiteId=activision",
    headers: {
      Cookie:
        "XSRF-TOKEN=yiSgnTFaAiOBpK9Dme062puBvns-cDXfBcj5SRZnAZKMKpmKJPKEessZzCHjyqYm; new_SiteId=activision;",
    },
    form: {
      username: "Jongbin1010@gmail.com",
      password: "Jongbin1",
      remember_me: "true",
      _csrf: "yiSgnTFaAiOBpK9Dme062puBvns-cDXfBcj5SRZnAZKMKpmKJPKEessZzCHjyqYm",
    },
  };
  request(options, function (error, response) {
    if (error) throw new Error(error);
    console.log(response);
  });
  res.render("help", {
    helpText: "This is some helpful text.",
    title: "Info",
  });
});

app.get("/settourno", (req, res) => {
  times = [
    "02:00",
    "03:00",
    "04:00",
    "05:00",
    "06:00",
    "07:00",
    "08:00",
    "09:00",
    "10:00",
    "11:00",
    "12:00",
    "14:00",
    "15:00",
    "16:00",
    "17:00",
    "18:00",
    "19:00",
    "20:00",
    "21:00",
    "22:00",
    "23:00",
  ];
  times.forEach(async (time) => {
    const date = moment.utc().format("MM-DD");
    const newtime = date + " " + time;
    const date2 = moment.utc(newtime).format("MM-DD HH:mm");
    const date3 = moment.utc(date2).add(1, "hours").format("MM-DD HH:mm");
    const date4 = moment.utc(date3).add(15, "m").format("MM-DD HH:mm");
    console.log(time, date, newtime, date2, date3, date4);
    if (date2) {
      await Outcome.create({
        timeStart: date2,
        timeEnd: date3,
        timeCheck: date4,
        gameType: "br_brsolo",
      });
      await Outcome.create({
        timeStart: date2,
        timeEnd: date3,
        timeCheck: date4,
        gameType: "br_brduos",
      });
      await Outcome.create({
        timeStart: date2,
        timeEnd: date3,
        timeCheck: date4,
        gameType: "br_brtrios",
      });
    }
  });

  return res.redirect("/play");
});


app.get("/logout", (req, res) => {
  req.session.email = null;
  res.redirect("/");
});


app.get("/tokens", (req, res) => {
  res.render("tokens", {
    title: "Tokens",
  });
});

app.get("/profff", async (req, res) => {
  //bet = await Bet.findOne({creatorEmail:'jongbin1010@gmail.com'})
  //const end = moment.utc("2022-01-22 05:00").valueOf();
  //const start = moment.utc('2021-07-22 04:00').valueOf();

  var options = {
    method: "GET",
    url: `https://my.callofduty.com/api/papi-client/crm/cod/v2/title/mw/platform/battle/gamer/${encodeURIComponent('JBW01#3751')}/matches/wz/start/0/end/0/details`,
    headers: {
      Cookie:
        "ACT_SSO_COOKIE=MTU3MTAyODI1OTQwNjc3NjI4MTU6MTY0NDYxODc4ODc3MzpkMDc1MWRhMmQwMzNmYzQ2OGY2NzZmOWE2ZWYyMGExMw; ACT_SSO_COOKIE_EXPIRY=1591153892430; atkn=eyJhbGciOiAiQTEyOEtXIiwgImVuYyI6ICJBMTI4R0NNIiwgImtpZCI6ICJ1bm9fcHJvZF9sYXNfMSJ9.KhY0nID8TK0ACxkIj9EJrZ1g04gyrDPYSKM441w3Uh4Nk9uG2_XOiA.SuXGY7FVG-gA1qVM.5IWjFAtgD5VGSG5CjQwMBkcKkbDuRD-44vGTp4FSa5OUgxHxc8KR8VFMbtGH-rU9tUAAGy0KcFhBB0-UYo1yGDPRVpnE9m9eD_R-NYjK4mheBJIDxy73_TEQOTahJjjkaVr_4_Yd-GbQZ1ms3ZDDuHuYqK5ky4ovBSte4GA9HQYSFF2CB0rWeiQnuBJ6MFDFz-YxnJYUytV7Lnqi1OCdBBs8YGwiKvnl3ew0hcxOj1JZr5_eDagvPybiMO4AsfSelrXs5IL2YX4gEGxhHq6adRXRC56yYAfB-iJUC--UhEriFnmQkGK8TTpR4lPaycE_-vXupfGt6HnpLgMf0TkDZvvJWk-u2z6TCF4rz5EOcQPvuSoDbVZZWewGLfgjOp2COr1JYpqTDqF1EWCdhcXN6bHNJJi2OaNMpklZkcWXDU0qE6nr5E5MJBIsCtyimZkjOayv9W6kG9lgwbqUi9U5nBJrHeDqnQ.Cn8y2hEvBvpqGesxaQgwjA;",
    },
    params: {
      limit: '10',
    }
  };
  request(options, function (error, response, body) {
    if (error) throw new Error(error);
    const x = body.toString()
        const bob = JSON.parse(x)
        const matcheslist = [];
        console.log(bob.data.summary.all.kills)
    res.render("tokens", {
      helpText: "This is some helpful text.",
      title: "Tokens",
    });
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
    battleStats = prof.lifetime.mode.br.properties;
    KDscore = battleStats.kdRatio;
    played = battleStats.gamesPlayed;
    TENscore = (battleStats.topTen / played) * 100;
    FIVEscore = (battleStats.topFive / played) * 120;
    wins = (battleStats.wins / played) * 150;
    score = KDscore * (TENscore + FIVEscore + wins);
    if (0 < score && score < 36) {
      Profile.findOneAndUpdate(
        { email: req.session.email },
        {
          skillLevel: "bronze",
          codUsername: req.body.id,
          codPlatform: req.body.platform,
        },
        (req, res, error) => {
          if (error) {
            console.log(error);
          }
        }
      );
    }
    if (35 < score && score < 68) {
      Profile.findOneAndUpdate(
        { email: req.session.email },
        {
          skillLevel: "silver",
          codUsername: req.body.id,
          codPlatform: req.body.platform,
        },
        (req, res, error) => {
          if (error) {
            console.log(error);
          }
        }
      );
    }
    if (score > 67) {
      Profile.findOneAndUpdate(
        { email: req.session.email },
        {
          skillLevel: "diamond",
          codUsername: req.body.id,
          codPlatform: req.body.platform,
        },
        (req, res, error) => {
          if (error) {
            console.log(error);
          }
        }
      );
    }
    res.redirect("/account");
  } catch (error) {
    console.log(error);
    res.redirect("/");
  }
});

app.post("/auth/pbet", async (req, res) => {
  try {
    const balance = await Profile.findOne({ email: req.session.email });
    const balance2 = await Profile.findOne({
      codUsername: req.body.opponentusername,
    });
    const betpexist2 = await Betp.findOne({
      opponentUsername: req.body.opponentusername,
    });
    const betpexist1 = await Betp.findOne({
      creatorUsername: req.body.username,
    });
    const betpexist3 = await Betp.findOne({
      opponentUsername: req.body.username,
    });
    const betpexist4 = await Betp.findOne({
      creatorUsername: req.body.opponentusername,
    });
    if (
      balance > req.body.amount &&
      balance2 &&
      balance2 > req.body.amount &&
      !betpexist2 &&
      !betpexist1 &&
      !betpexist3 &&
      !betpexist4
    ) {
      Profile.findOneAndUpdate(
        { email: req.session.email },
        { $inc: { tokens: -req.body.amount } },
        (req, res, error) => {
          if (error) {
            console.log(error);
          }
        }
      );
      Profile.findOneAndUpdate(
        { codUsername: req.body.opponentusername },
        { $inc: { tokens: -req.body.amount } },
        (req, res, error) => {
          if (error) {
            console.log(error);
          }
        }
      );
      const prof = await Betp.create({
        creatorEmail: req.session.email,
        creatorUsername: req.body.username,
        platform: req.body.platform,
        timeStart: "null",
        timeEnd: "null",
        betAmount: req.body.amount,
        totalScore: 0,
        status: "no",
        skillLevel: balance.skillLevel,
        gameType: req.body.gametype,
        timeDelete: "null",
        opponentUsername: req.body.opponentusername,
        opponentplatform: req.body.opponentplatform,
        totalScoreO: 0,
      });
      res.redirect("/play");
    } else {
      res.redirect("/play");
    }
  } catch (error) {
    console.log(error);
    res.redirect("/");
  }
});

app.post("/auth/accept", (req, res) => {
  const date = moment.utc().format("MM-DD HH:mm");
  const date3 = moment.utc(date).add(1, "hours").format("MM-DD HH:mm");
  const date4 = moment.utc(date3).add(1, "days").format("MM-DD HH:mm");
  console.log(date, date3, date4);
  Betp.findOneAndUpdate(
    { creatorUsername: req.body.creatorUsername },
    { timeStart: date, timeEnd: date3, timeDelete: date4 },
    (req, res, error) => {
      if (error) {
        console.log(error);
      }
    }
  );
  res.redirect("/play");
});







app.get("", async (req, res) => {
  try {
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
  try {
    const user = await Profile.findOne({ email: req.session.email });
    if (!req.session.email) {
      res.redirect("/account");
    }
    if (!user.codUsername) {
      res.redirect("/account");
    } else {
      const date = moment.utc().format("MM-DD HH:mm");
      const options = await Outcome.find({
        //timeStart: { $gt: date },
        gameType: "br_brsolo",
      }).sort({
        timeStart: 1,
      });
      const challenge = await Betp.find({
        opponentUsername: user.codUsername,
        timeStart: { $eq: "null" },
      });
      res.render("play", {
        helpText: "This is some helpful text.",
        title: "Play",
        codAccount: user.codUsername,
        platform: user.codPlatform,
        options: options,
        tokens: user.tokens,
        challenge: challenge,
      });
    }
  } catch (err) {
    console.log(err);
    res.redirect("/account");
  }
});



app.get("/account", async (req, res) => {
  console.log(req.session.email);
  if (!req.session.email) {
    res.redirect("/");
  } else {
    user = await Profile.findOne({ email: req.session.email });
    games = await Bet.find({ creatorEmail: req.session.email, status: "no" });
    gamesf = await Bet.find({
      creatorEmail: req.session.email,
      status: "won",
    });
    if (user.codUsername == "") {
      res.render("account", {
        name: req.session.email,
        title: "Account",
        tokens: user.tokens,
      });
    } else {
      res.render("account", {
        name: req.session.email,
        title: "Account",
        codAccount: user.codUsername,
        codPlatform: user.codPlatform,
        tokens: user.tokens,
        games: games,
        gamesf: gamesf,
      });
    }
  }
});


app.post("/auth/bet", async (req, res) => {
  try {
    const balance = await Profile.findOne({ email: req.session.email });
    const date2 = moment.utc(req.body.hour).format("MM-DD HH:mm");
    const date3 = moment.utc(date2).add(1, "hours").format("MM-DD HH:mm");
    const date4 = moment.utc(date3).add(1, "days").format("MM-DD HH:mm");
    if (balance > req.body.amount) {
      Profile.findOneAndUpdate(
        { email: req.session.email },
        { $inc: { tokens: -req.body.amount } },
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
        skillLevel: balance.skillLevel,
        gameType: req.body.gametype,
        timeDelete: date4,
      });
      res.redirect("/account");
    } else {
      res.redirect("/account");
    }
  } catch (error) {
    console.log(error);
    res.redirect("/");
  }
});

app.get("/fakedata", async (req, res) => {
  for (let i = 0; i < 100; i++) {
    function getRandomInt(max) {
      return Math.floor(Math.random() * max);
    }
    const random = getRandomInt(5000);
    const em = getRandomInt(50000);
    const tiers = [500, 1000, 1500];
    const rannum = getRandomInt(3);
    const prof = await Bet.create({
      creatorEmail: "test" + em.toString() + "@gmail.com",
      creatorUsername: "JBW01#3751",
      platform: "battle",
      timeStart: "01-29 05:00",
      timeEnd: "01-29 06:00",
      betAmount: tiers[rannum],
      totalScore: random,
      status: "no",
      skillLevel: "bronze",
      gameType: "br_brsolo",
      timeDelete: "07-29 11:00",
    });
  }
  for (let i = 0; i < 100; i++) {
    function getRandomInt(max) {
      return Math.floor(Math.random() * max);
    }
    const random = getRandomInt(5000);
    const em = getRandomInt(50000);
    const tiers = [500, 1000, 1500];
    const rannum = getRandomInt(3);
    const prof = await Bet.create({
      creatorEmail: "test" + em.toString() + "@gmail.com",
      creatorUsername: "JBW01#3751",
      platform: "battle",
      timeStart: "01-29 05:00",
      timeEnd: "01-29 06:00",
      betAmount: tiers[rannum],
      totalScore: random,
      status: "no",
      skillLevel: "bronze",
      gameType: "br_brduos",
      timeDelete: "07-26 11:00",
    });
  }
  for (let i = 0; i < 100; i++) {
    function getRandomInt(max) {
      return Math.floor(Math.random() * max);
    }
    const random = getRandomInt(5000);
    const em = getRandomInt(50000);
    const tiers = [500, 1000, 1500];
    const rannum = getRandomInt(3);
    const prof = await Bet.create({
      creatorEmail: "test" + em.toString() + "@gmail.com",
      creatorUsername: "JBW01#3751",
      platform: "battle",
      timeStart: "01-29 05:00",
      timeEnd: "01-29 06:00",
      betAmount: tiers[rannum],
      totalScore: random,
      status: "no",
      skillLevel: "bronze",
      gameType: "br_brtrios",
      timeDelete: "07-26 11:00",
    });
  }
  res.redirect("/account");
});

app.get("/casnU", async (req, res) => {
  const date = moment.utc().format("MM-DD HH:mm");
  const bets = await Bet.find({timeEnd: { $lt: date }, status: 'no'});
  if(bets){
    try {
      bets.forEach(async (bet) => {
        if (bet.status == "no" && bet.timeEnd < date) {
          const year = moment().year();
          const starttime = moment(year + "-" + bet.timeStart).valueOf();
          const endtime = moment(year + "-" + bet.timeEnd).valueOf();
          function getRandomInt(max) {
            return Math.floor(Math.random() * max);
          }
          userMatches(bet.creatorEmail, bet.timeEnd, bet.platform, bet.creatorUsername, bet.gameType, async (data) => {
            if(isFinite(data.match) == false){
              await Bet.deleteMany(
                { creatorEmail: data.email, timeEnd: data.timeEnd })
            }else{
              await Bet.updateOne(
                { creatorEmail: data.email },
                { totalScore: data.match, status: "done" })
            }});
            
        }
      });
      res.redirect("/account");
    } catch (err) {
      console.log(err);
      res.redirect("/account");
    }
  }
  res.redirect("/account");
  
});

app.get("/winlosss", async (req, res) => {
  winLoss(async (data) => {
    console.log(data);
    await Bet.updateMany(
      { betAmount: 500, totalScore: { $gt: data.matchlist1solo }, status: "done", gameType: "br_brsolo" },
      { status: "won" }
    );
    await Bet.updateMany(
      { betAmount: 1000, totalScore: { $gt: data.matchlist2solo }, status: "done", gameType: "br_brsolo" },
      { status: "won" }
    );
    await Bet.updateMany(
      { betAmount: 1500, totalScore: { $gt: data.matchlist3solo }, status: "done", gameType: "br_brsolo" },
      { status: "won" }
    );
    await Bet.updateMany(
      { betAmount: 500, totalScore: { $gt: data.matchlist1duo }, status: "done", gameType: "br_brduos" },
      { status: "won" }
    );
    await Bet.updateMany(
      { betAmount: 1000, totalScore: { $gt: data.matchlist2duo }, status: "done", gameType: "br_brduos" },
      { status: "won" }
    );
    await Bet.updateMany(
      { betAmount: 1500, totalScore: { $gt: data.matchlist3duo }, status: "done", gameType: "br_brduos" },
      { status: "won" }
    );
    await Bet.updateMany(
      { betAmount: 500, totalScore: { $gt: data.matchlist1trio }, status: "done", gameType: "br_brtrios" },
      { status: "won" }
    );
    await Bet.updateMany(
      { betAmount: 1000, totalScore: { $gt: data.matchlist2trio }, status: "done", gameType: "br_brtrios" },
      { status: "won" }
    );
    await Bet.updateMany(
      { betAmount: 1500, totalScore: { $gt: data.matchlist3trio }, status: "done", gameType: "br_brtrios" },
      { status: "won" }
    );
    await Bet.deleteMany(
      { status: "done"  }
    );
    
    res.redirect('/account')

  });
});

app.post("/auth/claim", async (req, res) => {
  try {
    const timeStart = req.body.timeStart;
    const betAmount = req.body.betAmount;
    /*const outcome = await Outcome.find({
      timeStart: timeStart,
      gameType: req.body.gametype,
    });*/
    const bet = await Bet.deleteOne({
      creatorEmail: req.session.email,
      timeStart: timeStart,
    });
    const prof = await Profile.updateOne({
      email: req.session.email,
    }, {$inc: {tokens: betAmount*1.78}});
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

/*


/*await Bet.deleteMany(
      { betAmount: 1000, totalScore: { $lte: data.matchlist2 }, status: "done" }
    );
    await Bet.deleteMany(
      { betAmount: 1500, totalScore: { $lte: data.matchlist3 }, status: "done" }
    );*/

    /*bet.forEach(async (stock) => {
      console.log(stock.Code, stock.change, data)
      if (stock.change > data) {
           Bet.updateMany(
            { Code: stock.Code, totalScore },
            { status: 'won', percentile: data}, (req, res) => {
              console.log(res)
              res.redirect("/account");
            });
  
        } else {
           
              
        }
      })*/
/*if (res.skillLevel == "silver") {
              Outcome.updateOne(
                { timeStart: res.timeStart, gameType: res.gameType },
                { $addToSet: { silver: [matcheslist.max() + random] } },
                (req, res, error) => {
                  if (error) {
                    console.log(error);
                  }
                }
              );
            }
            if (res.skillLevel == "diamond") {
              Outcome.updateOne(
                { timeStart: res.timeStart, gameType: res.gameType },
                { $addToSet: { diamond: [matcheslist.max() + random] } },
                (req, res, error) => {
                  if (error) {
                    console.log(error);
                  }
                }
              );
            }*/

/*app.get("/testee", async (req, res) => {
  const count = await Bet.count({});
  const limit = Math.floor(count * 0.6);
  await Bet.find({})
    .select("totalScore")
    .sort({ totalScore: 1 })
    .limit(limit)
    .exec(async (err, docs) => {
      const totalScores = docs.map((doc) => doc.totalScore);
      const deleted = await Bet.deleteMany({
        totalScore: { $in: totalScores },
      });
    });
  res.redirect("/account");
});*/

/*const prof = await CallOfDutyAPI.MatchHistory(
          { username: bet.creatorUsername, platform: bet.platform },
          "wz",
          "mw",
          endtime,
          10
        );
        console.log(prof);
        const matches = prof.matches;*/





/*
if (req.body.skilllevel == "bronze") {
        const percentilel = percentile(70, outcome[0].bronze);
        console.log(percentilel, bet.totalScore);
        if (bet.totalScore > percentilel) {
          Profile.findOneAndUpdate(
            { email: req.session.email },
            { $inc: { tokens: bet.betAmount * 3 } },
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
      }
      if (req.body.skilllevel == "silver") {
        const percentilel = percentile(70, outcome[0].silver);
        if (bet.totalScore > percentilel) {
          Profile.findOneAndUpdate(
            { email: req.session.email },
            { $inc: { tokens: bet.betAmount * 3 } },
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
      }

      if (req.body.skilllevel == "diamond") {
        const percentilel = percentile(70, outcome[0].diamond);
        if (bet.totalScore > percentilel) {
          Profile.findOneAndUpdate(
            { email: req.session.email },
            { $inc: { tokens: bet.betAmount * 3 } },
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
      }*/




      /*

              /*Outcome.updateMany(
                { timeStart: res.timeStart, gameType: res.gameType },
                {
                  $addToSet: { [res.skillLevel]: [data.match] },
                },
                (req, res, error) => {
                  if (error) {
                    console.log(error);
                  }
                }
              );*/