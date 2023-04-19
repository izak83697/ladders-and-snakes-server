const mongoose = require("mongoose");
const GemeSchem = mongoose.Schema({
    name1: { type: String },
    ScoreGeme: { type: Number},
    Turn: { type: Boolean}
})
module.exports = mongoose.model('Score', GemeSchem);