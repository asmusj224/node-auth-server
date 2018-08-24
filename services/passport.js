const passport = require('passport');
const User = require('../models/user');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const LocalStrategy = require('passport-local');
const validate = require('../utils/jwt');
require('dotenv').config();


const localLogin = new LocalStrategy({ usernameField: 'email' }, async (email, password, done) => {
    try {
        const existingUser = await User.findOne({ email });
        if (!existingUser) {
            return done(null, false);
        }

        existingUser.comparePassword(password, (err, isMatch) => {
            if (err) {
                return done(err);
            }
            if (!isMatch) {
                return done(null, false);
            }

            return done(null, existingUser);
        });

    } catch (err) {
        return done(err);
    }

});

const jwtOptions = {
    jwtFromRequest: ExtractJwt.fromHeader('authorization'),
    secretOrKey: process.env.JWT_SECRET
};

const jwtLogin = new JwtStrategy(jwtOptions, (payload, done) => {
    validate.validateToken(payload, (err, user) => {
        if (err) {
            return done(err, false);
        }

        if (user) {
            return done(null, user);
        }

        done(null, false);
    });
});

passport.use(jwtLogin);
passport.use(localLogin);