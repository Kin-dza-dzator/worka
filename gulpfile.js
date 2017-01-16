var gulp = require('gulp'),
    browserSyncOnj = require('browser-sync'),
    modRewrite = require('connect-modrewrite'),
    sass = require('gulp-sass');

const rootFolder = 'work';



gulp.task('default', ['build']);
gulp.task('build', ['scss', 'browsersync', 'watch']);

gulp.task('scss', function () {
    return gulp.src(rootFolder + '/scss/**/*.*')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest(rootFolder +'/css'));
});

var browserSync = browserSyncOnj.create();
gulp.task('browsersync', function () {
    browserSync.init({
        server: {
            baseDir: './'+ rootFolder
        },
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
