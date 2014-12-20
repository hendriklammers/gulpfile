'use strict';

var gulp = require('gulp'),
    plugins = require('gulp-load-plugins')(),
    browserSync = require('browser-sync'),

    path = {
        html: '*.html',
        scripts: 'src/**/*.js',
        styles: 'sass/**/*.scss'
    };

gulp.task('browser-sync', function() {
    browserSync.init({
        files: [
            path.html,
            'dist/**/*.js'
        ],
        server: {
            baseDir: ['./']
        },
        notify: true
    });
});

gulp.task('jshint', function() {
    return gulp.src('src/**/*.js')
        .pipe(plugins.jshint())
        .pipe(plugins.jshint.reporter('jshint-stylish'));
});

gulp.task('scripts', ['jshint'], function() {
    return gulp.src(['src/app.js'])
        .pipe(plugins.concat('bundle.js'))
        .pipe(gulp.dest('dist'));
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
