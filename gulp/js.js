import babelify from 'babelify';
import browserify from 'browserify';
import eslint from 'gulp-eslint';
import fs from 'fs';
import gulp from 'gulp';
import path from 'path';
import source from 'vinyl-source-stream';
import uglify from 'uglifyify';
import exorcist from 'exorcist';
import qunit from 'node-qunit-phantomjs';
import paths from './settings.js';


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

gulp.task('jstest_bundle', () => {
    return browserify({
        entries: [
            `./tests/test_one.js`,
        ],
        extensions: ['.js', '.jsx']
    })
        .transform(babelify)
        .bundle()
        .pipe(source('test_bundle.js'))
        .pipe(gulp.dest(paths.test_dist));
});

gulp.task('jstest', ['jstest_bundle'], () => {
    qunit('./tests/test_runner.html', {'verbose': true});
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
