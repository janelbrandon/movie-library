// movieController defines post and get for /api/movies

let movieController = function (Movie) {
    let post = function (req, res) {
        let movie = new Movie(req.body);
        movie.save();
        res.status(201).send(movie);
    };

    let get = function (req, res) {
        // If we have req params - return just that movie
        if (req.params.movieId) {
            Movie.findById(req.params.movieId, function (err, movie) {
                if (err) {
                    res.status(500).send(err);
                } else if (movie) {
                    res.json(movie);
                } else {
                    res.status(404).send('Movie not found');
                }
            });
        } else {
            // Return a list of all movies
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
        }
    };
    return {
        post: post,
        get: get
    };
}

module.exports = movieController;