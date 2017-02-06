const express = require('express');
const app = express();
const bodyparser = require('body-parser');
const morgan = require('morgan');
const jwt = require('jsonwebtoken');
const training = require('./routes/training');
const auth = require('./routes/auth');

// app settings
app.set('port', (process.env.PORT || 3001));
app.set('jwtSecret', process.env.JWT_SECRET);

// middleware
if (process.env.NODE_ENV === 'production') {
  app.use(express.static('dist'));
}
app.use(morgan('combined'));
app.use(bodyparser.json());

// routes
app.use('/training', training);
app.use('/auth', auth);

// run
app.listen(app.get('port'), () => console.log(`running on port: ${app.get('port')}`));