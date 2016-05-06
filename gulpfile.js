/*eslint-env node */
var gulp=require('gulp');
var babel=require('gulp-babel');
var sourcemaps=require('gulp-sourcemaps');
//var rename = require('gulp-rename');
var path=require('path');
//var gutil =require('gulp-util');


gulp.task('lib', function() {
  return stdGulpTrans('src', 'lib');
});

gulp.task('common', function() {
  return stdGulpTrans('src/common', 'dst/common');
});

gulp.task('newproject', function() {
  return rmdir(['ts']);
});

// ........functions .......
function stdGulpTrans(src, dst) {
  var sourceRoot = path.join(__dirname, src);
  var srcPath = [src+'/**/*.js'];
  return gulp
    .src(srcPath)
    .pipe(sourcemaps.init())
    .pipe(babel({
      'presets': ['es2015', 'stage-0'],
      'plugins': ['transform-flow-strip-types']
    }) )
    .pipe(sourcemaps.write('.', {
      includeContent: true, sourceRoot: sourceRoot, debug:true
    }))
    .pipe(gulp.dest(dst));
}

var fs = require('fs');
function rmdir(pathNames) {
  pathNames.forEach(function(pathName) {
    var stat = fs.statSync(pathName);
    if ( stat.isFile()) {
      rmfile(pathName);
      console.log('delete file : ' + pathName);
    }
    if (stat.isDirectory()) {
      var subPaths = fs.readdirSync(pathName)
        .map(function(subPathName) {
          return path.resolve(pathName, subPathName);
        });
      rmdir(subPaths);
      fs.rmdirSync(pathName);
      console.log('delete DIR : ' + pathName);
    }
  });

  function rmfile(name) {
    fs.unlinkSync(name);
  }
}
