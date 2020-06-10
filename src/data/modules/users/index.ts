import { shield } from 'graphql-shield';

import { GraphQLModuleWithMiddlewares } from '../../../utils/graphql-modules-middlewares';
import shieldConfig from '../../../utils/graphql-shield/config';
import { ApolloContext } from '../../../interfaces/apollo';
import { User } from '../../models/User';
import ScalarsModule from '../scalars';
import schema from './schema.graphql';
import { resolvers, rules } from './resolvers';

export interface UsersContext {
    user?: User;
}

const permissions = shield(rules, shieldConfig);

const UsersModule = new GraphQLModuleWithMiddlewares<{}, ApolloContext, UsersContext>({
    name: 'users',
    imports: [ScalarsModule],
    typeDefs: schema,
    resolvers,
    middlewares: [permissions],
    context: ({ user }) => ({ user }),
});

export default UsersModule;
