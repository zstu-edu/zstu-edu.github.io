var gulp = require('gulp');

var watch = require('gulp-watch');

var filter = require('gulp-filter');

var build = require('./build');




gulp.task('watch',function(){
	// watch('source/views/css/**/*.css', function (cb) {
 //        gulp.src('source/views/css/**/*.css')
 //            .pipe(watch('source/views/css/**/*.css'))
 //            .on('end', cb);
 //    });

    // return gulp.src('source/views/css/**/*.css')
    //     .pipe(watch('source/views/css/**/*.css'))
    //     .pipe(changeF)
    //     .pipe(gulp.dest('build'));
    gulp.watch(['./build/css/**/*.css','./source/*/*.{html,md}'], ['build']);
  
});

gulp.task('build',function(){
	console.log('changed');
	build();
});



