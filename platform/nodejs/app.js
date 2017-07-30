var express = require('express');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var expressValidator = require('express-validator');
var db = require('./api/db');
var app = express();

//routing
var r_deployment = require('./routes/deployment');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(expressValidator());
app.get('/', function (req, res) {
    res.send('Hello World!');
});
app.use('/deployment', r_deployment);
app.listen(3000, function () {
    console.log('Example app listening on port 3000!');
});
