const express = require('express');
const app = express();
const bodyparser = require('body-parser');
const morgan = require('morgan');
const jwt = require('jsonwebtoken');
const training = require('./routes/training');

app.set('port', (process.env.PORT || 3001));

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('dist'));
}
app.use(morgan('combined'));
app.use(bodyparser.json());
app.use('/training', training);

app.listen(app.get('port'), () => console.log(`running on port: ${app.get('port')}`));