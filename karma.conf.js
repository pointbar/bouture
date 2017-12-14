module.exports = config =>
  config.set({
    singleRun: true,
    frameworks: ['mocha', 'chai'],
    files: ['test/**/*.js'],
    colors: true,
    browsers: ['FirefoxDeveloperHeadless']
  })
