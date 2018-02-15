const gulp = require('gulp'),
      inject = require('gulp-inject'),
      imageResize = require('gulp-responsive'),
        gutil = require('gulp-util'),
        remove = require('gulp-clean'),
        watermark = require('gulp-watermark'),
        gm = require('gulp-gm'),
      compass = require('gulp-compass');

sassSources = ['components/sass/style.scss'];

gulp.task('compass', function() {
    gulp.src(sassSources)
        .pipe(compass({
         css:  'builds/development/css',
            sass: 'components/sass',
            image: 'builds/development/images',
            style: 'expanded'
    })
            .on('error', gutil.log))
        .pipe(gulp.dest('builds/development/css'))
});

gulp.task('remove', () => {
    gulp.src('builds/development/images', {read: false})
    .pipe(remove());
});

gulp.task('original', () => {
    gulp.src('components/images/*.{jpg,png}')
    .pipe(imageResize({
        '*': [{
            width: 375,
            rename: {
                extname: '.jpg',
            },
        }],
    }, {
        quality: 70,
        progressive: true,
    }))
    .pipe(gulp.dest('builds/development/images/'));
});

gulp.task('resizeXtraSmall', () => {
    gulp.src('components/images/*.{jpg,png}')
    .pipe(imageResize({
        '*': [{
            width: 375,
        }],
    }, {
        quality: 70,
        progressive: true,
    }))
    .pipe(gulp.dest('builds/development/images/xtraSmall'));
});

gulp.task('resizeSmall', () => {
    gulp.src('components/images/*.{jpg,png}')
    .pipe(imageResize({
        '*': [{
            width: 480,
        }],
    }, {
        quality: 70,
        progressive: true,
    }))
    .pipe(gulp.dest('builds/development/images/small'));
});

gulp.task('resizeMedium', () => {
    gulp.src('components/images/*.{jpg,png}')
    .pipe(imageResize({
        '*': [{
            width: 768,
        }],
    }, {
        quality: 70,
        progressive: true,
    }))
    .pipe(gulp.dest('builds/development/images/medium'));
});

gulp.task('resizeLarge', () => {
    gulp.src('components/images/*.{jpg,png}')
    .pipe(imageResize({
        '*': [{
            width: 1024,
        }],
    }, {
        quality: 70,
        progressive: true,
    }))
    .pipe(gulp.dest('builds/development/images/large'));
});

gulp.task('watermark', () => {
    gulp.src('builds/development/images/xtraSmall/*.jpg')
    .pipe(watermark({
        image: "components/watermarks/375.png",
        resize: '100x100',
        gravity: 'NorthEast'
    }))
    .pipe(gulp.dest('builds/development/images/xtraSmall'))
    
    gulp.src('builds/development/images/small/*.jpg')
    .pipe(watermark({
        image: "components/watermarks/480.png",
        resize: '100x100',
        gravity: 'NorthEast'
    }))
    .pipe(gulp.dest('builds/development/images/small'))
    
    gulp.src('builds/development/images/medium/*.jpg')
    .pipe(watermark({
        image: "components/watermarks/768.png",
        resize: '100x100',
        gravity: 'NorthEast'
    }))
    .pipe(gulp.dest('builds/development/images/medium'))
    
    gulp.src('builds/development/images/large/*.jpg')
    .pipe(watermark({
        image: "components/watermarks/1024.png",
        resize: '100x100',
        gravity: 'NorthEast'
    }))
    .pipe(gulp.dest('builds/development/images/large'))
    
});

gulp.task('resize', ['original', 'resizeXtraSmall', 'resizeSmall', 'resizeMedium', 'resizeLarge']);

gulp.task(
    'inject', () => {
        return gulp.src('components/html/index.html')
        .pipe(inject(gulp.src('builds/development/images/*', {
            read: false
        }), {
            transform: function(filepath) {
                if (filepath.slice(-4) === '.jpg') {
                    return '<div class="col-lg-4"><img class="img-fluid" src="images/' + filepath.slice(27) + '" sizes="(max-width: 40em) 100vw, 50vw" srcset="images/xtraSmall/' + filepath.slice(27) + ' 375w, images/small/' + filepath.slice(27) + ' 478w, images/medium/' + filepath.slice(27) + ' 768, images/large/' + filepath.slice(27) + ' 1024w"></div>';
                }
                return inject.transform.apply(inject.transform, arguments);
            }
        }))
        .pipe(gulp.dest('builds/development'))
    }
)


