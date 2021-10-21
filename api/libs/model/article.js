var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// Article
var Message = new Schema({
	userName: {
		type: String,
		required: true
	},
	content: { 
    type: String,
    required: true 
  }
});

var RoomMessage = new Schema({
	roomId: { type: String, required: true },
	messages: [Message],
});

module.exports = mongoose.model('RoomMessage', Article);