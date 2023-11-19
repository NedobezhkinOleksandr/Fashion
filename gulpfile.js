const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const concat = require('gulp-concat');
const csso = require('gulp-csso');
const nunjucksRender = require('gulp-nunjucks-render');
const sync = require('browser-sync').create();

gulp.task('styles', function () {
  return gulp.src('src/*.scss')
    .pipe(sass())
    .pipe(csso())
    .pipe(concat('index.css'))
    .pipe(gulp.dest('dist/css'))
    .pipe(sync.stream());
});

gulp.task('images', function () {
  return gulp.src('src/images/*')
    .pipe(gulp.dest('dist/images'))
    .pipe(sync.stream());
});

gulp.task('icons', function () {
  return gulp.src('src/icons/*')
    .pipe(gulp.dest('dist/icons'))
    .pipe(sync.stream());
});

gulp.task('html', function () {
  return gulp.src('src/*.html')
    .pipe(nunjucksRender({
      path: ['src/templates']
    }))
    .pipe(gulp.dest('dist'))
    .pipe(sync.stream());
});

gulp.task('build', gulp.series('styles', 'html', 'icons', 'images'));

gulp.task('serve', function () {
  sync.init({
    server: './dist'
  });

  gulp.watch('src/styles/*.scss', gulp.series('styles')).on('change', sync.reload);
  gulp.watch('src/templates/*.html', gulp.series('html')).on('change', sync.reload);
  gulp.watch('src/images/*', gulp.series('images'));
  gulp.watch('src/icons/*', gulp.series('icons'));
});



gulp.task('default', gulp.series('build', 'serve'));
