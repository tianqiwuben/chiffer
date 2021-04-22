const User = require('../models').User;
const bcrypt = require('bcrypt');
const saltRounds = 10;
const jwt = require('jsonwebtoken');
const accessTokenSecret = '12345678';


module.exports = {
  create(req, res) {
    if (!req.body.password) {
      return res.status(400).send({message: 'Empty password'});
    }
    return bcrypt.hash(req.body.password, saltRounds).then(hash => {
      return User
      .create({
        name: req.body.name,
        email: req.body.email,
        password: hash,
      })
      .then(user => {
        const accessToken = jwt.sign({ id: user.id, name: user.name }, accessTokenSecret);
        res.status(201).send(
          {
            id: user.id,
            email: user.email,
            name: user.name,
            jwt: accessToken,
          }
      )})
    })
    .catch(error => res.status(400).send(error));
  },
  login(req, res) {
    if (!req.body.password) {
      return res.status(400).send({message: 'Empty password'});
    }
    if (!req.body.email) {
      return res.status(400).send({message: 'Empty email'});
    }
    return User.findOne({
      where: {
        email: req.body.email,
      }
    }).
    then(user => {
      return bcrypt.compare(req.body.password, user.password).then((result) => {
        if (result) {
          const accessToken = jwt.sign({ id: user.id, name: user.name }, accessTokenSecret);
          res.status(200).send(
            {
              id: user.id,
              email: user.email,
              name: user.name,
              jwt: accessToken,
            }
          );
        } else {
          res.status(400).send({message: 'invalid password'});
        }
      })
    })
    .catch(error => res.status(400).send(error));
  },

  update(req, res) {
    
  },
};