const gulp = require('gulp');
const sass = require('gulp-sass');

gulp.task('sass', () => (
  gulp.src('./sass/**/*.scss')
    .pipe(sass({ outputStyle: 'expanded' }))
    .pipe(gulp.dest('./css'))
));

gulp.task('watch', async () => {
  gulp.watch('./sass/**/*.scss', gulp.task('sass'));
});

gulp.task('default', gulp.series(gulp.parallel('sass'), 'watch'));
