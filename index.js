var util = require('util'),
  stream = require('stream'),
  openurl = require("openurl");

util.inherits(Driver,stream);
util.inherits(Device,stream);

function Driver(opts,app) {
  var self = this;

  app.on('client::up',function(){
    self.emit('register', new Device());
  });

}

function Device() {
  var self = this;

  this.writeable = true;
  this.readable = true;
  this.V = 0;
  this.D = 240; // display_text
  this.G = 'openurl';
  setTimeout(function() {
    self.emit('data', 1);
  }, 1);
}

Device.prototype.write = openurl.open;

module.exports = Driver;
