# Load up dependencies
browserify  = require "browserify"
coffee      = require "coffee-reactify"
del         = require "del"
exorcist    = require "exorcist"
fs          = require "fs"
gulp        = require "gulp"
eslint      = require "gulp-eslint"
sourcemaps  = require "gulp-sourcemaps"
path        = require "path"
uglify      = require "uglifyify"
source      = require "vinyl-source-stream"

dist_dir = path.join(__dirname, "../dist/")
map_file = path.join(dist_dir, "bundle.js.map")

# clean up generated directories
gulp.task "clean", ->
    del [dist_dir]


# check code quality of our scripts
gulp.task "lint", ->
    gulp.src "src/*.jsx"
        .pipe eslint({useEslintrc: true})
        .pipe eslint.format()
        .pipe eslint.failOnError()


# compile the code down to js!
gulp.task "browserify", ->
    # exorcist doesn't write the file if the directory
    # doesn't already exist.
    if not fs.existsSync(dist_dir)
        fs.mkdirSync dist_dir

    browserify_settings =
        entries: "src/index.cjsx"
        extensions: [".cjsx"]
        debug: true  # We use this so source maps are generated

    browserify browserify_settings
        .transform coffee
        .transform {global: true}, uglify
        .bundle()
        .pipe exorcist(map_file)
        .pipe source("bundle.js")
        .pipe gulp.dest(dist_dir)

gulp.task "default", ["clean", "lint", "browserify"]
