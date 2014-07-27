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
        server: {
            baseDir: './build'
        },
        notify: true
    });
});

gulp.task('scripts', function() {
    return gulp.src('app/scripts/**/*.js')
        .pipe(jshint())
        .pipe(jshint.reporter(stylish))
        .pipe(concat('bundle.js'))
        .pipe(gulp.dest('./build/js'));
});

gulp.task('html', function() {
    return gulp.src('app/index.html')
        .pipe(gulp.dest('./build'))
        .pipe(browserSync.reload({stream: true}));
});

gulp.task('styles', function() {
    return gulp.src('app/sass/styles.scss')
        .pipe(sass({sourcemap: true, sourcemapPath: './app/sass', style: 'compact'}))
        .pipe(prefix('last 2 versions', '> 1%', 'ie 9', 'ie 8'))
        .pipe(gulp.dest('build/css'))
        .pipe(browserSync.reload({stream: true}));
});

gulp.task('images', function() {
    
});

gulp.task('default', ['styles', 'html', 'scripts']);

gulp.task('watch', ['styles', 'html', 'scripts', 'browser-sync'], function () {
    gulp.watch('app/sass/**/*.scss', ['styles']);
    gulp.watch('app/index.html', ['html']);
    gulp.watch('app/scripts/**/*.js');
});
