var express = require('express');
var app = express();
var db = require('./databaseConnector');
var UserController = require('./user/UserController');
var AuthController = require('./auth/AuthController');
const port = process.env.PORT || 3000;

app.use('/users', UserController);
app.use('/api/auth', AuthController);

app.listen(port, function() {
  console.log('Server started on port ' + port);
});