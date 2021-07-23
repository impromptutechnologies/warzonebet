const mongoose = require("mongoose");

const outcomeSchema = new mongoose.Schema({
  timeStart: { type: String, required: true },
  timeEnd: { type: String, required: true },
  scores: []
});


const Outcome = mongoose.model("Outcome", outcomeSchema);

module.exports = Outcome;
