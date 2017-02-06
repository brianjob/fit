const mongoose = require('mongoose');
const Schema = mongoose.Schema;

module.exports = mongoose.model('User', new Schema({
    email: {
        unique: true,
        type: String,
        required: [true, 'Email required'],
        match: [
            /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            'Email must be a valid email address'
        ]
    },
    password: {
        type: String,
        required: [true, 'Password required'],
        minlength: [6, 'Password must be at least 6 characters']
    }
}));