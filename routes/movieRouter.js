const express = require('express');

let routes = function (Movie) {
    let movieRouter = express.Router();

    // The movieController defines post and get for the route /api/movies
    let movieController = require('../controllers/movieController');

    movieRouter.route('/')
        .post(movieController.post)
        .get(movieController.get);


    movieRouter.route('/:movieId')
        .get(function (req, res) {
            Movie.findById(req.params.movieId, function (err, movie) {
                if (err) {
                    res.status(500).send(err);
                } else if (movie) {
                    res.json(movie);
                } else {
                    res.status(404).send('Movie not found');
                }
            });
        });

    return movieRouter;
};

module.exports = routes;