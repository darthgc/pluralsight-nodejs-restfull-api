var express = require('express'),
    mongoose = require('mongoose'),
    bodyParser = require('body-parser');

var db = mongoose.connect('mongodb://localhost/bookAPI'); //Creates a DB, pass in the connection string, mongodb needs to be running

var Book = require('./models/bookModel'); // What the data looks like in the DB

var app = express(); // init an instance of express

var port = process.env.PORT || 3000;

app.use(bodyParser.json()); // Tell the app that we will use the body parser (the json one), will add the json bpdy to req.body
app.use(bodyParser.urlencoded({extended: true}));

var bookRouter = express.Router(); //Use a router to defines routes

bookRouter.route('/books')
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

bookRouter.route('/books/:bookId') // Get by Id
    .get(function(req, res) {

        Book.findById(req.params.bookId, function(err, book) {
            if(err) {
                res.status(500).send(err);
            } else {
                res.json(book);
            }
        });
    });

app.use('/api', bookRouter);

app.get('/', function(req, res) {
    res.send('Welcome to my API');
});

app.listen(port, function() {
    console.log('Running on port ' + port);
});