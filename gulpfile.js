/**
 * Automatization GULP file.
 * @author Jose Figueruela <jfigueruela@gmail.com>
 * @version 0.0.1
 */

// var configDev = require('./configs/config_dev.json');
// var config = require('./configs/config.json');
var gulp = require('gulp'), sass = require('gulp-ruby-sass'), autoprefixer = require('gulp-autoprefixer'), minifycss = require('gulp-minify-css'), jshint = require('gulp-jshint'), uglify = require('gulp-uglify'), imagemin = require('gulp-imagemin'), rename = require('gulp-rename'), concat = require('gulp-concat'), cache = require('gulp-cache'), livereload = require('gulp-livereload'), browserSync = require('browser-sync'), gutil = require('gulp-util'), del = require('del'), imagemin = require('gulp-imagemin'), pngquant = require('imagemin-pngquant');

gulp
    .task(
        'default',
        function() {
          console.log('\n');
          console.log('\n');
          console.log(gutil.colors.bgCyan.bold.underline('Octopus'));
          console.log(gutil.colors.green('------------------------'));
          console.log(gutil.colors.green('| '
              + gutil.colors.yellow('Hello Percutor Team!')
              + gutil.colors.green(' |')));
          console.log(gutil.colors.green('------------------------'));
          console.log(gutil.colors.green('Tasks supported:'));
          console
              .log(gutil.colors
                  .green('-----------------------------------------------------------------------------'));
          console.log(' -> ' + gutil.colors.blue('sass')
              + ': Compile SASS files and copy to destination file.');
          console.log(' -> ' + gutil.colors.blue('sass:watch')
              + ': Keep watcher to recompile SASS when some file changes.');
          console.log(' -> ' + gutil.colors.blue('copyExternalJSLibs')
              + ': Copy external JS libs to DIST folder.');
          console.log(' -> ' + gutil.colors.blue('copyExternalCSS')
              + ': Copy external CSS to DIST folder.');
          console.log(' -> ' + gutil.colors.blue('copyExternalFonts')
              + ': Copy external Fonts to DIST folder.');
          console.log(' -> ' + gutil.colors.blue('minimize')
              + ': Minimize and compress Sass files into Css min.');
          console.log(' -> ' + gutil.colors.blue('compressExternalJSLibs')
              + ': Copy and compress libs into external folder.');
          console.log(' -> ' + gutil.colors.blue('cleanExternalJSLibs')
              + ': Remove from file system folder all external JS libs.');
          console.log(' -> ' + gutil.colors.blue('minimizeImages')
              + ': Minimize compress images into dist folder.');
          console.log(' -> ' + gutil.colors.blue('remove:dist')
              + ': Remove from file system dist folder.');
          console.log(' -> ' + gutil.colors.blue('build:dev')
              + ': Initialize all external dependencies.');
          console.log(' -> ' + gutil.colors.blue('build:dist')
              + ': Build distribution version.');
          console
              .log(' -> '
                  + gutil.colors.blue('deploy')
                  + ': Deploy files to main project. (run build:dist before if it is necessary.)');
          console.log(' -> ' + gutil.colors.blue('serve')
              + ': Start Dev Server.');
          console
              .log(gutil.colors
                  .green('-----------------------------------------------------------------------------'));
        });
/**
 * Supported Gulp tasks.
 */
gulp.task('help', [
  'default'
]);

/**
 * Compile Sass files and copy to destination file.
 */
gulp.task('sass', function() {
  return sass([
    './sass/*.scss'
  ], {
    style : 'expanded'
  }).pipe(autoprefixer('last 2 version')).pipe(
      gulp.dest('webapp/resources/css')).on('end', function() {
    console.log(gutil.colors.green('Sass task complete.'))
  })
});

/**
 * Minimize and compress Sass files into Css min.
 */
gulp.task('minimize', function() {
  return sass([
    './sass/*.scss'
  ], {
    style : 'compress'
  }).pipe(rename({
    suffix : '.min'
  })).pipe(minifycss()).pipe(gulp.dest('www/css'));
});

/**
 * Start Dev Server.
 */
gulp.task('serve', [
    'sass:watch'
], function() {
  browserSync.init([
      './www/css/*.css', './www/**/*.js'
  ], {
    server : {
      baseDir : "www",
      index : "index.html"
    },
    watchTask : true
  });
});

/**
 * Keep watcher to recompile SASS when some file changes.
 */
gulp.task('sass:watch', function() {
  gulp.watch('sass/**/*.scss', [
    'sass'
  ]);
});

/**
 * Copy external JS libs to DIST folder.
 */
// gulp.task('copyExternalJSLibs', function () {
// gulp.src(config.externalLibs)
// .pipe(gulp.dest('webapp/resources/js/'));
// });
//
// /**
// * Copy external Css to DIST folder.
// */
// gulp.task('copyExternalCSS', function () {
// gulp.src([
// './bower_components/fontawesome/css/font-awesome.min.css'
// ])
// .pipe(gulp.dest('webapp/resources/css'));
// });
//
// /**
// * Copy external Fonts to Dist folder.
// */
// gulp.task('copyExternalFonts', function () {
// // Font Awesome
// gulp.src('./bower_components/fontawesome/fonts/*.{ttf,woff,woff2}')
// .pipe(gulp.dest('webapp/resources/fonts'));
// // Glyph Icons
// gulp.src('./bower_components/bootstrap-sass/assets/fonts/bootstrap/*.{ttf,woff,woff2}')
// .pipe(gulp.dest('webapp/resources/fonts'));
// });
//
// /**
// * Copy and compress libs into external folder.
// */
// gulp.task('compressExternalJSLibs', function (cb) {
// gulp.src(config.externalLibs)
// .pipe(uglify())
// .pipe(concat(config.javascriptBundleFile))
// .pipe(gulp.dest('dist/webapp/resources/js')).on('end', function() {
// console.log(gutil.colors.green('compressExternalJSLibs task complete,
// generated external folder destination.'))
// });
// });
//
// /**
// * Remove from file system folder all external JS libs.
// */
// gulp.task('cleanExternalJSLibs', function () {
// del(['./webapp/resources/js/*.js']).then(function (paths) {
// console.log(gutil.colors.green('Deleted files/folders:\n'),
// gutil.colors.blue(paths.join('\n')));
// });
// });
//
// /**
// * Copy custom CSS to Dist folder
// */
// gulp.task('copyCustomCSS', ['sass'], function () {
// gulp.src('./webapp/resources/css/**/*')
// .pipe(gulp.dest('dist/webapp/resources/css'));
// });
//
// /**
// * Minimize compress images into dist folder.
// */
// gulp.task('minimizeImages', function () {
// return gulp.src('./webapp/resources/images/*')
// .pipe(imagemin({
// progressive: true,
// svgoPlugins: [{removeViewBox: false}],
// use: [pngquant()]
// }))
// .pipe(gulp.dest('dist/webapp/resources/images'));
// });
//
// /**
// * Initialize dependencies.
// * */
// gulp.task('build:dev', ['copyExternalJSLibs', 'copyExternalCSS',
// 'copyExternalFonts', 'copyCustomCSS']);
//
//
// /**
// * Remove from file system dist folder.
// */
// gulp.task('remove:dist', function () {
// del(['./dist']).then(function (paths) {
// console.log(gutil.colors.green('Deleted files/folders:\n'),
// gutil.colors.blue(paths.join('\n')));
// });
// });
//
// /**
// * Build distribution version.
// */
// gulp.task('build:dist', ['remove:dist', 'build:dev'], function(cb) {
// gulp.src(['webapp/**/*',
// '!webapp/resources/images/*','!webapp/resources/{sass,sass/**}'])
// .pipe(gulp.dest('dist/webapp/')).on('end',
// function(){console.log(gutil.colors.green('Generated distribution "dist"
// folder.'))});
// });
//
// /**
// * Deploy files. Don't forget configure destination deploy files in
// config.json_template file. (Rename to config.json)
// */
// gulp.task('deploy', function() {
// // Deploy CSS file
// gulp.src(config.paths.css)
// .pipe(gulp.dest(configDev.destinationWebappFolderPath +
// '/resources/css/')).on('end', function() {
// console.log(gutil.colors.green('Deployed CSS files:\n'),
// gutil.colors.blue(config.paths.css.join('\n')) +
// gutil.colors.blue(' in ' + configDev.destinationWebappFolderPath +
// '/resources/css/'));
// });
// // Deploy javascript file
// gulp.src(config.paths.js + config.javascriptBundleFile)
// .pipe(gulp.dest(configDev.destinationWebappFolderPath +
// '/resources/js/')).on('end', function() {
// console.log(gutil.colors.green('Deployed javascript files:\n'),
// gutil.colors.blue(config.paths.js.join('\n')) +
// gutil.colors.blue(' in ' + configDev.destinationWebappFolderPath +
// '/resources/js/'));
// });
// // Deploy fonts
// gulp.src(config.paths.fonts)
// .pipe(gulp.dest(configDev.destinationWebappFolderPath +
// '/resources/fonts')).on('end', function() {
// console.log(gutil.colors.green('Deployed fonts files:\n'),
// gutil.colors.blue(config.paths.fonts.join('\n')) +
// gutil.colors.blue(' in ' + configDev.destinationWebappFolderPath +
// '/resources/fonts'));
// });
// });
