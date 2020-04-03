const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const LeaveSchema = new Schema({
  date: { type: String, required: true },
  No_of_days: {
    type: Number,
    required: true
  },
  reason: {
    required: true,
    type: String
  },
  submitted_on: {
    type: Date,
    default: Date.now
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  }
});
module.exports = User = mongoose.model('Leaves', LeaveSchema);
