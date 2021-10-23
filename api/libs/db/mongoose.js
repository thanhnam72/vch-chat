var mongoose = require('mongoose');
var libs = process.cwd() + '/libs/';
var log = require(libs + 'log')(module);
var config = require(libs + 'config');

mongoose.connect(config.get('mongoose:uri'), { useNewUrlParser: true });
  
var db = mongoose.connection;
  
db.on('error', function (err) {
  console.log('Connection error:', err.message);
});

db.once('open', function callback () {
  console.log("Connected to DB!");
});

module.exports = mongoose;