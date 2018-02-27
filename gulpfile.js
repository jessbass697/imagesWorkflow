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

gulp.task('removeImages', () => {
    gulp.src('builds/development/images', {read: false})
    .pipe(remove());
});

gulp.task('removeHtml', () => {
    gulp.src('builds/development/index.html', {read: false})
    .pipe(remove());
});

gulp.task('remove', ['removeImages', 'removeHtml']);

gulp.task('original', () => {
    gulp.src('components/images/*.{jpg,png}')
    .pipe(imageResize({
        '*': [{
        }],
    }, {
        quality: 70,
        progressive: true,
    }))
    .pipe(gulp.dest('builds/development/images/'));
});

gulp.task('resizeSmall', () => {
    gulp.src('components/images/*.{jpg,png}')
    .pipe(imageResize({
        '*': [{
            width: 576,
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
            width: 992,
        }],
    }, {
        quality: 70,
        progressive: true,
    }))
    .pipe(gulp.dest('builds/development/images/large'));
});

gulp.task('resizeXL', () => {
    gulp.src('components/images/*.{jpg,png}')
    .pipe(imageResize({
        '*': [{
            width: 1200,
        }],
    }, {
        quality: 70,
        progressive: true,
    }))
    .pipe(gulp.dest('builds/development/images/xl'));
});

gulp.task('resize', ['original', 'resizeSmall', 'resizeMedium', 'resizeLarge', 'resizeXL']);



gulp.task('watermark', () => {
    gulp.src('builds/development/images/small/*.jpg')
    .pipe(watermark({
        image: "components/watermarks/576.png",
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
        image: "components/watermarks/992.png",
        resize: '100x100',
        gravity: 'NorthEast'
    }))
    .pipe(gulp.dest('builds/development/images/large'))
    
    gulp.src('builds/development/images/xl/*.jpg')
    .pipe(watermark({
        image: "components/watermarks/1200.png",
        resize: '100x100',
        gravity: 'NorthEast'
    }))
    .pipe(gulp.dest('builds/development/images/xl'))
    
});

gulp.task(
    'inject', () => {
        return gulp.src('components/html/index.html')
        .pipe(inject(gulp.src('builds/development/images/*', {
            read: false
        }), {
            transform: function(filepath) {
                if (filepath.slice(-4) === '.jpg') {
                    return '<div class="col-12 col-sm-6 col-xl-4"><picture><img class="img-fluid" src="images/' + filepath.slice(27) + '" sizes="(min-width: 1200px) 33.3vw, (min-width: 576px) 50vw, 100vw" srcset="images/small/' + filepath.slice(27) + ' 576w, images/medium/' + filepath.slice(27) + ' 768w, images/large/' + filepath.slice(27) + ' 992w, images/xl/' + filepath.slice(27) + ' 1200w">   </picture></div>';
                }
                return inject.transform.apply(inject.transform, arguments);
            }
        }))
        .pipe(gulp.dest('builds/development'))
    }
)


