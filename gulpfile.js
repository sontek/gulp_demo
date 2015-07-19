const babel = require('gulp-babel');
const browserify = require('browserify');
const buffer = require('vinyl-buffer');
const del = require('del');
const gulp = require('gulp')
const source = require('vinyl-source-stream');
const sourcemaps = require('gulp-sourcemaps');


var paths = {
    scripts: ['src/*.jsx']
}

gulp.task('clean', function(cb) {
    del(['./lib', './dist'], cb);
});

// Translate from es6 to pure javascript
gulp.task('babel', function() {
    return gulp.src(paths.scripts)
        .pipe(sourcemaps.init({loadMaps: true}))
        .pipe(babel())
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('./lib'));
});

gulp.task('browserify', ['clean', 'babel'], function() {
    // Minify and copy all JS scripts with sourcemaps
    return browserify('lib/index.js', {debug: true})
        .bundle()
        .pipe(source('bundle.js'))
        .pipe(buffer())

        // start tracking sourcemaps
        .pipe(sourcemaps.init({loadMaps: true}))

        // write out the sourcemaps
        .pipe(sourcemaps.write('.'))

        // write out the build
        .pipe(gulp.dest('./dist'))

});

// The default task (called when you run `gulp` from cli)
gulp.task('default', ['browserify']);
