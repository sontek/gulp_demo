module.exports = function(config) {
  config.set({
    basePath: '',
    frameworks: ['jasmine', 'browserify'],
    files: [
      'node_modules/react-tools/src/test/phantomjs-shims.js',
      'src/hello-world.jsx',
      'src/__tests__/**/*.jsx',
    ],
    exclude: [
    ],
    preprocessors: {
      'src/hello-world.jsx': 'browserify',
      'src/__tests__/**/*.jsx': ['browserify'],
    },
    browserify: {
      transform: ['babelify'],
      extensions: ['.js', '.jsx'],
      debug: true,
      bundleDelay: 1000,  // WAR for karma-browserify race condition
    },
    reporters: ['progress', 'coverage'],
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: true,
    // browsers: ['PhantomJS'],
    browsers: ['PhantomJS', 'Chrome'],
    singleRun: false,
    coverageReporter: {
      type : 'html',
      dir : 'coverage/'
    },
  });
};
