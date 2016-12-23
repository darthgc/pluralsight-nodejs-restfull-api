var gulp = require('gulp'),
    nodemon = require('gulp-nodemon'); // So that we do not have to manually restart the server each time we make a change

gulp.task('default', function() {
    nodemon({
        script: 'app.js',
        ext: 'js', // What to watch for
        env: {
            PORT: 8000
        },
        ignore: ['./node_modules/**']
    }).on('restart', function() {
        console.log('Restarting');
    });
});