var gulp = require('gulp'),
    browserSyncOnj = require('browser-sync'),
    path = require('path'),
    sass = require('gulp-sass');

const rootFolder = 'work';
const PROXY_TARGET_URL = 'http://web69.pearl.de';


gulp.task('default', ['build']);
gulp.task('build', ['scss', 'browsersync', 'watch']);
gulp.task('proxy', ['scss', 'proxysync', 'watch']);

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
    gulp.watch([rootFolder + '/scss/**/*.*'], ['scss','reload']);
    gulp.watch([rootFolder + '/*.html'], ['reload']);
    gulp.watch([rootFolder + '/image/**/*.*'], ['reload']);
    gulp.watch([rootFolder + '/css/**/*.*'], ['reload']);
    gulp.watch([rootFolder + '/fonts/**/*.*'], ['reload']);
    gulp.watch([rootFolder + '/js/**/*.*'], ['reload']);
});
