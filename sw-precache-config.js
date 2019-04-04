module.exports = {
    runtimeCaching: [{
        urlPattern: new RegExp('/newsapi.org/'),
        handler: 'networkFirst'
    }],
    staticFileGlobs: [
      'build/static/css/**.css',
      'build/static/js/**.js'
    ],
    swFilePath: './build/service-worker.js',
    stripPrefix: 'build/',
    // importScripts: (['./public/service-worker-custom.js']),
    handleFetch: true
  }