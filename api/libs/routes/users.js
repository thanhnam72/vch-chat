var express = require('express');
var passport = require('passport');
var Users = require('../model/user');
var router = express.Router();

var libs = process.cwd() + '/libs/';

var db = require(libs + 'db/mysql');

router.get('/all', passport.authenticate('bearer', { session: false }),
    function(req, res) {

        Users.getAllUser(function(err,rows){
            if(err){
                res.json(err);
            } else {
                res.json(rows);
            }

        });

    }
);

module.exports = router;