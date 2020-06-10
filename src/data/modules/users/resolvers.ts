import { ModuleContext } from '@graphql-modules/core';

import { UsersContext } from './index';
import { Resolver, Resolvers, TypeResolvers } from '../../../interfaces/graphql';
import { Query } from '../../../__generated__/graphql';
import { User as UserBackend } from '../../models/User';

export type OriginUserParent = UserBackend;

type QueryType = Pick<Query, 'me'>;

interface QueryMapping {
    me: Resolver<OriginUserParent | null>;
}

type UsersResolvers = Resolvers<
    {
        Query: TypeResolvers<QueryType, QueryMapping>;
    },
    ModuleContext<UsersContext>
>;

export const resolvers: UsersResolvers = {
    Query: {
        me: (_0, _1, { user }) => {
            return user || null;
        },
    },
};
