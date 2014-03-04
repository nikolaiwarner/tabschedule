var gulp = require('gulp');
var watch = require('gulp-watch');
var coffee = require('gulp-coffee');
var haml = require('gulp-haml');
var less = require('gulp-less');

var coffee_path = './src/coffee';
var haml_path = './src/haml';
var less_path = './src/less';
var on_error = function (err) { console.error(err.message); };

gulp.task('coffee', function() {
  gulp.src(coffee_path + '/**/*.coffee')
    .pipe(coffee({bare: true})).on('error', on_error)
    .pipe(gulp.dest('./app'))
});

gulp.task('haml', function () {
  gulp.src(haml_path + '/**/*.haml')
    .pipe(haml())
    .pipe(gulp.dest('./app'));
});

gulp.task('less', function () {
  gulp.src(less_path + '/**/*.less')
    .pipe(less())
    .pipe(gulp.dest('./app'));
});

gulp.task('watch', function() {
  gulp.watch([coffee_path + '/**/*.coffee'], ['coffee']);
  gulp.watch([haml_path + '/**/*.haml'], ['haml']);
  gulp.watch([less_path + '/**/*.less'], ['less']);
});

gulp.task('default', ['watch']);
