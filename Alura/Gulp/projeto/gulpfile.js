var gulp = require('gulp'),
    imagemin = require('gulp-imagemin'),
    clean = require('gulp-clean'),
    concat = require('gulp-concat'),
    htmlReplace = require('gulp-html-replace'),
    sequence = require('gulp-sequence'),
    uglify = require('gulp-uglify'),
    usemin = require('gulp-usemin'),
    cssmin = require('gulp-cssmin'),
    browserSync = require('browser-sync'),
    jshint = require('gulp-jshint'),
    jshintStylish = require('jshint-stylish'),
    cssLint = require('gulp-csslint'),
    autoprefix = require('gulp-autoprefixer');

var argv = require('yargs').argv,
    source = argv.production ? 'dist' : 'src';

gulp.task('default', sequence(['copyfiles'], ['build-img', 'build-assets'], ['clear-unused']));

gulp.task('clean', () => {
    return gulp.src('./dist')
        .pipe(clean());
});

gulp.task('copyfiles', ['clean'], () => {
    return gulp.src('./src/**/*')
        .pipe(gulp.dest('./dist'));
});

gulp.task('build-img', () => {
    gulp.src('./dist/img/**/*')
        .pipe(imagemin())
        .pipe(gulp.dest('./dist/img'));
});

// gulp.task('build-js', () => {
//     gulp.src(['./dist/js/jquery.js', './dist/js/home.js', './dist/js/produto.js'])
//         .pipe(concat('scripts.js'))
//         .pipe(uglify())
//         .pipe(gulp.dest('./dist/js'));

//     gulp.src('./dist/js/!(*.scripts).js')
//         .pipe(clean());
// });

// gulp.task('build-css', () => {
//     gulp.src('./dist/css/**/*.css')
//         .pipe(concat('styles.css'))
//         .pipe(gulp.dest('./dist/css'));

//     gulp.src('./dist/css/!(*.styles).css')
//         .pipe(clean());
// });

// gulp.task('build-html', () => {
//     gulp.src('./dist/**/*.html')
//         .pipe(htmlReplace({
//             js: './js/scripts.js',
//             css: './css/styles.css'
//         }))
//         .pipe(gulp.dest('./dist'));
// });

gulp.task('build-assets', () => {
    return gulp.src('./dist/**/*.html')
        .pipe(usemin({
            js: [uglify],
            css: [autoprefix, cssmin]
        }))
        .pipe(gulp.dest('./dist'));
});

gulp.task('clear-unused', () => {
    gulp.src('./dist/js/!(*.min).js')
        .pipe(clean());

    gulp.src('./dist/css/!(*.min).css')
        .pipe(clean());
});

gulp.task('server', () => {
    browserSync.init({
        server: {
            baseDir: 'src' 
        }
    });

    gulp.watch(`${source}/**/*.js`).on('change', (event) => {
        gulp.src(event.path)
        .pipe(jshint())
        .pipe(jshint.reporter(jshintStylish));
    });
    gulp.watch(`${source}/**/*.css`).on('change', (event) => {
        gulp.src(event.path)
        .pipe(cssLint())
        .pipe(cssLint.reporter());
    });
    gulp.watch(`${source}/**/*`).on('change', browserSync.reload)
})