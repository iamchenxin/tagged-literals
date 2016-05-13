/*eslint-env node */
var gulp=require('gulp');
var babel=require('gulp-babel');
var sourcemaps=require('gulp-sourcemaps');
var rename = require('gulp-rename');
var path=require('path');
const fbjsConfigure = require('babel-preset-fbjs/configure');
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

gulp.task('flow', function() {
  return flowType('src', 'lib');
});

// ........functions .......
function flowType(src, dst) {
  var srcPath = [src+'/**/*.js',
    '!'+src+'/**/__tests__/**', '!'+src+'/**/__mocks__/**'];
  return gulp
    .src(srcPath)
    .pipe(rename({extname: '.js.flow'}))
    .pipe(gulp.dest(dst));
}

function stdGulpTrans(src, dst) {
  var sourceRoot = path.join(__dirname, src);
  var srcPath = [src+'/**/*.js',
    '!'+src+'/**/__tests__/**', '!'+src+'/**/__mocks__/**'];
  return gulp
    .src(srcPath)
    .pipe(sourcemaps.init())
    .pipe(babel({
      presets: [
        fbjsConfigure({
          autoImport: false,
          target: 'js',
        }),
      ],
    }))
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
