var express = require('express');
var router = express.Router();
var jsonwebtoken = require('jsonwebtoken');

var users = [
  { username: 'user1', password: 'password1' }
];

router.post('/login', function(req, res) {
    if (!req.body.username) {
        res.status(400).send('potrzeba nazwy użytkownika');
        return;
    }
    if (!req.body.password) {
        res.status(400).send('potrzeba jeszcze hasła');
        return;
    }

    var user = users.find(u => u.username === req.body.username);
    if (user && user.password === req.body.password) {
        var token = jsonwebtoken.sign({ username: req.body.username }, 'secret');
        res.status(200).json(token);
    } else {
        res.status(401).send('błędne hasło');
    }
});

module.exports = router;
