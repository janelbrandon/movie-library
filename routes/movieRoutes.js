const express = require('express');

let routes = function (Movie) {
    let movieRouter = express.Router();

    // The movieController defines post and get for the route /api/movies
    let movieController = require('../controllers/movieController')(Movie);

    movieRouter.route('/')
        .post(movieController.post)
        .get(movieController.get);


    movieRouter.route('/:movieId')
        .get(movieController.get);

    return movieRouter;
};

module.exports = routes;