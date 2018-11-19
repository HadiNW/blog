const Comment = require('../models/comment')

class CommentController {    
    static create(req, res) {
        console.log('comment')
        Comment.create({
            comment: req.body.comment,
            article: req.body.article,
            user: req.user._id
        })
        .then(comment => {
            res.status(201).json(comment)
        })
        .catch(err => {
            console.log(err)
            res.status(500).json(err)
        })
    }

    static getAll(req, res) {
        Comment.find({
           article: req.params.article
        })
            .populate('user')
        .then(comments => {
            res.status(200).json(comments)
        })
        .catch(err => {
            res.status(500).json(err)
            console.log(err)
        })
    }

    static delete(req, res) {
        Comment.findByIdAndDelete(req.params.id)
            .then(_ => {
                res.status(200).json({message: 'success delete a comment'})
            })
            .catch(err => {
                res.status(500).json(err)
            })
    }
}   

module.exports = CommentController