module.exports = config =>
  config.set({
    frameworks: ['mocha', 'chai'],
    files: ['test/**/*.js'],
    colors: true,
    browsers: ['FirefoxDeveloperHeadless']
  })
