var gulp = require('gulp');  
var nodemon = require('gulp-nodemon');  
var sass = require('gulp-ruby-sass');  
var browserSync = require('browser-sync');
var autoprefixer = require('gulp-autoprefixer');  
var jshint = require('gulp-jshint');  
var livereload = require('gulp-livereload');  

gulp.task('styles', function() {  
  return sass('./styles/scss/*.scss', { style: 'expanded' })
    .pipe(autoprefixer('last 2 version'))
    .pipe(gulp.dest('./styles/css/'))
    .pipe(livereload());
});

gulp.task('scripts', function() {  
  return gulp.src('./scripts/controllers/*.js')
    .pipe(livereload());
});

gulp.task('html',function(){  
    return gulp.src('./views/*.html')
    .pipe(livereload());
});

gulp.task('watch', function() {  
    livereload.listen();
    gulp.watch('./styles/scss/*.scss', ['styles']);
    gulp.watch('./scripts/controllers/*.js', ['scripts']);
    gulp.watch('./views/*.html', ['html']);
});

gulp.task('server',function(){  
    nodemon({
        'script': 'index.js',
    });
});

gulp.task('serve', ['server','watch']);  