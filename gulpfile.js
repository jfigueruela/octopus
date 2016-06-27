/**
 * Automatization GULP file.
 * @author Jose Figueruela <jfigueruela@gmail.com>
 * @version 0.0.1
 */

var gulp = require('gulp'),
  browserSync = require('browser-sync'),
  sass = require('gulp-sass'),
  del = require('del'),
  clean = require('gulp-clean'),
  autoprefixer = require('gulp-autoprefixer'),
  concat = require('gulp-concat'),
  rename = require('gulp-rename'),
  minifycss = require('gulp-minify-css');

var mainIndexFile = 'index.html';

var paths = {
  sass: ['./scss/**/*.scss'],
  destCss: './www/css/',
  devJS: ['./www/js/**/*.js', '!./www/js/libs/**/*'],
  devHTML: './www/js/**/*.html',
  devIndex: './www/*.html',
  devCommons: ['./www/**/*', '!./www/js/**/*.js', '!./www/js/**/*.gz', '!./www/js/libs/**/*', '!./www/lib/**/*'],
  distJS: 'dist/build/www/js',
  destFonts: './www/fonts/'
};


//Build the CSS
gulp.task('sass', ['clean-css'], function (done) {
  gulp.src(['./scss/octopus.scss'])
    .pipe(sass())
    .on('error', sass.logError)
    .pipe(concat('octopus.css'))
    .pipe(gulp.dest(paths.destCss))
    .on('end', done);
});


//This task clean the css directory
gulp.task('clean-css', [], function () {
  del(paths.destCss);
});


/**
 * Start Dev Server.
 */
gulp.task('serve', [
  'sass', 'sass:watch',
], function () {
  browserSync.init([
    paths.destCss, paths.devJS, paths.devHTML
  ], {
    server: {
      baseDir: "www",
      index: mainIndexFile
    },
    watchTask: true
  });
});

/**
 * Keep watcher to recompile SASS when some file changes.
 */
gulp.task('sass:watch', function () {
  gulp.watch(paths.sass, [
    'sass'
  ]);
});

