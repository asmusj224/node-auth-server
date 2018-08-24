const passport = require('passport');
const Auth = require('./controllers/auth');
require('./services/passport');

const requireAuth = passport.authenticate('jwt', { session: false });
const requireSignin = passport.authenticate('local', { session: false });

module.exports = (app) => {
    app.get('/', requireAuth, (req, res) => {
        res.send('hello');
    });
    app.post('/signup', Auth.signup);
    app.post('/signin', requireSignin, Auth.signin);
}