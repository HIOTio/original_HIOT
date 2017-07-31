var express = require('express');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var expressValidator = require('express-validator');

var _ = require("lodash");
var jwt = require('jsonwebtoken');
var passport = require("passport");
var passportJWT = require("passport-jwt");
var ExtractJwt = passportJWT.ExtractJwt;
var JwtStrategy = passportJWT.Strategy;
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
var db = require('./api/db');
var Profile = require('./controllers/profile');


var jwtOptions = {}
jwtOptions.jwtFromRequest = ExtractJwt.fromAuthHeader();
jwtOptions.secretOrKey = config.secret;

var strategy = new JwtStrategy(jwtOptions, function (jwt_payload, next) {
	Profile.find_by_id(jwt_payload.id, function (err, user) {
		if (this) {
			next(null, this);
		} else {
			next(null, false);
		}
	});
});
passport.use(strategy);
app.use(passport.initialize());

app.use('/api', passport.authenticate('jwt', {
	session: false
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
var r_aggregator = require('./routes/aggregator');

app.use('/', r_no_auth);
app.use('/api/profile', r_profile);
app.use('/api/deployment', r_deployment);
app.use('/api/coordinator', r_coordinator);
app.use('/api/aggregator', r_aggregator);
// End Routing


app.get('/', function (req, res) {
	res.send('HIOT Platform!');
});


app.listen(3000, function () {
	console.log('Platform running on port 3000!');
});
