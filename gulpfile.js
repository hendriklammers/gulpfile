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
            'css/*.css',
            'dist/*.js'
        ],
        server: {
            baseDir: ['./']
        },
        notify: true
    });
});

gulp.task('jshint', function() {
    return gulp.src(path.scripts)
        .pipe(plugins.jshint())
        .pipe(plugins.jshint.reporter('jshint-stylish'));
});

gulp.task('uglify', function() {
    return gulp.src(path.scripts)
        .pipe(plugins.sourcemaps.init())
        .pipe(plugins.concat('app.js'))
        .pipe(gulp.dest('dist'))
        .pipe(plugins.uglify())
        .pipe(plugins.rename({suffix: '.min'}))
        .pipe(plugins.sourcemaps.write('./'))
        .pipe(gulp.dest('dist'));
});

gulp.task('sass', function() {
    return plugins.rubySass('sass', {sourcemap: true, style: 'expanded'})
        .on('error', handleError)
        .pipe(plugins.autoprefixer('last 2 versions', '> 1%', 'ie 9'))
        .pipe(plugins.sourcemaps.write())
        .pipe(gulp.dest('css'));
});

gulp.task('default', ['sass', 'jshint', 'uglify']);

gulp.task('watch', ['browser-sync'], function () {
    gulp.watch(path.styles, ['sass']);
    gulp.watch(path.scripts, ['jshint', 'uglify']);
});

/**
 * Displays error message in the console
 * @param error
 */
function handleError(error) {
    plugins.util.log(plugins.util.colors.red(error));
}
