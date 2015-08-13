var gulp = require('gulp'),
    webserver = require('gulp-webserver'),
    debug = require('gulp-debug'),
    del = require('del'),
    runSequence = require('run-sequence');

var path = {
    app: './app/',
    css: './app/',
    fonts: './app/fonts/{,*/}*.{eot,svg,ttf,woff}',
    images: './app/images/{,*/}*.{jpg,png,ico}',
    elementsIndex: './app/elements/{,*/}*.html',
    examplesFolder: './app/examples/{,*/}*.{html,json}',
    bowerComponents: './app/bower_components/**/*.*',
    dist: './dist/',
    distElements: './dist/elements'
};

gulp.task('webserver', function() {
    return gulp.src(path.app)
        .pipe(webserver({
            livereload: true,
            open: true,
        }));
});

gulp.task('webserver:dist', function() {
    return gulp.src(path.dist)
        .pipe(webserver({
            livereload: true,
            open: true,
        }));
});

gulp.task('dist-css', function() {
    return gulp.src(path.app + '*.css')
        .pipe(debug({
            title: 'file:'
        }))
        .pipe(gulp.dest(path.dist));
});

gulp.task('dist-ico', function() {
    return gulp.src(path.app + 'favicon.ico')
        .pipe(debug({
            title: 'file:'
        }))
        .pipe(gulp.dest(path.dist));
});

gulp.task('dist-images-app', function() {
    return gulp.src(path.images)
        .pipe(debug({
            title: 'file:'
        }))
        .pipe(gulp.dest(path.dist + 'images'));
});

gulp.task('dist-fonts', function() {
    return gulp.src(path.fonts)
        .pipe(debug({
            title: 'file:'
        }))
        .pipe(gulp.dest(path.dist + 'fonts'));
});

gulp.task('dist-index', function() {
    return gulp.src(path.app + 'index.html')
        .pipe(debug({
            title: 'file:'
        }))
        .pipe(gulp.dest(path.dist));
});

gulp.task('dist-examples', function() {
    return gulp.src(path.examplesFolder)
        .pipe(debug({
            title: 'file:'
        }))
        .pipe(gulp.dest(path.dist + 'examples'));
});

gulp.task('dist-elements', function() {
    return gulp.src(path.elementsIndex)
        .pipe(debug({
            title: 'file:'
        }))
        .pipe(gulp.dest(path.dist + 'elements'));
});

gulp.task('dist-bower', function() {
    return gulp.src(path.bowerComponents)
        .pipe(debug({
            title: 'file:'
        }))
        .pipe(gulp.dest(path.dist + 'bower_components'));
});


gulp.task('clean', function(cb) {
    del([
        'dist/**',
    ], cb);
});

gulp.task('serve', [
    'webserver'
]);

gulp.task('build', function(cb) {
    runSequence('clean',
        'dist-ico',
        'dist-css',
        'dist-fonts',
        'dist-images-app',
        'dist-bower',
        'dist-index',
        'dist-elements',
        'dist-examples',
        cb);
});

gulp.task('default', ['serve']);
gulp.task('serve:dist', ['webserver:dist']);
gulp.task('dist', ['build']);
