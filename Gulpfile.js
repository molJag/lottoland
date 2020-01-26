const gulp  = require('gulp');
var uglify = require('gulp-uglify-es').default;
minifycss = require('gulp-minify-css');

gulp.task('optimize', ['minify-js', 'minify-css']);

gulp.task('minify-js', function () {
  gulp.src('src/js/*.js')
  .pipe(uglify())
  .pipe(gulp.dest('dist/js'))
});
gulp.task('minify-css', function () {
  gulp.src('src/css/*.css')
  .pipe(minifycss())
  .pipe(gulp.dest('dist/css'))
});
