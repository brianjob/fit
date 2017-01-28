const mongoose = require('mongoose');
const fs = require('fs');

mongoose.connect(process.env.MONGO_URL);

module.exports = mongoose;