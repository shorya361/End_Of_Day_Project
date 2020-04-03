const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UpdateSchema = new Schema({
  date: { type: Date, default: Date.now },

  task_input: {
    type: String,
    required: true
  },
  total_working_hour: {
    type: Number,
    required: true
  },
  work_description: {
    type: String,
    required: true
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  }
});
module.exports = User = mongoose.model('DailyUpdates', UpdateSchema);
