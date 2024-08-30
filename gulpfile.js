var gulp = require('gulp')
var rename = require('gulp-rename');
var sass = require('gulp-ruby-sass')
var connect = require('gulp-connect')
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var browserify = require('browserify')
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');

gulp.task('connect', function () {
	connect.server({
		root: 'app',
		port: 4000
	})
})

gulp.task('browserify', function() {
    // Grabs the app.js file
    return browserify('./app/app.js')
        // bundles it and creates a file called main.js
        .bundle()
        .pipe(source('main.js'))
        // saves it the public/js/ directory
        .pipe(gulp.dest('./app/app_content/js/'));
})


gulp.task('sass', function() {
	return sass('./app/app_content/sass/style.sass', {style: 'compressed'})
        .pipe(rename({suffix: '.min'}))
		.pipe(gulp.dest('./app/app_content/css'))
})

gulp.task('watch', function() {
	gulp.watch('./app/app.js', ['browserify'])
	gulp.watch('./app/app_content/sass/style.sass', ['sass'])
})

gulp.task('default', ['connect', 'browserify', 'watch'])


