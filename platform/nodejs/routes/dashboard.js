var express = require('express')
var router = express.Router()

router.get('/db', function (req, res) {
    res.send('dashboard in here');
});



module.exports = router;
