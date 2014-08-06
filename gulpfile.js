'use strict';

var gulp = require('gulp'),
    sass = require('gulp-ruby-sass'),
    prefix = require('gulp-autoprefixer'),
    browserSync = require('browser-sync'),
    jshint = require('gulp-jshint'),
    stylish = require('jshint-stylish'),
    concat = require('gulp-concat');

gulp.task('browser-sync', function() {
    browserSync.init({
        files: [
            'index.html',
            'assets/**/*'
        ],
        server: {
            baseDir: ['./']
        },
        notify: true
    });
});

gulp.task('jshint', function() {
    return gulp.src('src/app.js')
        .pipe(jshint())
        .pipe(jshint.reporter(stylish));
});

gulp.task('scripts', ['jshint'], function() {
    return gulp.src(['src/app.js'])
        .pipe(concat('bundle.js'))
        .pipe(gulp.dest('assets/js'));
});

gulp.task('styles', function() {
    return gulp.src('sass/**/*.scss')
        .pipe(sass({style: 'compact', sourcemap: true, sourcemapPath: '../../sass'}))
        .pipe(prefix('last 2 versions', '> 1%', 'ie 9', 'ie 8'))
        .pipe(gulp.dest('assets/css'));
});

gulp.task('default', ['styles', 'scripts']);

gulp.task('watch', ['styles', 'scripts', 'browser-sync'], function () {
    gulp.watch('sass/*.scss', ['styles']);
    gulp.watch('src/**/*.js', ['scripts']);
});
