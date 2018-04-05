var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());
var User = require('../user/User');
var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');
// var config = require('../config')


router.post('/register', function(req, res) {
  const hashedPassword = bcrypt.hashSync(req.body.password, 8);

  User.create({
    name: req.body.name,
    email: req.body.email,
    password: hashedPassword
  }).then( (user) => {
    // var token = jwt.sign({id: user._id}, '123456^%$#@!', {expiresIn: 86400})
    res.status(200).send('Registration Success. Please login to continue');
  })
    .catch( (err) => {
      res.status(500).send('There was a problem registering the user.');
    });
});

router.get('/validate', function(req, res) {
  const token = req.headers['x-access-token'];
  jwt.verify(token, '123456^%$#@!', function(err, decoded) {
    if (err) {
      if (err.message === 'jwt expired') {
        return res.status(500).send({ auth: false, desc: err.message });
      }
      else return res.status(500).send({ auth: false, desc: 'Unkown token' });
    }
    
    console.log(decoded);
    User.findById(decoded.id, {password: 0})
      .then( (response) => {
        res.status(200).send(response);
      })
      .catch( (err) => {
        console.log(err);
        res.status(401).send({auth: false, desc: 'token does not belong to any user'});
      });
  });
});

router.post('/login', function(req, res) {
  User.findOne({email: req.body.email})
    .then( (user) => {
      if(!user) {
        res.status(404).send('No such user');
      }

      const isPasswordValid = bcrypt.compareSync(req.body.password, user.password);

      if (isPasswordValid) {
        var token = jwt.sign({id: user._id}, '123456^%$#@!', {expiresIn: 86400});
        res.status(200).send({ auth: true, token: token, desc: 'Successful login. Use this token for future transactions' });
      }
      else {
        res.status(401).send({ auth: false, token: null, desc: 'Incorrect username/password' });
      }
    })
    .catch( (err) => {
      res.status(500).send(err);
    });
});

module.exports = router;