var express = require('express'),
    mongoose = require('mongoose'),
    bodyParser = require('body-parser');

var db = mongoose.connect('mongodb://localhost/bookAPI'); //Creates a DB, pass in the connection string, mongodb needs to be running

var Book = require('./models/bookModel'); // What the data looks like in the DB

var app = express(); // init an instance of express

var port = process.env.PORT || 3000;

app.use(bodyParser.json()); // Tell the app that we will use the body parser (the json one), will add the json bpdy to req.body
app.use(bodyParser.urlencoded({extended: true}));

var bookRouter = require('./Routes/bookRoutes')(Book);

app.use('/api/books', bookRouter);

app.get('/', function(req, res) {
    res.send('Welcome to my API');
});

app.listen(port, function() {
    console.log('Running on port ' + port);
});