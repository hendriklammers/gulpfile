'use strict';

var gulp = require('gulp'),
    plugins = require('gulp-load-plugins')(),
    browserSync = require('browser-sync'),
    stylish = require('jshint-stylish');

gulp.task('browser-sync', function() {
    browserSync.init({
        files: [
            'index.html',
            'js/**/*.js'
        ],
        server: {
            baseDir: ['./']
        },
        notify: true
    });
});

gulp.task('jshint', function() {
    return gulp.src('src/app.js')
        .pipe(plugins.jshint())
        .pipe(plugins.jshint.reporter(stylish));
});

gulp.task('scripts', ['jshint'], function() {
    return gulp.src(['src/app.js'])
        .pipe(plugins.concat('bundle.js'));
        // .pipe(gulp.dest('dist/js'));
});

gulp.task('sass', function() {
    return plugins.rubySass('sass', {sourcemap: true, style: 'expanded'})
        .on('error', function(err) {
            console.error('Error', err.message);
        })

        .pipe(plugins.autoprefixer('last 2 versions', '> 1%', 'ie 9'))
        .pipe(plugins.sourcemaps.write())

        .pipe(gulp.dest('css'));
});

gulp.task('default', ['styles', 'scripts']);

gulp.task('watch', ['sass', 'scripts', 'browser-sync'], function () {
    gulp.watch('sass/**/*.scss', ['sass']);
    gulp.watch('src/**/*.js', ['scripts']);
});
