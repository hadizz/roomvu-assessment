import LRU from 'lru-cache'

const cache = new LRU({
    max: 100, // maximum number of items in the cache
    ttl: 1000 * 60 * 60, // maximum age of an item in milliseconds (1 hour)
});

export default cache
