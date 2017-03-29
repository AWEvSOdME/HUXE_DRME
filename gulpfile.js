let gulp = require('gulp');
let webpackStream = require('webpack-stream');
let webpack = require('webpack');
let cssmin = require('gulp-cssmin');
let sass = require('gulp-sass');
let uglify = require('gulp-uglify');
let named = require('vinyl-named');
let gutil = require('gulp-util');
let plumber = require('gulp-plumber');
let args = require('yargs').argv;
let nunjucksRender = require('gulp-nunjucks-render');
let autoprefixer = require('gulp-autoprefixer');
let browserSync = require('browser-sync').create();

const env = (args.deploy) ? 'prod' : 'dev';
console.log('using env:', env);
let webpackConfig = require('./webpack.config.' + env);

if (env != 'prod') {
  cssmin = gutil.noop;
}

// legacy task. scss does the job now
gulp.task('css', function () {
  gulp.src('src/css/**/*.css')
    .pipe(plumber())
    .pipe(cssmin())
    .pipe(autoprefixer())
    .pipe(gulp.dest('build/css'));
});

gulp.task('scss', function () {
  gulp.src('src/scss/**/*.scss')
    .pipe(plumber())
    .pipe(sass({ outputStyle: 'expanded' }))
    .pipe(cssmin())
    .pipe(autoprefixer())
    .pipe(gulp.dest('build/css'));
});

gulp.task('js', function () {
  gulp.src('src/js/*.js')
    .pipe(plumber())
    .pipe(named())
    .pipe(webpackStream(webpackConfig, webpack))
    .pipe(gulp.dest('build/js'));
});

gulp.task('templates', function () {
  gulp.src('src/templates/*.html')
    .pipe(plumber())
    .pipe(nunjucksRender({
      path: 'src/templates'
    }))
    .pipe(gulp.dest('build'));
});

gulp.task('img', function () {
  gulp.src('src/img/**/*')
    .pipe(gulp.dest('build/img'));
});

gulp.task('watch', function () {
  // legacy task. scss does the job now
  //gulp.watch('src/css/**/*.css', ['css']);
  gulp.watch('src/scss/**/*', ['scss']);
  gulp.watch(['src/js/**/*'], ['js']);
  gulp.watch('src/templates/**/*', ['templates']);
});

gulp.task('serve', function () {
  browserSync.init({
    server: {
      baseDir: "./build"
    },
    files: ['./build/**/*'],
    reloadDebounce: 500,
    open: false
  });
});

gulp.task('default', ['scss', 'js', 'templates', 'img']);
gulp.task('dev', ['default', 'watch', 'serve']);