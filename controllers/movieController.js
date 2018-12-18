// movieController defines post and get for /api/movies

let movieController = function (Movie) {
    let post = function (req, res) {
        if (req.body.title) {
            let movie = new Movie(req.body);
            movie.save();
            res.status(201);
            res.send(movie);
        } else {
            res.status(400);
            res.send('Title is required');
        }
    };

    let get = function (req, res) {
        // If we have req params - return just that movie
        if (req.movie) {
            res.json(req.movie);
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

    let deleteFunction = function (req, res) {
        req.movie.remove(function (remErr) {
            if (remErr)
                res.status(500).send(remErr);
            else {
                res.status(204).send('Removed');
            }
        });
    };

    return {
        post: post,
        get: get,
        delete: deleteFunction
    };
}

module.exports = movieController;