const express = require('express'),
    mongoose = require('mongoose'),
    bodyParser = require('body-parser');

// Connect to database
let db;
if (process.env.ENV == 'test') {
    db = mongoose.connect('mongodb://localhost/movieAPI_test', { useNewUrlParser: true });
    console.log("Connected to db");
}
else {
    db = mongoose.connect('mongodb://localhost/movieAPI', { useNewUrlParser: true });
    console.log("Connected to db");
}


let app = express();

// Use bodyParser.json
app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));

// Bring in the movie model
let Movie = require('./models/movieModel');

// Use the movieRouter for movie routes
let movieRouter = require('./routes/movieRouter')(Movie);
app.use('/api/movies', movieRouter);

// Send basic welcome message for root route
app.get('/', function (req, res) {
    res.send('Welcome to the movie library API');
});

// Start the app on the configured port (or default port)
const port = process.env.PORT || 3000;
app.listen(port, function () {
    console.log(`App is running on port ${port}`);
});

module.exports = app;