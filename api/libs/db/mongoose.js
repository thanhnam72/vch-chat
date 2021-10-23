var mongoose = require('mongoose');
var libs = process.cwd() + '/libs/';
var log = require(libs + 'log')(module);
var config = require(libs + 'config');
console.log(config.get('mongoose:uri'));

mongoose.connect(config.get('mongoose:uri'), { useNewUrlParser: true });
  
var db = mongoose.connection;
  
db.on('error', function (err) {
  log.error('Connection error:', err.message);
});

db.once('open', function callback () {
  log.info("Connected to DB!");
});

module.exports = mongoose;