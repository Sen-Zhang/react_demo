var gulp    = require('gulp'),
    babel   = require('gulp-babel'),
    connect = require('gulp-connect'),
    open    = require('gulp-open'),
    watch   = require('gulp-watch');

var options = {
  port: 8080
};

gulp.task('babel', function () {
  gulp.src('js/components.js')
    .pipe(babel({
      presets: ['es2015', 'react']
    }))
    .pipe(gulp.dest('dist'));
});

gulp.task('connect', function () {
  connect.server({
    port: options.port,
    livereload: true
  });
});

gulp.task('open', function () {
  gulp.src(__filename)
    .pipe(open({uri: ('http://localhost:' + options.port + '/')}));
});

gulp.task('watch', function () {
  gulp.watch('js/components.js', ['babel']);
});

gulp.task('default', ['babel', 'connect', 'open', 'watch']);
