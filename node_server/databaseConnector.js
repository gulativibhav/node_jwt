let mongoose = require('mongoose');
const uri = 'mongodb://localhost/auth_jwt';
// const uri = 'mongodb://mongo/auth_jwt';
// the connection string can vary depending upon the connection strategy -> username/password or direct
// here we are using direct
mongoose.connect(uri)
  .then( (response) => {
    console.log('SUCCESS: mongo db connected');
  })
  .catch( (err) => {
    console.log('ERROR', err);
  });