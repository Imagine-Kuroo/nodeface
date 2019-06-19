// test
const { src, dest } = require('gulp');
var uglify = require('gulp-uglify')
var browserSync = require('browser-sync')
var reload = browserSync.reload

exports.default = function () {
    return src('routes/*.js')
        .pipe(uglify())
        .pipe(dest('output/'))
}
