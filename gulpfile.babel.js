import gulp from 'gulp';
import gulploadplugins from 'gulp-load-plugins';
import runSequence from 'run-sequence';
import yargs from 'yargs';
import browserSync from 'browser-sync';
import pkgInfo from './package.json';

const $ = gulploadplugins({
    lazy: true
});

const argv = yargs.argv;

// SASS Styles
gulp.task('styles', () => {

  return gulp.src([
    'src/vendor/**/*.css',
    'src/sass/*.scss'
  ])
    .pipe($.changed('.tmp/styles', {extension: '.css'}))
    .pipe($.if(!argv.production,$.sourcemaps.init()))
    .pipe($.sass({
      precision: 10
    }).on('error', $.sass.logError))
    .pipe($.autoprefixer({ browsers: ['last 10 version'] }))
    .pipe(gulp.dest('.tmp'))
    // Concatenate and minify styles if production mode (via gulp styles --production) 
    .pipe($.if('*.css' && argv.production, $.minifyCss()))
    .pipe($.if(!argv.production,$.sourcemaps.write()))
    .pipe(gulp.dest('public/css'))
    .pipe($.size({title: 'styles'}));
});


// Browser-Sync
gulp.task('serve', ['styles'], () => {
  browserSync({
    notify: false,
    logPrefix: 'H5ES6',
    server: ['.tmp', 'public']
  });

  gulp.watch(['public/**/*.html'], browserSync.reload);
  gulp.watch(['src/styles/**/*.{scss,css}'], ['styles', browserSync.reload]);
  //gulp.watch(['app/scripts/**/*.js'], ['jshint']);
  //gulp.watch(['app/images/**/*'], browserSync.reload);
});