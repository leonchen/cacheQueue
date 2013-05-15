var LENGTH = 200;
var TTL = 300000;
var CACHE = {};

var Queue = function (name, options) {
  options = options || {};
  this.name = name;
  this.ttl = parseInt(options.ttl || TTL);
  this.queue = {};

  var length = parseInt(options.length || LENGTH);
  this.maxIndex = length - 1;
  this.keys = new Array(length);
  this.paddingIndex = 0;

  CACHE[this.name] = this;
}

Queue.prototype.check = function (key) {
  if (!this.queue[key]) return false;
  if (this.queue[key].expiredAt < Date.now()) return false;
  return true;
}

Queue.prototype.get = function (key) {
  if (!this.queue[key] || (this.queue[key].expiredAt < Date.now())) return null;
  return this.queue[key].data;
}

Queue.prototype.set = function (key, data) {
  var removeKey = this.keys[this.paddingIndex];
  if (removeKey) delete this.queue[removeKey];
  this.queue[key] = {
    data: data,
    expiredAt: (Date.now() + this.ttl)
  };
  this.keys[this.paddingIndex] = key;
  this.paddingIndex = this.paddingIndex >= this.maxIndex ? 0 : this.paddingIndex+1;
}

Queue.get = function (name, options) {
  if (CACHE[name]) return CACHE[name];
  return (new Queue(name, options));
}

module.exports = Queue;
