const User = require('../models/user');
const jwt = require('jwt-simple');

function tokenForUser(user) {
    const timestamp = new Date().getTime();
    return jwt.encode({ sub: user.id, iat: timestamp }, process.env.JWT_SECRET);
}

exports.signup = async (req, res, next) => {
    const { body: { email, password } } = req;

    if (!email || !password) {
        return res.status(422).send({ error: 'You must provide email and password' });
    }

    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(422).send({ error: 'Email is in use' });
        }
    } catch (err) {
        return next(err);
    }

    try {
        const user = await new User({ email, password }).save();
        return res.json({ token: tokenForUser(user) });

    } catch (err) {
        console.log(err);
        return next(err);
    }

}

exports.signin = (req, res) => {
    const { user } = req;

    res.json({ token: tokenForUser(user) });
}