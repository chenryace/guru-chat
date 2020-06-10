import { InMemoryCache } from 'apollo-cache-inmemory';

const createCache = () => {
    // https://www.apollographql.com/docs/react/basics/caching.html#configuration
    return new InMemoryCache();
};

export default createCache;
