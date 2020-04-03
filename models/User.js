const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const UserSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  image: {
    type: String
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  },
  POST: {
    type: String,
    required: true
  },
  updates: [{ type: Schema.Types.ObjectId, ref: 'updates' }],
  leaves: [{ type: Schema.Types.ObjectId, ref: 'Leaves' }],
  dailyUpdates: [{ type: Schema.Types.ObjectId, ref: 'DailyUpdates' }]
});

module.exports = User = mongoose.model('users', UserSchema);
