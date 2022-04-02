const mongoose = require("mongoose");
const betpSchema = new mongoose.Schema({
  /*creatorEmail: { type: String, required: true },*/
  creatorUsername: { type: String, required: true},
  platform: {type: String, required: true},
  opponentUsername: { type: String, required: true},
  opponentplatform: {type: String, required: true},
  timeStart: { type: String, required: true },
  timeEnd: { type: String, required: true },
  /*outcomeID: { type: String, required: true },*/
  betAmount: { type: Number, required: true },
  totalScore:{ type: Number, default: 0, required: true },
  totalScoreO:{ type: Number, default: 0, required: true },
  status: { type: String, required: true },
  gameType: { type: String, required: true },
  timeDelete: { type: String, required: true },
});
const Betp = mongoose.model("Betp", betpSchema);

module.exports = Betp;
