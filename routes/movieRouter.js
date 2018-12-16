const express = require('express');

let routes = function (Movie) {
    let movieRouter = express.Router();

    movieRouter.route('/')
        .post(function (req, res) {
            let movie = new Movie(req.body);
            movie.save();
            res.status(201).send(movie);
        })
        .get(function (req, res) {
            let query = {};
            if (req.query.genre) {
                query.genre = req.query.genre;
            }

            Movie.find(query, function (err, movies) {
                if (err) {
                    res.status(500).send(err);
                } else {
                    res.json(movies);
                }
            });
        });

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