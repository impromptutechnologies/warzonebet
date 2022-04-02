const Profile = require("../models/profileSchema");
const { API } = require("@callofduty/api");
const Outcome = require("../models/outcomeSchema");
const Betp = require("../models/betpSchema");
var request = require("request");

const userMatches = (email, timeEnd, platform, creatorUsername, gametype, callback) => {
    function getRandomInt(max) {
        return Math.floor(Math.random() * max);
      }
    var options = {
        method: "GET",
        url: `https://my.callofduty.com/api/papi-client/crm/cod/v2/title/mw/platform/${platform}/gamer/${encodeURIComponent(creatorUsername)}/matches/wz/start/0/end/0/details`,
        headers: {
          Cookie:
            "ACT_SSO_COOKIE=MTU3MTAyODI1OTQwNjc3NjI4MTU6MTY0NDYxODc4ODc3MzpkMDc1MWRhMmQwMzNmYzQ2OGY2NzZmOWE2ZWYyMGExMw; ACT_SSO_COOKIE_EXPIRY=1591153892430; atkn=eyJhbGciOiAiQTEyOEtXIiwgImVuYyI6ICJBMTI4R0NNIiwgImtpZCI6ICJ1bm9fcHJvZF9sYXNfMSJ9.KhY0nID8TK0ACxkIj9EJrZ1g04gyrDPYSKM441w3Uh4Nk9uG2_XOiA.SuXGY7FVG-gA1qVM.5IWjFAtgD5VGSG5CjQwMBkcKkbDuRD-44vGTp4FSa5OUgxHxc8KR8VFMbtGH-rU9tUAAGy0KcFhBB0-UYo1yGDPRVpnE9m9eD_R-NYjK4mheBJIDxy73_TEQOTahJjjkaVr_4_Yd-GbQZ1ms3ZDDuHuYqK5ky4ovBSte4GA9HQYSFF2CB0rWeiQnuBJ6MFDFz-YxnJYUytV7Lnqi1OCdBBs8YGwiKvnl3ew0hcxOj1JZr5_eDagvPybiMO4AsfSelrXs5IL2YX4gEGxhHq6adRXRC56yYAfB-iJUC--UhEriFnmQkGK8TTpR4lPaycE_-vXupfGt6HnpLgMf0TkDZvvJWk-u2z6TCF4rz5EOcQPvuSoDbVZZWewGLfgjOp2COr1JYpqTDqF1EWCdhcXN6bHNJJi2OaNMpklZkcWXDU0qE6nr5E5MJBIsCtyimZkjOayv9W6kG9lgwbqUi9U5nBJrHeDqnQ.Cn8y2hEvBvpqGesxaQgwjA;",
        },
        params: {
          limit: '10',
        }
      };

      request(options, function (error, response, body) {
        Array.prototype.max = function () {
            return Math.max.apply(null, this);
          };
          Array.prototype.min = function () {
            return Math.min.apply(null, this);
          };
        if (error) throw new Error(error);
        const x = body.toString()
        const bob = JSON.parse(x)
        const matcheslist = [];
        console.log(platform, creatorUsername, bob.data.summary.all.kills)
        bob.data.matches.forEach((match) => {
          const i = match.playerStats.kills;
          //console.log(i, match.playerStats.teamPlacement, match.mode, match.utcStartSeconds, bet.timeEnd, endtime);
          //&& (starttime/1000) < match.utcStartSeconds
          if (match.mode == gametype) {
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
        /*if(matcheslist != )*/
        callback({creator: creatorUsername, match: (matcheslist.max()+getRandomInt(100)), email, timeEnd });
        
    });
};

module.exports = userMatches;