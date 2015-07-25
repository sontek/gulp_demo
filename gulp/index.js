import gulp from 'gulp';
import utils from './utils.js';
import js from './js.js';

// The default task (called when you run gulp from cli)
gulp.task('default', ['jslint', 'browserify']);
