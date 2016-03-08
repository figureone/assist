// Include gulp
var gulp = require('gulp');

// Include plugins
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var stripDebug = require('gulp-strip-debug');

// Imagemin
var optipng = require('gulp-optipng');
var options = ['-o2'];

// Optimize .png files
gulp.task('optipng', function() {
	return gulp.src('img/logos/*.png')
		.pipe(optipng(options))
		.pipe(gulp.dest('img/optimized/'));
});

// Concat & Minify JS Files
gulp.task('scripts', function(){
	return gulp.src(['assets/js/jquery.min.js', 'assets/js/bootstrap.min.js', 'assets/js/lunr.min.js', 'assets/js/set-query.js', 'assets/js/main.js', 'assets/js/modalizer.js', 'assets/js/search.js', 'assets/js/results.js'])
		.pipe(concat('all.js'))
		.pipe(rename({ suffix: '.min' }))
		.pipe(uglify())
		.pipe(gulp.dest('dist/js/'));
});

// Remove console and debugger statements
gulp.task('stripdebug', function() {
	return gulp.src('assets/js/*.js')
	.pipe(stripDebug())
	.pipe(gulp.dest('dist/js/'));
});

// Default task
gulp.task('default', ['scripts', 'optipng', 'stripdebug']);