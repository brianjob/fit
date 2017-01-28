const mongoose = require('../mongoose');
const Schema = mongoose.Schema;

const movementSchema = new Schema({
    name: { type: String, unique: true }
});

module.exports = mongoose.model('Movement', movementSchema);