const babelify   = require('babelify')
    , browserify = require('browserify')
    , del        = require('del')
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
