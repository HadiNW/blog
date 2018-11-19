const Article = require('../models/article') 

class ArticleController {

    static getAll (req, res) {
        Article.find({})
                .populate('author')
            .then(articles => {
                res.status(200).json(articles)
            })
            .catch(err => {
                res.status(500).json(err)
            })
    }

    static create(req, res) {
        Article.create({
            title: req.body.title,
            description: req.body.description,
            author: req.user._id
        })
        .then(article => {
            res.status(201).json(article)
        })
        .catch(err => {
            console.log(err)
            res.status(500).json(err)
        })
    }

    static getOne(req, res) {
        Article.findById(req.params.id)
                .populate('author')
            .then(article => {
                res.status(200).json(article)
            })
            .catch(err => {
                res.status(500).json(err)
            })
    }


    static update(req, res) {
        Article.findByIdAndUpdate(req.params.id, {
            title: req.body.title,
            description: req.body.description,
            image: req.body.image
        })
            .then(article => {
                console.log(article)
                res.status(201).json({
                    data: article,
                    message: 'Succes update an article'
                })
            })
            .catch(err => {
                res.status(500).json(err)
            })
    }

    static delete(req, res) {
        Article.findByIdAndDelete(req.params.id)
            .then(article => {
                res.status(201).json({
                    message: 'Success delete an article'
                })
            })
            .catch(err => {
                res.status(500).json(err)
            })
    }

    static getMyArticles(req, res) {
        Article.find({
            author: req.user._id
        })
        .then(articles => {
            res.status(200).json(articles)
        })
        .catch(err => {
            res.status(500).json(err)
        })
    }
}

module.exports = ArticleController