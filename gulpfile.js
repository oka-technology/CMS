const gulp = require('gulp');
const sass = require('gulp-sass');
const packageImporter = require('node-sass-package-importer');

gulp.task('sass', () => (
  gulp.src('./sass/**/*.scss')
    .pipe(sass({
      outputStyle: 'expanded',
      importer: packageImporter({
        extensions: ['.scss', '.css']
      })
    }))
    .pipe(gulp.dest('./public/css'))
));

gulp.task('watch', async () => {
  gulp.watch('./sass/**/*.scss', gulp.task('sass'));
});

gulp.task('default', gulp.series(gulp.parallel('sass'), 'watch'));
