import { ApolloClient } from 'apollo-client';
import { from } from 'apollo-link';
import { SchemaLink } from 'apollo-link-schema';

import createCache from './createCache';
import { errorLink, schemaLink } from './links';

// TODO: write typings for partialCacheDefaults
const createApolloClient = (schemaOptions: SchemaLink.Options, partialCacheDefaults: object = {}) => {
    const cache = createCache();

    cache.writeData({
        data: partialCacheDefaults,
    });

    const link = from([errorLink(), schemaLink(schemaOptions)]);

    return new ApolloClient({
        link,
        cache,
        ssrMode: true,
        queryDeduplication: true,
    });
};

export default createApolloClient;
