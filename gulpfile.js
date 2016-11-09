var gulp = require('gulp');
var less  = require('gulp-less');
var sass = require('gulp-sass');
var browserSync = require('browser-sync').create();
var useref = require('gulp-useref');
var uglify = require('gulp-uglify');
var gulpIf = require('gulp-if');
var cssnano = require('gulp-cssnano');
var imagemin = require('gulp-imagemin');
var cache = require('gulp-cache');
var del = require('del');
var runSequence = require('run-sequence');
var sprity = require('sprity');
var babel = require('gulp-babel');

gulp.task('less', function(){
  return gulp.src('app/less/**/*.less')// Gets all files ending with .less in app/less and children dirs
  .pipe(less())
  .pipe(gulp.dest('app/css'))
  .pipe(browserSync.reload({
    stream: true
  }))
});
gulp.task('browserSync', function(){
  browserSync.init({
     server : {
       baseDir : 'app'
     },
  })
});
gulp.task('imagemin', function(){
  return gulp.src('app/images/**/*.+(jpg|jpeg|png|gif|svg)')
  .pipe(cache(imagemin({
    interlaced : true
  })))
  .pipe(gulp.dest('dist/images'))
});
gulp.task('fonts', function(){
  return gulp.src('app/fonts/**/*')
  .pipe(gulp.dest('dist/fonts'))
});
gulp.task('clean:dist', function(){
  return del.sync('dist');
});
gulp.task('clean:cache', function(callback){
  return cache.clearAl(callback)
})
//Concatenate all js files into one file, using code in index.html file in app
gulp.task('useref', function(){
  return gulp.src('app/*.html')
  .pipe(useref())
  //Minifies only if ts a Javascript file
  .pipe(gulpIf('*.js', uglify()))
  //Minifies only if its a css file
  .pipe(gulpIf('*.css', cssnano()))
  .pipe(gulp.dest('dist'))
});
gulp.task('sprity', function(){
  return sprity.src({
    src : 'app/images/**/*.+(png|jpg|jpeg|gif|mov)',
    style  : 'app/sprite.css',
    processor : 'sass',
  })
  .pipe(gulpIf('*.png', gulp.dest('dist/img'), gulp.dest('dist/css/')))
});
gulp.task('babel', function(){
  return gulp.src('app/js/*.js')
  .pipe(babel({
    presets : ['es2015']
  }))
  .pipe(gulp.dest('dist'));
});

gulp.task('build', function(callback){
  runSequence('clean:dist', ['less', 'useref', 'fonts', 'imagemin'], callback)
});
gulp.task('default', function(callback){
  runSequence(['less','browserSync','watch'])
});
//Gulp watch syntax -> watching my less files, no need to reload tasks in terminal
gulp.task('watch',['browserSync', 'less'], function(){
  gulp.watch("app/less/**/*.less", ['less']);
  gulp.watch('app/*.html', browserSync.reload);
  gulp.watch('app/js/**/*.js', browserSync.reload);
});
