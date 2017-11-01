var gulp = require('gulp');  
var nodemon = require('gulp-nodemon');  
var sass = require('gulp-ruby-sass');  
var browserSync = require('browser-sync');
var autoprefixer = require('gulp-autoprefixer');  
var jshint = require('gulp-jshint');  
var livereload = require('gulp-livereload');  

gulp.task('styles', function() {  
  return sass('styles/scss/*.scss', { style: 'expanded' })
    .pipe(autoprefixer('last 2 version'))
    .pipe(gulp.dest('styles/css/'))
    .pipe(livereload());
});

gulp.task('scripts', function() {  
  return gulp.src('scripts/*.js')
    .pipe(jshint('.jshintrc'))
    .pipe(jshint.reporter('default'))
    .pipe(livereload());
});

gulp.task('html', function(){
	
	browserSync.reload();
})

gulp.task('watch', function() {  
    livereload.listen();
    gulp.watch('styles/scss/*.scss', ['styles']);
    gulp.watch('scripts/js/*.js', ['scripts']);
    gulp.watch('views/*.html', ['html']);
});

gulp.task('server',function(){  
    nodemon({
        'script': 'index.js',
        'ignore': 'scripts/*.js'
    });
});

gulp.task('serve', ['server','watch']);  