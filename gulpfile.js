const babelify = require('babelify');
const browserify = require('browserify');
const buffer = require('vinyl-buffer');
const del = require('del');
const gulp = require('gulp')
const source = require('vinyl-source-stream');
const sourcemaps = require('gulp-sourcemaps');
const fs = require("fs");

var paths = {
    scripts: ['src/*.jsx']
}

gulp.task('clean', function(cb) {
    del(['./lib', './dist'], cb);
});

// Translate from es6 to pure javascript
gulp.task('babel', ['clean'], function() {
    return gulp.src(paths.scripts)
        .pipe(sourcemaps.init({loadMaps: true}))
        .pipe(babel())
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('./lib'));
});

gulp.task('browserify', ['clean'], function() {
    // Minify and copy all JS scripts with sourcemaps
    return browserify('src/index.jsx', {debug: true})
        .transform(babelify)
        .bundle()
        .pipe(sourcemaps.init({loadMaps: true}))
        .pipe(source('bundle.js'))
        .pipe(sourcemaps.write('.'))

        // write out the build
        .pipe(gulp.dest('./dist'))

});

// The default task (called when you run `gulp` from cli)
gulp.task('default', ['browserify']);
