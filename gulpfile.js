var gulp = require('gulp');
var connect = require('gulp-connect');
var less = require('gulp-less');
var watch = require('gulp-watch');

var del = require('del');
var path = require('path');

gulp.task('default', ['connect', 'watch']);

gulp.task('clean:html', function (cb) {
  del(['dist/**/*.html'], cb);
});
 
gulp.task('clean:css', function (cb) {
  del(['dist/**/*.css'], cb);
});
 
gulp.task('connect', ['build'], function() {
  connect.server({
    root: 'dist',
    livereload: true
  });
});
 
gulp.task('build', ['build:less', 'build:html']);

gulp.task('build:html', ['clean:html'], function () {
  gulp.src('./src/**/*.html')
    .pipe(gulp.dest('./dist'))
    .pipe(connect.reload());
});

gulp.task('build:less', ['clean:css'], function() {
  gulp.src('./src/less/**/index.less')
    .pipe(less({
      paths: [ path.join(__dirname, 'less', 'includes') ]
    }))
    .pipe(gulp.dest('./dist/css'))
    .pipe(connect.reload());
});

gulp.task('watch', ['build'], function() {
  gulp.watch(['./src/less/**/*.less'], ['build:less']);
  gulp.watch(['./src/**/*.html'], ['build:html']);
});
