var util = require('util'),
  stream = require('stream'),
  openurl = require("openurl");

util.inherits(Driver,stream);
util.inherits(Device,stream);

function Driver(opts,app) {
  var self = this;

  app.on('client::up',function(){
    self.emit('register', new Device(app));
  });

}

function Device(app) {
  var self = this;

  this._app = app;
  this.writeable = true;
  this.readable = true;
  this.V = 0;
  this.D = 240; // display_text, should be a new one?
  this.G = 'openurl';
  this.name = "Open URL";

}

Device.prototype.write = function(url) {
  openurl.open(url);
  this._app.log.info('Opening URL', url);
};

module.exports = Driver;
