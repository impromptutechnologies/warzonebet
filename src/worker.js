const Profile = require("./models/profileSchema");
const Outcome = require("./models/outcomeSchema");
const moment = require("moment");
const schedule = require("node-schedule");
const Bet = require("./models/betSchema");
const { API } = require("@callofduty/api");

require("./db/mongoose");


const setTournaments = () => {
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
    console.log(time);
    const date = moment.utc().format("MM-DD");
    const days = moment.utc().format("MM-DD HH:mm");
    const newtime = date + " " + time;
    const date2 = moment.utc(newtime).format("MM-DD HH:mm");
    const date3 = moment.utc(date2).add(1, "hours").format("MM-DD HH:mm");
    if(date2 > days){
      console.log(date2, date3);
      await Outcome.create({ timeStart: date2, timeEnd: date3});
    }
  
  });
};
//schedule.scheduleJob("0 0 * * *", () => {
  //setTournaments();
//});
setTournaments();

const checkReturn = async () => {
  const CallOfDutyAPI = new API({ xsrf, sso, atkn });
  var date = moment.utc().format("MM-DD HH:mm");
  const outcome = await Outcome.findOne({ timeEnd: { $lt: date } });
  if (!outcome) {
    console.log("no finished matches across the board");
  } else {
    console.log(outcome);
    const bets = await Bet.find({ timeEnd: outcome.timeEnd });
    try {
      Array.prototype.max = function() {
        return Math.max.apply(null, this);
      };
      Array.prototype.min = function() {
        return Math.min.apply(null, this);
      };  
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
        let matcheslist = [];
        matches.forEach((match) => {
          i = match.playerStats.kills;
          console.log(i, match.playerStats.teamPlacement);
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
        console.log(email, matcheslist.max(), matcheslist);
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
    const deleted = await Outcome.deleteMany({ timeEnd: { $lt: date } });
  }

};
//setInterval(checkReturn, 60000);
