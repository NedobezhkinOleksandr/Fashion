import esm from 'esm';
esm(module);

const gulp = require('gulp');
const nunjucksRender = require('gulp-nunjucks-render');
const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');
const cleanCSS = require('gulp-clean-css');
const rename = require('gulp-rename');
const browserSync = require('browser-sync').create();

gulp.task('nunjucks', () => {
  return gulp.src('src/templates/*.njk')
    .pipe(nunjucksRender({
      path: ['src/templates']
    }))
    .pipe(gulp.dest('dist'))
    .pipe(browserSync.stream());
});

gulp.task('styles', () => {
  return gulp.src('src/styles/main.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer())
    .pipe(cleanCSS())
    .pipe(rename({ suffix: '.min' }))
    .pipe(gulp.dest('dist/css'))
    .pipe(browserSync.stream());
});

gulp.task('serve', () => {
  browserSync.init({
    server: './dist'
  });

  gulp.watch('src/templates/**/*.njk', gulp.series('nunjucks'));
  gulp.watch('src/styles/**/*.scss', gulp.series('styles'));
});

gulp.task('default', gulp.series('nunjucks', 'styles', 'serve'));
