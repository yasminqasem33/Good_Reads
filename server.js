//installed modules by  => npm i name_modules --save 
const express = require('express')
var bodyParser = require('body-parser')
const bcrypt=require('bcrypt')
const mongoose = require('mongoose')
const adminModel = require('./models/adminModel')
const userModel = require('./models/userModel')
const ROUTER = process.env.ROUTER || 5000;
const expressValidator = require('express-validator');
const keys = require('./config/keys');
const passport = require('passport');
const passportJWT = require('passport-jwt');
const LocalStrategy = require('passport-local');
const cors = require('cors');
var jwt = require('jsonwebtoken');
const MONGO_URL = process.env.MONGO_URL || 'mongodb://localhost:27017/good';
var fs = require('fs');
var multer = require('multer');


//required from other files
const userRouter = require('./routes/userRouter')
const adminRouter = require('./routes/adminRouter')


mongoose.connect(MONGO_URL, {
    autoReconnect: true,
    reconnectTries: Number.MAX_VALUE,
    useNewUrlParser: true
}, (err) => {
    if (!err) {
        console.log("started mongodb connection");
    } else {
        console.log(err);
    }
});
mongoose.Promise = global.Promise;

const app = express()
app.set('view engine','ejs')
app.set('views','views')
app.use(cors());
app.use(passport.initialize());
mongoose.set('useCreateIndex', true);
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(expressValidator());
app.use(bodyParser());
app.use('/admin',adminRouter);
app.use('/',userRouter);
app.use(express.static(__dirname + '/public'));
app.use( express.static('/uploads') );
app.listen(ROUTER,()=>
{
    console.log("Server Started!")

})


app.use(passport.initialize());

const JwtStrategy = passportJWT.Strategy;
const extractJWT = passportJWT.ExtractJwt;

const opt = {
    jwtFromRequest: extractJWT.fromAuthHeaderAsBearerToken(),
    secretOrKey: keys.secretOrKey
}

passport.use(new JwtStrategy(opt, (payload, done) => {
    user.findById(payload._id)
        .then(user => {
            if (user) {
                return done(null, user);
            }
            else {
                return done(null, false)
            }
        })
        .catch(err => {
            console.log(err);
        });

}));

// const storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//         cb(null, './uploads');
//     },
//     filename: function (req, file, cb) {
//         cb(null, new Date().toISOString() + file.originalname);
//     }
// });
// const fileFilter = (req, file, cb) => {
//     if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') 
//         cb(null, true);
//     else 
//         cb(null, false);  
// }
// const upload = multer({
//     storage: storage,
//     limits: {fileSize: 1024 * 1024 * 5},
//     fileFilter: fileFilter
// });

