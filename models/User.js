const mongoose = require('mongoose');
const schema = mongoose.Schema;

module.exports = mongoose.model('User', new Schema({
    name: String,
    password: String,
    admin: Boolean
}));