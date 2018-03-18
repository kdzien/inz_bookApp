var gulp = require('gulp');  
var nodemon = require('gulp-nodemon');  
var sass = require('gulp-sass');
var browserSync = require('browser-sync');
var jshint = require('gulp-jshint');  
var livereload = require('gulp-livereload');  
const sourcemaps = require('gulp-sourcemaps');

gulp.task('sass', function () {
    return gulp.src('./styles/scss/*.scss',{sourcemap: true})
        .pipe(sourcemaps.init())
      .pipe(sass().on('error', sass.logError))
      .pipe(sourcemaps.write('maps', {
        includeContent: false,
        sourceRoot: 'source'
    }))
      .pipe(gulp.dest('./styles/css/'))
      .pipe(browserSync.stream());
  });

gulp.task('scripts', function() {  
  return gulp.src('./scripts/controllers/*.js')
});

gulp.task('html',function(){  
    return gulp.src('./views/*.html')
    .pipe(browserSync.stream());
});

gulp.task('watch', function() {  
    browserSync.init({
        proxy: "http://localhost:3000",
        port: 7000,
    });
    gulp.watch('./styles/scss/*.scss', ['sass']);
    gulp.watch('./scripts/controllers/*.js', ['scripts']);
    gulp.watch('./views/*.html', ['html']);
});

gulp.task('server',function(){  
    nodemon({
        'script': 'index.js',
    });
});

gulp.task('serve', ['server','watch']);  