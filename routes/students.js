var express = require('express');
var router = express.Router();

// Przykładowa lista studentów
var students = [
    { name: 'Kamil', surname: 'Wolny', age: 44 },
    { name: 'Maria', surname: 'Nowak', age: 24 }
];

// Trasa GET do pobrania listy studentów
router.get('/', function(req, res, next) {
    res.json(students);
});


module.exports = router;
