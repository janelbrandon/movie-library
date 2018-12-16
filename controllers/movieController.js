// movieController defines post and get for /api/movies

let movieController = function (Movie) {
    let post = function (req, res) {
        let movie = new Movie(req.body);
        movie.save();
        res.status(201).send(movie);
    };

    let get = function (req, res) {
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
    };
    return {
        post: post,
        get: get
    };
}

module.exports = movieController;