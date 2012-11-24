'use strict';
var PORT        = 3737,
    express     = require('express'),
    hostname    = require('os').hostname(),
    http        = require('http'),
    colors      = require('colors'),
    path        = require('path'),
    consolidate = require('consolidate'),
    fs          = require('fs'),
    dust        = require('dustjs-linkedin'),
    transformer = require('../transformer');

/**
 * @author Seth McLaughlin
 */
function Server() {
}

/**
 * Initialize
 */
Server.prototype.init = function(config) {
  config = config || {};
  config.homeFolder = __dirname;
  this.initEnvironment(config);
  this.initRoutes();
  this.start(this.port);
}

/**
 * Set up application environment
 */
Server.prototype.initEnvironment = function(config) {
  var app        = this.app = express(),
      homeFolder = this.homeFolder = config.homeFolder;

  // express config
  app.engine('tl', consolidate.dust);
  app.set('view engine', 'tl');
  app.set('views', homeFolder + '/views');
  app.set('view options', { layout: null });

  // static resources
  app.use('/js', express.static(homeFolder + '/js'));
  app.use('/css', express.static(homeFolder + '/css'));
  app.use('/img', express.static(homeFolder + '/img'));
  app.use('/perfy', express.static(path.resolve(homeFolder, '..', 'browser')));

  // port
  this.port = config.port || PORT;
}

/**
 * Set up routes
 */
Server.prototype.initRoutes = function() {
  var app  = this.app,
      port = this.port,
      homeFolder = this.homeFolder;

  
  /** Index **/
  app.get('/', function(request, response) {
    response.render('index', { hostname: hostname, port: port });
  });

  app.get('/sample_js/:file', function( request, response ) {
    var file = request.params.file,
        fsPath = path.resolve(homeFolder, '..', 'sample_js', file),
        data;
    fs.readFile( fsPath, function(err, result) {
      data = result.toString();
      data = transformer.instrument(data, request.url);
      response.setHeader('Content-Type', 'text/javascript');
      response.send(data);
    });
  });
}

/**
 * Start server
 */
Server.prototype.start = function(port) {
  var app   = this.app,
      self  = this,
      server;

    server = http.createServer(app);
    server.on(
      'listening',
      function() {
        console.log('server started on ' + hostname + ':' + port);
     });
    server.listen(port);
}

/**
 * Start a new Server
 * @param {Object} config options
 */
function start(config) {
  var instance = new Server();
  instance.init(config);
  return instance;
}

module.exports.Server = Server;
module.exports.start = start;
Object.seal(module.exports);
