const Profile = require("../models/profileSchema");
const { API } = require("@callofduty/api");
const Outcome = require("../models/outcomeSchema");
const Betp = require("../models/betpSchema");

const betResult = (username, opponentname) => {
    const CallOfDutyAPI = new API({ xsrf, sso, atkn });
    var date = moment.utc().format("MM-DD HH:mm");
    const bet = await Betp.findOne({ timeEnd: outcome.timeEnd, creatorUsername: username, opponentUsername: opponentname});
      try {
        Array.prototype.max = function () {
          return Math.max.apply(null, this);
        };
        Array.prototype.min = function () {
          return Math.min.apply(null, this);
        };
          const starttime = moment(bet.timeStart).valueOf();
          const endtime = moment(bet.timeEnd).valueOf();
          const prof = await CallOfDutyAPI.MatchHistory(
            { username: bet.creatorUsername, platform: bet.platform },
            "wz",
            "mw",
            endtime,
            5
          );
          const prof2 = await CallOfDutyAPI.MatchHistory(
            { username: bet.opponentUsername, platform: bet.opponentplatform },
            "wz",
            "mw",
            endtime,
            5
          );
          const matches = prof.matches;
          const username = bet.creatorUsername;
          let matcheslist = [];
          const matches2 = prof2.matches;
          let matcheslist2 = [];
          matches.forEach((match) => {
            if (
              (starttime/1000) < match.utcStartSeconds && match.mode == bet.gameType
            ) {
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
            }
          });
          matches2.forEach((match) => {
            if (
              (starttime/1000) < match.utcStartSeconds && match.mode == bet.gameType
            ) {
              i = match.playerStats.kills;
              console.log(i, match.playerStats.teamPlacement);
              if (match.playerStats.teamPlacement > 11) {
                matcheslist2.push(i);
              }
              if (
                match.playerStats.teamPlacement < 11 &&
                match.playerStats.teamPlacement > 6
              ) {
                matcheslist2.push(5 + i);
              }
              if (match.playerStats.teamPlacement == 6) {
                matcheslist2.push(6 + i);
              }
              if (
                match.playerStats.teamPlacement < 6 &&
                match.playerStats.teamPlacement > 1
              ) {
                matcheslist2.push(8 + i);
              }
              if (match.playerStats.teamPlacement == 1) {
                matcheslist2.push(15 + i);
              }
            }
          });
          console.log(email, matcheslist.max(), matcheslist);
          Betp.findOneAndUpdate(
            { creatorUsername: username },
            { totalScore: matcheslist.max(), totalScore0: matcheslist2.max(),  status: "done" },
            (req, res, error) => {
              if (error) {
                console.log(error);
              }
          }
          );
        res.redirect("/account");
      } catch (err) {
        console.log(err);
        res.redirect("/account");
      }
      const deleted = await Outcome.deleteMany({ timeEnd: { $lt: date } });
};

module.exports = betResult;