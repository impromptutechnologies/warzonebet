const mongoose = require("mongoose");

const outcomeSchema = new mongoose.Schema({
  timeStart: { type: String, required: true },
  timeEnd: { type: String, required: true },
  timeCheck: { type: String, required: true },
  bronze: [],
  silver: [],
  diamond: [],
  gameType: { type: String, required: true },
});


const Outcome = mongoose.model("Outcome", outcomeSchema);

module.exports = Outcome;
