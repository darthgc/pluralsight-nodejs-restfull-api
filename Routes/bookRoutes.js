var express = require('express');

var routes = function(Book) {
    var bookRouter = express.Router(); //Use a router to defines routes

    bookRouter.route('/')
        .post(function(req, res) {
            var book = new Book(req.body); // Create a new Mongoose instence off that book

            book.save(); // Create the new book in the Mongo DB
            res.status(201).send(book);
        })
        .get(function(req, res) { // setup the get method for the books route
            var query = {};

            if(req.query.genre) {
                query.genre = req.query.genre;
            }

            Book.find(query, function(err, books) {
                if(err) {
                    res.status(500).send(err);
                } else {
                    res.json(books);
                }
            });
        });

    bookRouter.route('/:bookId') // Get by Id
        .get(function(req, res) {

            Book.findById(req.params.bookId, function(err, book) {
                if(err) {
                    res.status(500).send(err);
                } else {
                    res.json(book);
                }
            });
        });

    return bookRouter;
};

module.exports = routes;