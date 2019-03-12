var jwt = require('jsonwebtoken');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var JwtStrategy = require('passport-jwt').Strategy;
var ExtractJwt = require('passport-jwt').ExtractJwt;
var userModel=require('./models/userModel')
const key = require('./config/keys');



exports.local = passport.use(userModel.createStrategy());
passport.serializeUser(userModel.serializeUser());
passport.deserializeUser(userModel.deserializeUser());

exports.getToken = function(user) {
    return jwt.sign(user,key.secretOrKey ,
        {expiresIn: 3600});    
};

var opt = {};
opt.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opt.secretOrKey = key.secretOrKey;
exports.jwtPassport = passport.use(new JwtStrategy(opt,
    (jwt_payload, done) => {
        console.log("JWT payload: ", jwt_payload);
        User.findOne({_id: jwt_payload._id}, (err, user) => {
            if (err) {
                return done(err, false);
            }
            else if (user) {
                return done(null, user);
            }
            else {
                return done(null, false);
            }
        });
    }));
    
    exports.verifyUser = passport.authenticate('jwt', {session: false});


   


