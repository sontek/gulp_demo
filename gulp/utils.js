import gulp from 'gulp';
import paths from './settings';
import del from 'del';

gulp.task('clean', () => {
    del([paths.dist]);
});
