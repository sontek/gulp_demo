const babelify = require('babelify');
const browserify = require('browserify');
const del = require('del');
const gulp = require('gulp')
const source = require('vinyl-source-stream');
const sourcemaps = require('gulp-sourcemaps');

gulp.task('clean', function(cb) {
    del(['./lib', './dist'], cb);
});

gulp.task('browserify', ['clean'], function() {
    // Minify and copy all JS scripts with sourcemaps
    return browserify({
        entries: 'src/index.jsx',
        extensions: ['.js', '.jsx'],
        debug: true
    })

   .transform(babelify)
   .bundle()
   .pipe(source('bundle.js'))

    // write out the build
    .pipe(gulp.dest('./dist'))

});

// The default task (called when you run `gulp` from cli)
gulp.task('default', ['browserify']);
