let express = require('express');
let router = express.Router();
// For the Data Model
// let Message = require('../models/Message.js');


function HandleError(response, reason, message, code){
    console.log('ERROR: ' + reason);
    response.status(code || 500).json({"error:": message});
}

router.get('/', (req, res) => {
    if(!req.session.username){
        res.redirect('/');
    }
    // Message.find({},(err, messages)=> {
        // res.send(messages);
        // res.sendFile('messenger.html', {root: 'views'});
        // res.render('messenger.html', {root: 'views' /* , username: req.oidc.user.name */});
    res.render('messenger.html', {root: 'views' , username: req.session.username});
    // })
})

// router.post('/', (req, res) => {
//     let message = new Message(req.body);
//     message.save((err) =>{
//         if(err)
//             sendStatus(500);
//         res.sendStatus(200);
//     })
// })

module.exports = router;