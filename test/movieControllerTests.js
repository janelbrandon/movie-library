let should = require('should'),
    sinon = require('sinon');



describe('Test post API', function () {
    let res = {};
    let Movie;
    let movieController;

    beforeEach('Setup res and Movie model mock', function () {
        // Mock the response - use sinon to be able to query what we get back
        res = {
            status: sinon.spy(),
            send: sinon.spy()
        };
        // Mock the movie model - our post requires a save function and nothing else
        Movie = function (movie) {
            this.save = function () {}
        };
        // Instantiate our movieController with our mock Movie
        movieController = require('../controllers/movieController')(Movie);

    });
    context('Valid posts', function () {
        it('Should return 201 status and created movie with valid post params', function () {
            // Mock the request - it should have a body with at least a title
            let req = {
                body: {
                    title: 'Test movie'
                }
            };

            // To test, call our controller method with our mocked req/res objects
            movieController.post(req, res);

            // Check what status and response we got back
            res.status.calledWith(201).should.equal(true, `Wrong status: ${res.status.args[0][0]}`);
        })
    });
    context('Invalid posts', function () {
        it('Should return 400 status and Title is required message if no title included', function () {
            let req = {
                body: {
                    year: '1977'
                }
            };

            // To test, call our controller method with our mocked req/res objects
            movieController.post(req, res);
            // Check what status and response we got back
            res.status.calledWith(400).should.equal(true, `Wrong status: ${res.status.args}`);
            // Check message returned
            res.send.calledWith('Title is required').should.equal(true);
        });
    })

});