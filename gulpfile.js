'use strict';

var babel = require('babelify');
var browserify = require('browserify');
var buffer = require('vinyl-buffer');
var del = require('del');
var gulp = require('gulp')
var source = require('vinyl-source-stream');
var sourcemaps = require('gulp-sourcemaps');


var paths = {
    scripts: ['*.jsx']
}

gulp.task('clean', function(cb) {
    del(['build'], cb);
});

gulp.task('scripts', ['clean'], function() {
    // Minify and copy all JS scripts with sourcemaps
    var bundler = browserify(
        'index.jsx', {debug: true}
    ).transform(babel.configure({}));

    return bundler.bundle()
        .pipe(source('bundle.js'))
        .pipe(buffer())

        // start tracking sourcemaps
        .pipe(sourcemaps.init({loadMaps: true}))
        // write out the sourcemaps
        .pipe(sourcemaps.write('.'))

        // write out the build
        .pipe(gulp.dest('build/'))

});

// The default task (called when you run `gulp` from cli)
gulp.task('default', ['scripts']);
