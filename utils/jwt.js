const User = require('../models/user');

module.exports = {
    validateToken: (token, callback) => {
        const { sub } = token;
        User.findById(sub, (err, user) => {
            if (err) {
                return callback(err, null);
            }

            if (user) {
                return callback(null, user);
            }

            return callback(null, false);

        });
    }
}