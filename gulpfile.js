var gulp = require('gulp'),
    sass = require('gulp-sass'),
    postcss = require('gulp-postcss'),
    rucksack = require('gulp-rucksack'),
    sourcemaps = require('gulp-sourcemaps'),
    cssnano = require('cssnano'),
    browsersync = require('browser-sync').create();
    

gulp.task('browser-sync', function() {
    browsersync.init({
        server: {
            baseDir: "./"
        }
    });
});  


gulp.task('sass', function(){
    
    var processors = [
        cssnano({discardUnused: false})
    ];    
    
    gulp.src('./scss/**/*.{scss, sass}')
    
    //initialise sourcemaps
    .pipe(sourcemaps.init())
    
    //inject SASS with Susy and Gulp SASS
    .pipe(sass({
        includePath: ['node_modules/susy/sass']
    }).on('error', sass.logError))
    
    .pipe(rucksack({autoprefixer: true}))
    
    .pipe(postcss(processors))
    
    //writes sourcemaps in CSS folder
    .pipe(sourcemaps.write('./maps'))
    
    //outputs CSS files in CSS folder
    .pipe(gulp.dest('./css'))
    
    //live reload in all browsers
    .pipe(browsersync.reload({stream: true}));
});


//Watch SCSS folder for changes
gulp.task('watch', function(){
   gulp.watch('./scss/**/*.{scss, sass}', ['sass']);
   gulp.watch('*.html').on('change', browsersync.reload);
});


//Create default task
gulp.task('default', ['sass', 'watch', 'browser-sync']);