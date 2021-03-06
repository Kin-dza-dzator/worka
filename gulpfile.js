var gulp = require('gulp'),
    browserSyncOnj = require('browser-sync'),
    path = require('path'),
    sass = require('gulp-sass'),
    jade = require('gulp-jade'),
    gulpdata = require('gulp-data'),
    emailBuilder = require('gulp-email-builder');

const rootFolder = 'wpt-152';
const PROXY_TARGET_URL = 'http://web69.pearl.de';

gulp.task('default', ['build']);
// gulp.task('build', ['jade', 'scss', 'browsersync', 'watch']);
gulp.task('build', ['scss', 'browsersync', 'watch']);
gulp.task('proxy', ['scss', 'proxysync', 'watch']);
var DATA = {};
const DATA_FILE = path.resolve(rootFolder , 'data/data.json');

gulp.task('data', function() {
    delete require.cache[require.resolve( DATA_FILE )];
    DATA = require( DATA_FILE );
});

gulp.task('jade',['data'], function() {
    gulp.src(rootFolder + '/jade/index.*')
        .pipe(jade({
            locals: DATA,
            pretty: true,
            basedir: path.resolve(rootFolder)
        }))
        .pipe(gulp.dest(rootFolder))
});


var emailBuilderOptions = {
    encodeSpecialChars: true
};
gulp.task('emailBuilder', function() {
    return gulp.src([rootFolder + '/*.html'])
        .pipe(
            emailBuilder(emailBuilderOptions).build()
        )
        .pipe(gulp.dest(rootFolder + '/dist'));
});

gulp.task('scss', function () {
    return gulp.src(rootFolder + '/scss/**/*.*')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest(rootFolder +'/css'));
});

var browserSync = browserSyncOnj.create();
gulp.task('browsersync', function () {
    browserSync.init({
        port:3000,
        server: {
            baseDir: './'+ rootFolder
        },
        //открывать браузер автоматом
        open: false
    });
});

gulp.task('proxysync', function () {
    browserSync.init({
        port:3000,
        proxy: PROXY_TARGET_URL,
        serveStatic: [
            path.resolve('./web69/')
        ],
        //открывать браузер автоматом
        open: false
    });
});

gulp.task('reload',['scss'], function(){
    return browserSync.reload();
});

gulp.task('watch',function () {
    gulp.watch([rootFolder + '/scss/**/*.*'], ['scss','jade','reload']);
    gulp.watch([rootFolder + '/jade/**/*.*'], ['jade','reload']);
    gulp.watch([rootFolder + '/data/**/*.*'],['data','jade','reload']);
    gulp.watch([rootFolder + '/*.html'], ['reload']);
    gulp.watch([rootFolder + '/image/**/*.*'], ['reload']);
    gulp.watch([rootFolder + '/css/**/*.*'], ['reload']);
    gulp.watch([rootFolder + '/fonts/**/*.*'], ['reload']);
    gulp.watch([rootFolder + '/js/**/*.*'], ['reload']);
});
