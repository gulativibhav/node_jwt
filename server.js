var express = require('express');
var app = express();
var db = require('./db');

const port = process.env.PORT || 3000;

app.listen(port, function() {
  console.log('Server started on port ' + port);
})