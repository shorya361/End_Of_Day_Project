const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UpdateSchema = new Schema({
  date: { type: Date, default: Date.now },

  total_Calls: {
    type: Number,
    required: true
  },
  calls_received: {
    type: Number,
    required: true
  },
  calls_not_received: {
    type: Number,
    required: true
  },
  response: [
    {
      type: String
    }
  ],
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  }
});
module.exports = User = mongoose.model('updates', UpdateSchema);
