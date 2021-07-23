const mongoose = require("mongoose");
const betSchema = new mongoose.Schema({
  creatorEmail: { type: String, required: true },
  creatorUsername: { type: String, required: true},
  platform: {type: String, required: true},
  timeStart: { type: String, required: true },
  timeEnd: { type: String, required: true },
  /*outcomeID: { type: String, required: true },*/
  betAmount: { type: Number, required: true },
  totalScore:{ type: Number, default: 0, required: true },
  status: { type: String, required: true },
});
const Bet = mongoose.model("Bet", betSchema);

module.exports = Bet;
