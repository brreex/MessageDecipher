var express = require('express');
var router = express.Router();
var crypto = require('crypto');

router.get('/', function (req, res, next) {
    var dbconnection = req.app.locals.db;
    dbconnection.bind('homework7');
    dbconnection.homework7.findOne({}, function (err, data) {
        if (err) {
            throw err;
        }
        else {
            res.render('message', { message: decrypt(data.message, 'aes256', 'asaadsaad') })
            console.log('message is : ' + decrypt(data.message, 'aes256', 'asaadsaad'));
        }
    });
    console.log('db ' + dbconnection);

});

function decrypt(text, algorithm, password) {
    var decipher = crypto.createDecipher(algorithm, password)
    var dec = decipher.update(text, 'hex', 'utf8')
    dec += decipher.final('utf8');
    return dec;
}

module.exports = router;