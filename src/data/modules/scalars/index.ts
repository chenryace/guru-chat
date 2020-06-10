import { GraphQLModule } from '@graphql-modules/core';

import schema from './schema.graphql';
import resolvers from './resolvers';

const ScalarsModule = new GraphQLModule({
    name: 'scalars',
    typeDefs: schema,
    resolvers,
});

export default ScalarsModule;
