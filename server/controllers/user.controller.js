const User = require('../models/user.model')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')

module.exports = {
  register: function (req, res) {
    User.findOne({
      email: req.body.email
    }).then(data => {
      if (data) {
        res.status(202).json({
          message: 'Email Already Exist'
        })
      }
      
    }).catch(err => {
      console.log(err);

    })
    
    let newUser = new User({
      email: req.body.email,
      name: req.body.name,
      password: req.body.password
    })
    newUser.save()
      .then(response => {
 
        let payload = {
          id: response._id,
          email: response.email,
          name: response.name,
        }
        let token = jwt.sign(payload, process.env.SECRETKEY)
        console.log(token+' ini tokeen');
        res.status(200).json({
          message: 'register success',
          id: response._id,
          email: response.email,
          name: response.name,
          token: token,
        })
      }).catch(err => {
        console.log('error kali');
        console.log(err);
        res.status(500).json({
          message: 'register failed',
          err
        })
      })
  },

  login: function (req, res) {

    User.findOne({
      email: req.body.email
    }).then(data => {
      
      
      if (data) {
        var result = bcrypt.compareSync(req.body.password, data.password);
        if (result) {
          
          let payload = {
            id: data.id,
            email: data.email,
            name: data.name,
          }
          let token = jwt.sign(payload, process.env.SECRETKEY)
          res.status(200).json({
            message: 'login success',
            id: data.id,
            email: data.email,
            name: data.name,
            token: token,
          })

        } else {
          res.status(202).json({
            message: 'Wrong Username / Password'
          })
        }
      } else {
        res.status(202).json({
          message: 'Wrong Username / Password'
        })
      }
    }).catch(err => {
      console.log(err);

      res.status(500).json({
        message: 'Sign in failed'
      })
    })

  }
}