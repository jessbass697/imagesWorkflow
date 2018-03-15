# 4th Year Project on Workflows

Project on the importance of workflows in Front-End Development and how they increase browser load times with enfasis on image loading. 


## Setup up Tips for Windows Users


## Install GIT (Manual Installation)

`git --version` to check **if** installed

### Issues with git command

**Error** - `git not recognised as an internal command in command line`

**_Solution_** 

- locate git folder >Local Disk(C:)/Program Files/git/cmd 

- Right click >git

- In location, copy the location path

- Right-click Windows Icon in corner of Desktop

- System/Advanced System Settings/Environment Variables

- In 'System Variables', click on >path

- Edit the >path

- Add a semi-colon to end of previous path

- Paste the git cmd location to the path and click 'ok'



## Install Node

`node --version` to check **if** installed

### NPM Installations (Using Node Command Line)
 
 ```
  GULP - npm install -g gulp
  BROWSERIFY - npm install -g browserify
```
 
 
## Install Ruby

**_Note: Ruby installation is for Windows only, Mac comes with Ruby pre-installed_**

`ruby --version` to check **if** installed

### Gem Installations (Using Ruby Command Line)
```
 SASS - gem install sass
 COMPASS - gem install compass
```
 
 ## Install ImageMagick
 
 `convert -h` to check **if** installed
 
 ### Issues with ImageMagick installation
 
 **Error** - `convert -h not recognised as an internal command in command line`
 
 **_Solution_** 
 
 -Upon installation of ImageMagick make sure to install **legacy components**
 
 -legacy components contains ImageMagick's **_convert.exe_** file which is required for ImageMagick to run in the Command Line. 
 
 
**Also create a Github account to keep track of your project online**


## Create folder structure for Project

**dir** to list current files in folder

**cd** to change directory *(Will be required when Node Command Prompt is opened first to get to your project folder)*

**cls** to clear screen

```
-projectWorkflow
    -builds
        -development
            -css
            -images
            -js
            -json
        -production
    -components
        -html
        -images
        -watermarks
        -sass
    gulpfile.js
    package.json
```
        
## Setup your package.json file

`npm init`

*Note: This is done in the command line with your project folder selected (selected by using the 'cd' command to change directory)


## Setup your GIT

Create a .gitignore file and place the following code inside

```
 .DS_Store
 node_modules
 .tmp
 .sass-cache
 builds/**/images/*
```

These are the files you don't want to keep track of on git.  This file should be in the root of your project folder. 

From the command line type:

```
 git init
 git add
 git status
 git commit -m "First Commit"
 git log
 
```

Now push your files to the online repository

```
 git remote add origin https://github.com/jessbass697/projectWorkflow.git
 git.push -u origin master
 
 ```

You may be asked to enter your username and password for first usage. 


## Setting up Gulp in your Project

Use the following commands to install Gulp and Gulp Util into your project directory. 

```
 npm install --save-dev gulp
 npm install --save-dev gulp-util
 
 ```

**_Notice how your package.json file is automatically updated with these packages_**

A gulpfile.js is also required to give Gulp commands or tasks to complete. 

In the root of the project structure create a JavaScript file called >gulpfile.js 


## Using Gulp Task to Edit an Image

Creating multiple output sizes of the same image 

Use the following command to install **gulp-image-resize** to the project directory.  (package.json also updated)

`npm install --save-dev gulp-image-resize`

## gulp-image-resize

**_gulp-image-resize requires ImageMagick to be installed and functioning on the system_**

### Issues with gulp-image-resize

**Error** `EOF (End of File) Error`

**_1st Problem_** ImageMagick was not properly installed into the system and not working in the command line

**_2nd Problem_** Once ImageMagick was tested to be working within the command line, the error did not change with gulp-image-resize task. 

**_Solution_** Installed GraphicsMagick alongside ImageMagick and placed it into the System Path (See above for System Path location), this fixed the problems with the above task command. 

## Gulp Task Test to create an array of sizes for One Image

```
const gulp = require('gulp'),
      imageresize = require('gulp-image-resize'),
      pipes = require('gulp-pipes');
      
    
const resizingImages = [];

[1024, 800, 500, 320].forEach(function(size) {
    const resizeImageTask = 'resize_' + size;
    gulp.task(resizeImageTask, function() {
        return gulp.src('builds/development/images/ironman.jpg')
        .pipe(imageresize({
            width: size,  
            upscale: false,
        }))
        .pipe(pipes.image.optimize())
        .pipe(gulp.dest('testImages/'))
    });
    resizingImages.push(resizeImageTask);
});

gulp.task('imageResize', resizingImages);
```


## gulp-responsive

`gulp-responsive` depends on Sharp.  Sharp is one of the fastest Node.js modules for resizing JPEG, PNG, WebP and TIFF images. 


### Install gulp-responsive

`npm install --save-dev gulp-responsive`

## Sharp

`npm install sharp`

The typical use of Sharp is to convert large images in common formats to smaller, web-friendly JPEG, PNG and WebP images of varying dimensions. 

Resizing an image with Sharp is typically 4x-5x faster than using the quickest ImageMagick and GraphicsMagick settings. 

### Prerequisites for Sharp Installation

Sharp requires a number of software to already be installed into the PC.  These software installations must also be converted to the system path to work with the 'gulp-responsive' command. 

- Microsoft Visual Studio 2013+ (Current version I am using is 2017)

- node-gyp  `npm install -g node-gyp` 

`node-gyp` is a cross-platform command-line tool written in Node.js for compiling native addon modules for Node.js. It bundles the gyp project used by the Chromium team and takes away the pain of dealing with the various differences in build platforms. 

- Python 2.7.14 

**_The above are manual installations except `node-gyp`_**

### The gulp-responsive Gulp Task

```
const gulp = require('gulp'),
      responsive = require('gulp-responsive');

gulp.task('images', function() {
    return gulp.src('builds/development/images/ironman.jpg')
    .pipe(responsive({
        'ironman.jpg' : [{
            width: 1024,
            quality: 50,
            rename: 'ironman1024.jpg' 
        }, {
            width: 800,
            quality: 50,
            rename: 'ironman800.jpg'
        }, {
            width: 500,
            quality: 50,
            rename: 'ironman500.jpg'
        }, {
            width: 300, 
            quality: 50, 
            rename: 'ironman300.jpg'
        }]
    }))
    .pipe(gulp.dest('dist'));
});
```
**_The above code takes in a single image and both resizes and renames it before sending it to a 'dist' output folder._**

## gulp-responsive task with multiple images

The following gulp tasks takes all the images within the image folder, pipes them through the gulp-responsive plugin and outputs multiple sizes of each image along with a rename tag to differentiate between them and finally outputs all images as JPEGS. 

```
gulp.task('images', function() {
    return gulp.src('builds/development/images/*.{jpg,png}')
    .pipe(responsive({
        '*': [{
            width: 300,
            quality: 75, 
            rename: {
                suffix: '-xtraSmall',
                extname: '.jpg',
            }, 
        }, {
            width: 500, 
            quality: 75, 
            rename: {
                suffix: '-small',
                extname: '.jpg',
            },
        }, {
            width: 800,
            quality: 75, 
            rename: {
                suffix: '-medium',
                extname: '.jpg',
            },
        }, {
            width: 1024,
            quality: 75,
            rename: {
                suffix: '-large',
                extname: '.jpg',
            },
        }],
    }))
    .pipe(gulp.dest('builds/development/images'));
});
```

## src-set

`src-set` allows for the browser to load different sizes of the same image depending on the device screen size. 

It accomplishes this using a combination of 3 attributes. 

- The `src` attribute is used as a fallback for the browsers who do not yet support the `src-set` implementation. 

- The `w` descriptor describes the width of the image being referenced

- The `sizes` attribute is where the actual implementation of different sized images on different screen sizes is accomplished.  This is done using the `sizes` attribute along with the `w` descriptor found in the `src-set` attribute. 

**The HTML code for the `src-set` implementation:**

```
<img
             src= "builds/development/images/banksy1.jpg"
             sizes="(min-width: 40em) 80vw, 100vw"
             srcset="images/banksy1-xtraSmall.jpg 300w,
                     images/banksy1-small.jpg 500w,
                     images/banksy1-medium.jpg 800w,
                     images/banksy1-large.jpg 1024w"
             alt="...">
```














 
 
