const babelify   = require('babelify')
    , browserify = require('browserify')
    , del        = require('del')
    , eslint     = require('gulp-eslint')
    , fs         = require('fs')
    , gulp       = require('gulp')
    , path       = require('path')
    , source     = require('vinyl-source-stream')
    , sourcemaps = require('gulp-sourcemaps')
    , uglify     = require('uglifyify')
    , exorcist   = require('exorcist');

const dist_dir = path.join(__dirname, 'dist/')
    , map_file = path.join(dist_dir, 'bundle.js.map');

gulp.task('clean', function(cb) {
    del(['./lib', './dist'], cb);
});

gulp.task('lint', function () {
    return gulp.src(['src/*.jsx'])
        // eslint() attaches the lint output to the eslint property
        // of the file object so it can be used by other modules.
        .pipe(eslint({
            useEslintrc: true
        }))
        // eslint.format() outputs the lint results to the console.
        // Alternatively use eslint.formatEach() (see Docs).
        .pipe(eslint.format())
        // To have the process exit with an error code (1) on
        // lint error, return the stream and pipe to failOnError last.
        .pipe(eslint.failOnError());
});

gulp.task('browserify', ['clean'], function() {
    // exorcist doesn't write the file if the directory
    // doesn't already exist.
    if (!fs.existsSync(dist_dir)){
        fs.mkdirSync(dist_dir);
    }

    return browserify({
        entries: 'src/index.jsx'
        , extensions: ['.js', '.jsx']
        , debug: true  // We use debug: true so source maps are generated
    })

   .transform(babelify)
   .transform({global: true}, uglify)
   .bundle()
   .pipe(exorcist(map_file))
   .pipe(source('bundle.js'))

   // write out the build
   .pipe(gulp.dest('./dist'))

});

// The default task (called when you run `gulp` from cli)
gulp.task('default', ['browserify']);
