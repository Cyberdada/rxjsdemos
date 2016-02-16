var gulp = require('gulp'), 
clean = require('gulp-clean')

var outcat = '../demoout'

var filesToMove = 
['./src/lib/**/*.*', 
'./src/app/*.html',
'./src/app/**/*.html',
'./node_modules/**/*.*',
'./node_modules/.bin/*.*',
'./src/*.html',
'./src/app.css', 
'./server/favicon.ico']

gulp.task('moveall',function() {
      gulp.src(filesToMove, { base: './' })
  .pipe(gulp.dest(outcat)); 
  });
 
 gulp.task('clean', function(){
  return gulp.src([outcat], {read:false})
  .pipe(clean());
});


gulp.task('default', ['moveall'], function () {
    console.log("gulp gulp");
    
    });