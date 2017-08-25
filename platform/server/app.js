var express = require('express')
var cookieParser = require('cookie-parser')
var bodyParser = require('body-parser')
var expressValidator = require('express-validator')

var _ = require('lodash')
var jwt = require('jsonwebtoken')
var passport = require('passport')
var passportJWT = require('passport-jwt')
var ExtractJwt = passportJWT.ExtractJwt
var JwtStrategy = passportJWT.Strategy
var config = require('./config')
var app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded())
app.use(bodyParser.json())
var cors = require('cors')
app.use(bodyParser.urlencoded({
  extended: false
}))
app.use(expressValidator())
var expressJwt = require('express-jwt')
var db = require('./api/db')
var Profile = require('./controllers/profile')

var jwtOptions = {}
jwtOptions.jwtFromRequest = ExtractJwt.fromAuthHeader()
jwtOptions.secretOrKey = config.secret

var strategy = new JwtStrategy(jwtOptions, function (jwt_payload, next) {
  Profile.find_by_id(jwt_payload.id, function (err, user) {
    if (this) {
      next(null, this)
    } else {
      next(null, false)
    }
  })
})
passport.use(strategy)
app.use(cors({
  origin: 'http://localhost:4200'
}))
app.use(passport.initialize())

app.use('/api', passport.authenticate('jwt', {
  session: false
}))

// use it before all route definitions

// Routing
// no auth
var r_no_auth = require('./routes/no_auth')
// with auth
var r_aggregator = require('./routes/aggregator')
var r_broker = require('./routes/broker')
var r_controller = require('./routes/controller')
var r_controller_command = require('./routes/controller_command')
var r_coordinator = require('./routes/coordinator')
var r_coordinator_groups = require('./routes/coordinator_groups')
var r_dashboard = require('./routes/dashboard')
var r_deployment = require('./routes/deployment')
var r_deployment_role = require('./routes/deployment_role')
var r_device = require('./routes/device')
var r_device_configuration = require('./routes/device_configuration')
var r_device_make = require('./routes/device_make')
var r_device_model = require('./routes/device_model')
var r_groups = require('./routes/groups')
var r_health = require('./routes/health')
var r_location = require('./routes/location')
var r_param = require('./routes/param')
var r_platform = require('./routes/platform')
var r_profile = require('./routes/profile')
var r_publication = require('./routes/publication')
var r_role = require('./routes/role')
var r_sensor = require('./routes/sensor')
var r_sensor_reading = require('./routes/sensor_reading')
var r_sensor_types = require('./routes/sensor_types')
var r_subscription = require('./routes/subscription')
var r_thing = require('./routes/thing')
var r_topic = require('./routes/topic')
var r_navigation = require('./routes/navigation')

app.use('/', r_no_auth)
app.use('/api/aggregator', r_aggregator)
app.use('/api/broker', r_broker)
app.use('/api/controller', r_controller)
app.use('/api/controller_command', r_controller_command)
app.use('/api/coordinator', r_coordinator)
app.use('/api/coordinator_groups', r_coordinator_groups)
app.use('/api/dashboard', r_dashboard)
app.use('/api/deployment', r_deployment)
app.use('/api/deployment_role', r_deployment_role)
app.use('/api/device', r_device)
app.use('/api/device_configuration', r_device_configuration)
app.use('/api/device_make', r_device_make)
app.use('/api/device_model', r_device_model)
app.use('/api/groups', r_groups)
app.use('/api/health', r_health)
app.use('/api/location', r_location)
app.use('/api/param', r_param)
app.use('/api/platform', r_platform)
app.use('/api/profile', r_profile)
app.use('/api/publication', r_publication)
app.use('/api/role', r_role)
app.use('/api/sensor', r_sensor)
app.use('/api/sensor_reading', r_sensor_reading)
app.use('/api/sensor_types', r_sensor_types)
app.use('/api/subscription', r_subscription)
app.use('/api/thing', r_thing)
app.use('/api/topic', r_topic)
app.use('/api/navigation', r_navigation)
// End Routing

app.get('/', function (req, res) {
  res.send('HIOT Platform!')
})

app.listen(3000, function () {
  console.log('Platform running on port 3000!')
})
