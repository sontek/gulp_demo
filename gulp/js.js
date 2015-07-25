import babelify from 'babelify';
import browserify from 'browserify';
import eslint from 'gulp-eslint';
import fs from 'fs';
import gulp from 'gulp';
import path from 'path';
import source from 'vinyl-source-stream';
import uglify from 'uglifyify';
import exorcist from 'exorcist';
import paths from './settings.js';
import tape from 'gulp-tape';
import tap_spec from 'tap-spec';

const map_file = path.join(paths.dist, 'bundle.js.map');

gulp.task('jslint', () => {
    return gulp.src([`${paths.src}/*.jsx`])
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

gulp.task('jstest', ['browserify'], () => {
    return gulp.src('tests/*.js')
        .pipe(tape());
});


gulp.task('browserify', ['clean'], () => {
    // exorcist doesn't write the file if the directory
    // doesn't already exist.
    if (!fs.existsSync(paths.dist)){
        fs.mkdirSync(paths.dist);
    }

    return browserify({
        entries: `${paths.src}/index.jsx`,
        extensions: ['.js', '.jsx'],
        // We use debug: true so source maps are generated
        debug: true
    })
        .transform(babelify)
        .transform({global: true}, uglify)
        .bundle()
        .pipe(exorcist(map_file))
        .pipe(source('bundle.js'))
        // write out the build
        .pipe(gulp.dest(paths.dist));
});
