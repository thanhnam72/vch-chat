var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Room = new Schema({
  roomId: {
    type: String,
    required: true
  },
  userName: {
    type: String,
    unique: true,
    required: true
  },
});

module.exports = mongoose.model('Room', Room);
