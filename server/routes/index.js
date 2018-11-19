const express = require('express')
const Router = express.Router()

const UserController = require('../controller/UserController')
const ArticleController = require('../controller/ArticleController')
const CommentController = require('../controller/CommentController')
const {isLogin, isArticleIsYours} = require('../middlewares/middleware')


Router.post('/users/register', UserController.register)
Router.post('/users/login', UserController.login)

Router.get('/articles', ArticleController.getAll)
Router.get('/articles/:id', ArticleController.getOne)
Router.post('/articles', isLogin,  ArticleController.create)
Router.put('/articles/:id', isLogin, isArticleIsYours, ArticleController.update)
Router.delete('/articles/:id', isLogin, isArticleIsYours, ArticleController.delete)
Router.get('/myarticles', isLogin, ArticleController.getMyArticles)

Router.post('/comment', isLogin, CommentController.create)
Router.get('/comment/:article', isLogin, CommentController.getAll)
Router.delete('/comment/:id', isLogin, CommentController.delete)

module.exports = Router