// daclare gulpfile dependencies
const gulp              = require('gulp')
const coffee            = require('gulp-coffee')
const del               = require('del')
const path              = require('path')
const mergeStream       = require('merge-stream')
const browserSync       = require('browser-sync').create()

// declare application paths
const paths             = {
    framerSource:       path.join(__dirname, 'node_modules/framerjs/build/Framer/Project/framer/**/*'),
    framerDestination:  path.join(__dirname, 'build/framer'),
    projectSource:      path.join(__dirname, 'src'),
    projectBuild:       path.join(__dirname, 'build'),
    projectImages:      path.join(__dirname, 'build/images'),
    appJS:              path.join(__dirname, 'src/app.coffee'),
    appHTML:            path.join(__dirname, 'src/index.html'),
    appImages:          path.join(__dirname, 'src/images/**/*.{png, jpg, svg}'),
    appCSS:             path.join(__dirname, 'src/style.css')
}

// gulp tasks
gulp.task('clean', del.bind(null, paths.projectBuild))
gulp.task('cp:framerjs', () => gulp.src(paths.framerSource).pipe(gulp.dest(paths.framerDestination)))

gulp.task('cp:sources', () => {
    let htmlStream    = gulp.src(paths.appHTML).pipe(gulp.dest(paths.projectBuild));
    let imagesStream  = gulp.src(paths.appImages).pipe(gulp.dest(paths.projectImages));
    let cssStream     = gulp.src(paths.appCSS).pipe(gulp.dest(paths.projectBuild));
    return mergeStream(htmlStream, imagesStream, cssStream);
})

gulp.task('postinstallinfo', () => console.log('To start you have to fire: gulp serve:watch'))

gulp.task('coffee', () => {
    gulp.src(paths.appJS)
        .pipe(coffee({bare: true}))
        .pipe(gulp.dest(paths.projectBuild));
})

gulp.task('serve:watch', () => {
    browserSync.init({
      server: './build',
      files: path.join(__dirname, 'build/**/**/*.*'),
      notify: false,
    });
    gulp.watch([paths.appJS], ['coffee']);
});