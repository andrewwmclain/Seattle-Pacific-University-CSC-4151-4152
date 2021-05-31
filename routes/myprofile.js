var express = require('express');
//const session = require('express-session')
//const bodyParser = require('body-parser')
//const path = require('path')
var router = express.Router();
//let User = require('../models/User.js');
//var username;
//var bio;

/* GET home page. */
/*
router.post('/'
    ,bodyParser.urlencoded({ extended: true })
    ,(req,res,next)=>
    {
        username = document.getElementById("head_username").value;
        User
            .find({"username": username})
            res.render('myprofile.html', {root: 'views', username: req.session.username, bio: bio})

        //res.render('myprofile.html', {root: 'views', username: req.session.username})

});
*/
router.get('/', function(req, res, next) {
    res.render('myprofile.html', {root: 'views', username: req.session.username, firstname: req.session.firstname,
        lastname: req.session.lastname, bio: req.session.bio, langExp: req.session.langExp, langLearn: req.session.langLearn,
        overallFluency: (req.session.overallFluency).toPrecision(2),
        pronunciation: req.session.pronunciation.toPrecision(2),
        conversationalAbility: req.session.conversationalAbility.toPrecision(2),
        listening: req.session.listening.toPrecision(2),
        speaking: req.session.speaking.toPrecision(2)
    })
});

module.exports = router;
