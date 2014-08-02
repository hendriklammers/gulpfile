'use strict';

var gulp = require('gulp'),
    sass = require('gulp-ruby-sass'),
    prefix = require('gulp-autoprefixer'),
    browserSync = require('browser-sync'),
    jshint = require('gulp-jshint'),
    stylish = require('jshint-stylish'),
    concat = require('gulp-concat'),
    filter = require('gulp-filter');

gulp.task('browser-sync', function() {
    browserSync.init({
        server: {
            baseDir: ['build', 'app']
        },
        notify: true
    });
});

gulp.task('scripts', function() {
    return gulp.src('app/scripts/**/*.js')
        .pipe(jshint())
        .pipe(jshint.reporter(stylish))
        .pipe(concat('bundle.js'))
        .pipe(gulp.dest('./build/js'))
        .pipe(browserSync.reload({stream: true}));
});

gulp.task('html', function() {
    return gulp.src('app/index.html')
        .pipe(gulp.dest('./build'))
        .pipe(browserSync.reload({stream: true}));
});

gulp.task('styles', function() {
    return gulp.src('app/sass/**/*.scss')
        .pipe(sass({style: 'compact', sourcemap: true, sourcemapPath: '../sass'}))
        .pipe(prefix('last 2 versions', '> 1%', 'ie 9', 'ie 8'))
        .pipe(gulp.dest('build/css'))
        .pipe(filter('**/*.css'))   // Filter stream to only css files
        .pipe(browserSync.reload({stream: true}));
});

gulp.task('default', ['clean', 'styles', 'html', 'scripts']);

gulp.task('watch', ['styles', 'html', 'scripts', 'browser-sync'], function () {
    gulp.watch('app/sass/*.scss', ['styles']);
    gulp.watch('app/index.html', ['html']);
    gulp.watch('app/scripts/**/*.js', ['scripts']);
});
