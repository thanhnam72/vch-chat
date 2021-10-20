
var mysql=require('mysql');
var connection=mysql.createPool({
 
	host:'localhost',
 	user:'root',
 	password:'',
 	database:'demo01'
 
});
module.exports=connection;