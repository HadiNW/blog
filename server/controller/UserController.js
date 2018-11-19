const User = require('../models/user')
const jwt = require('jsonwebtoken')
const {generateSalt, hashPassword, compare} = require('../helpers/helper')

class UserController {
    static register (req, res) {
        console.log(req.body)
        User.findOne({
            email: req.body.email
        })
        .then(user => {
            if (user) {
                res.status(400).json({message: 'email already used'})
            } else {
                User.create({
                    name: req.body.name,
                    email: req.body.email,
                    password: req.body.password
                })
                    .then(user => {
                       res.status(201).json({
                           message: 'a user succcess register'
                       })
                    })
                    .catch(err => {
                        res.status(500).json(err)
                    })
            }
        })       
    }

    static login (req, res) {
        User.findOne({email: req.body.email})
            .then(user => {
                if (user) {
                    const pwd = compare(req.body.password, user.password)      
                    if (pwd) {
                        const data = {
                            name: user.name,
                            email: user.email
                        }                     
                        const token = jwt.sign(data, process.env.JWT_SECRET)

                        res.status(200).json({token: token, user: data.name, message: 'successfull login'})
                    } else {
                        res.status(400).json({message: 'invalid password'})
                    }
                } else {
                    res.status(400).json({message: 'no user found'})
                }
               
            })
            .catch(err => {
                res.status(500).json(err)
            })
    }

}

module.exports = UserController