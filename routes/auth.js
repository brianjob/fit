const express = require('express');
const router = express.Router();
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const saltRounds = 5;

function getToken(user, secret) {
    var token = jwt.sign(user, secret, {
        expiresIn: 60 * 60 * 24
    });

    return token;
}

router.post('/register', (req, res) => {
    bcrypt.hash(req.body.user.password, saltRounds, (err, hash) => {
        req.body.user.password = hash;
        User.create(req.body.user, (err, user) => {
            if (err) throw err;

            const token = getToken(user, req.app.get('jwtSecret'));
            res.json({user, token});
        });
    });
});

router.post('/login', (req, res) => {
    const email = req.body.user.email;
    const password = req.body.user.password;
    const message = 'Invalid email/password combination';

    User.findOne({email}, (err, user) => {
        if (err) throw err;
        if (!user) {
            res.json({ message });
        }

        bcrypt.compare(password, user.password, (err, result) => {
            if (result) {
                const token = getToken(user, req.app.get('jwtSecret'));
                res.json({user, token});
            } else {
                res.json({ message });
            }
        });
    });
});

module.exports = router;