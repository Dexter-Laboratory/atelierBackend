const NodeCache = require("node-cache");
const myCache = new NodeCache();


module.exports = duration => (req, res, next) => {
  if (req.method !== 'GET') {
    console.error('Cannot cache non-GET methods!');
    return next();
  }
  const key = req.originalUrl;
  const cachedResponse = cache.get(key);
  if (cachedResponse) {
    return res.status(200).json(cachedResponse);
  } else {
    res.originalSend = res.send;
    res.send = body => {
      res.originalSend(body);
      cache.set(key, body, duration);
    }
    next();
  }
}
