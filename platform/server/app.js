var express = require('express');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var expressValidator = require('express-validator');
var config = require('./config');
var app = express();


app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(bodyParser.json());
var cors = require('cors');
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(expressValidator());
var expressJwt = require('express-jwt');
var jwt = require('jsonwebtoken');
var db = require('./api/db');
app.use('/api', expressJwt({
    secret: config.secret
}));


// use it before all route definitions
app.use(cors({
    origin: 'http://localhost:4200'
}));

// Routing
// no auth
var r_no_auth = require('./routes/no_auth');
// with auth
var r_profile = require('./routes/profile');
var r_deployment = require('./routes/deployment');
var r_coordinator = require('./routes/coordinator');

app.use('/', r_no_auth);
app.use('/api/profile', r_profile);
app.use('/api/deployment', r_deployment);
app.use('api/coordinator', r_coordinator);
// End Routing


app.get('/', function (req, res) {
    res.send('HIOT Platform!');
});


app.listen(3000, function () {
    console.log('Platform running on port 3000!');
});
