cacheQueue
==========

# Queue for caching objects

# Usage:
```javascript
var Queue = require('cache-queue');
// you can set the expire time(ms) and the total number of caching objects 
var cache = Queue.get('mydata', {ttl: 3600000, length: 500});
cache.set('mykey', "this is my data");
cache.get('mykey');

```
