const miniApp = require('express').Router();
const htmlRouter = require('./htmlRouter');
const apiRouter = require('./apiRouter');

miniApp.use('/',htmlRouter)
miniApp.use('/api', apiRouter)

module.exports = miniApp;