import { shield } from 'graphql-shield';

import { GraphQLModuleWithMiddlewares } from '../../../utils/graphql-modules-middlewares';
import shieldConfig from '../../../utils/graphql-shield/config';
import { ApolloContext } from '../../../interfaces/apollo';
import { User } from '../../models/User';
import ScalarsModule from '../scalars';
import UsersModule from '../users';
import schema from './schema.graphql';
import { resolvers, rules } from './resolvers';

export interface ChatContext {
    user?: User;
}

const permissions = shield(rules, shieldConfig);

const ChatModule = new GraphQLModuleWithMiddlewares<{}, ApolloContext, ChatContext>({
    name: 'chat',
    imports: [ScalarsModule, UsersModule],
    typeDefs: schema,
    resolvers,
    middlewares: [permissions],
    context: ({ user }) => ({ user }),
});

export default ChatModule;
