const Profile = require("./models/profileSchema");
const Outcome = require("./models/outcomeSchema");
const moment = require("moment");
const schedule = require("node-schedule");
const Bet = require("./models/betSchema");
const Betp = require("./models/betpSchema");
const betResult = require("./utils/betpResult");
app.use(bodyParser.urlencoded({ extended: true }));
// parse application/json
app.use(bodyParser.json());

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
    const date = moment.utc().format("MM-DD");
    const days = moment.utc().format("MM-DD HH:mm");
    const newtime = date + " " + time;
    console.log(newtime)
    const date2 = moment.utc(newtime).format("MM-DD HH:mm");
    const date3 = moment.utc(date2).add(1, "hours").format("MM-DD HH:mm");
    const date4 = moment.utc(date3).add(15, "m").format("MM-DD HH:mm");
    if (date2 > days) {
      console.log(date2, date3);
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
};
schedule.scheduleJob("0 0 * * *", () => {
  setTournaments();
});




const checkReturn = async () => {
  const date = moment.utc().format("MM-DD HH:mm");
  const bets = await Bet.find({timeEnd: { $lt: date }, status: 'no'});
  if(bets){
    try {
      var itemsProcessed = 0;
      bets.forEach(async (bet) => {
        console.log(bet.status);
        if (bet.status == "no" && bet.timeEnd < date) {
          const year = moment().year();
          const starttime = moment(year + "-" + bet.timeStart).valueOf();
          const endtime = moment(year + "-" + bet.timeEnd).valueOf();
          
          console.log("herer");
          userMatches(bet.creatorEmail, bet.platform, bet.creatorUsername, bet.gameType, async (data) => {
            if(isFinite(data.match) == false){
              await Bet.deleteMany(
                { creatorEmail: data.email, timeEnd: bet.timeEnd })
                
            }else{
              await Bet.updateMany(
                { creatorEmail: data.email },
                { totalScore: data.match, status: "done" })
            }
          });
          itemsProcessed++;
          if(itemsProcessed === bets.length) {
            console.log('ey');
          }
        } else {
          res.redirect("/account");
        }
        res.redirect("/account");
      });


    } catch (err) {
      console.log(err);
      res.redirect("/account");
    }
  }else{
    console.log('none finished')
  }
  
};
setInterval(checkReturn, 60000);


const checkDeletes = async () => {
  var date = moment.utc().format("MM-DD HH:mm");
  const bettodelete = await Bet.deleteMany({ timeDelete: { $gt: date } });
  const bettodelete = await Betp.deleteMany({ timeDelete: { $gt: date } });
  if (!bettodelete) {
    console.log("no stray bets");
  }
};
setInterval(checkDeletes, 60000);



const personalBets = async () => {
  var date = moment.utc().format("MM-DD HH:mm");
  const bets = await Betp.find({ timeEnd: outcome.timeEnd,  });
  if (bets) {
    betResult(bets.creatorUsername, bets.opponentUsername)
  }else{
    console.log("no stray personal bets");
  }
};
setInterval(personalBets, 60000);