const request = require("request");
const Bet = require("../models/betSchema");

const percentile = require("percentile");

const moment = require("moment-timezone");


const winLoss = async (callback) => {
    Array.prototype.max = function () {
      return Math.max.apply(null, this);
    };
    Array.prototype.min = function () {
      return Math.min.apply(null, this);
    };
    const betStock = await Bet.find({status:"done"});
    let matchlist1solo = [];
    let matchlist1duo = [];
    let matchlist1trio = [];
    let matchlist2solo = [];
    let matchlist2duo = [];
    let matchlist2trio = [];
    let matchlist3solo = [];
    let matchlist3duo = [];
    let matchlist3trio = [];
    betStock.forEach((bet) => {
      if(bet.betAmount == 500 && bet.gameType == "br_brsolo"){
        matchlist1solo.push(bet.totalScore);
      }
      if(bet.betAmount == 500 && bet.gameType == "br_brduos"){
        matchlist1duo.push(bet.totalScore);
      }
      if(bet.betAmount == 500 && bet.gameType == "br_brtrios"){
        matchlist1trio.push(bet.totalScore);
      }
      if(bet.betAmount == 1000 && bet.gameType == "br_brsolo"){
        matchlist2solo.push(bet.totalScore);
      }
      if(bet.betAmount == 1000 && bet.gameType == "br_brduos"){
        matchlist2duo.push(bet.totalScore);
      }
      if(bet.betAmount == 1000 && bet.gameType == "br_brtrios"){
        matchlist2trio.push(bet.totalScore);
      }
      if(bet.betAmount == 1500 && bet.gameType == "br_brsolo"){
        matchlist3solo.push(bet.totalScore);
      }
      if(bet.betAmount == 1500 && bet.gameType == "br_brduos"){
        matchlist3duo.push(bet.totalScore);
      }
      if(bet.betAmount == 1500 && bet.gameType == "br_brtrios"){
        matchlist3trio.push(bet.totalScore);
      }
        //console.log(i, match.playerStats.teamPlacement, match.mode, match.utcStartSeconds, bet.timeEnd, endtime);
        //&& (starttime/1000) < match.utcStartSeconds    
    })  
    
    callback({
      matchlist1solo: percentile(50, matchlist1solo),
      matchlist1duo: percentile(50, matchlist1duo),
      matchlist1trio: percentile(50, matchlist1trio), 
      matchlist2solo: percentile(50, matchlist2solo),
      matchlist2duo: percentile(50, matchlist2duo),
      matchlist2trio: percentile(50, matchlist2trio),
      matchlist3solo: percentile(50, matchlist3solo),
      matchlist3duo: percentile(50, matchlist3duo),
      matchlist3trio: percentile(50, matchlist3trio),
    });

    /*betStock.forEach((stock) => {
        if (stock.change > percentilel) {
             betStockDaySchema.findOneAndUpdate(
              { customerID: stock.customerID },
              { status: 'won'  }, (req, res) => {
                console.log(res)
              });
          } else {
             betStockDaySchema.findOneAndUpdate(
                { customerID: stock.customerID },
                { status: 'lost'  }, (req, res) => {
                  console.log(res)
                });
          }

    })*/
   
};
        


module.exports = winLoss;