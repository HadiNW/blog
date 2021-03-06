const jwt = require('jsonwebtoken')
const User = require('../models/user')
const Article = require('../models/article')

class MiddleWare {

    static isLogin(req, res, next) {
        if (req.headers.hasOwnProperty('token')) {
            try{
                const decoded = jwt.verify(req.headers.token, process.env.JWT_SECRET)
                User.findOne({
                    email: decoded.email
                })
                .then(user => {                   
                    if (user) {
                        req.user = user
                        next()
                    } else {
                        res.status(400).json({message: 'no access login'})
                    }
                })
                .catch(err => {
                    console.log('gagal error ', err)
                    res.status(500).json({message: 'no jwt jwt error, please login'})
                })
            }catch(err) {
                console.log('err', err)
                res.status(500).json({message: 'jwt error, please login'})
            }
        } else {
            res.status(400).json({message: 'no token access'})
        }
    }


    static isArticleIsYours (req, res, next) {
        Article.findById(req.params.id)
            .then(article => {
                console.log(article)
                if (article) {
                    if(article.author.equals(req.user._id)) {
                        next()
                    } else {
                        res.status(400).json({
                            message: 'This is not your article'
                        })
                    }
                } else {
                    res.status(400).json({
                        message: 'No article found'
                    })
                }
            })
            .catch(err => {
                res.status(500).json(err)
            })
    }

    // static isArticleYours(req, res, next) {
    //     Article.findById(req.params.id)
    //         .then(event => {
    //             if (event) {
    //                 if (event.user.equals(req.user._id)) {
    //                     next()
    //                 } else {
    //                     res.status(400).json({
    //                         message: 'not your event'
    //                     })
    //                 }
    //             } else {
    //                 res.status(400).json({
    //                     message: 'no event found'
    //                 })
    //             }
    //         })
    //         .catch(err => {
    //             res.status(500).json(err)
    //         })
   // }

}

module.exports = MiddleWare