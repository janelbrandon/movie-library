const express = require('express');

let routes = function (Movie) {
    let movieRouter = express.Router();

    // The movieController defines post and get for the route /api/movies
    let movieController = require('../controllers/movieController')(Movie);

    // Middleware to find a movie by id and handle when it isn't found
    movieRouter.use('/:movieId', function (req, res, next) {
        Movie.findById(req.params.movieId, function (err, movie) {
            if (err)
                res.status(500).send(err);
            else if (movie) {
                req.movie = movie;
                next();
            } else {
                res.status(404).send('Movie not found');
            }
        });
    });

    movieRouter.route('/')
        .post(movieController.post)
        .get(movieController.get);


    movieRouter.route('/:movieId')
        .get(movieController.get)
        .delete(movieController.delete);

    return movieRouter;
};

module.exports = routes;