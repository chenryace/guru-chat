import jwt from 'jsonwebtoken';
import { ModuleContext } from '@graphql-modules/core';

import config from '../../../config';
import { UsersContext } from './index';
import { Resolver, Resolvers, TypeResolvers } from '../../../interfaces/graphql';
import { Mutation, MutationAuthArgs, Query } from '../../../__generated__/graphql';
import { User as UserBackend } from '../../models/User';
import { repositories } from '../../database';

export type OriginUserParent = UserBackend;

type QueryType = Pick<Query, 'me'>;
type MutationType = Pick<Mutation, 'auth'>;

interface QueryMapping {
    me: Resolver<OriginUserParent | null>;
}

interface MutationMapping {
    auth: Resolver<OriginUserParent, MutationAuthArgs>;
}

type UsersResolvers = Resolvers<
    {
        Query: TypeResolvers<QueryType, QueryMapping>;
        Mutation: TypeResolvers<MutationType, MutationMapping>;
    },
    ModuleContext<UsersContext>
>;

export const resolvers: UsersResolvers = {
    Query: {
        me: (_0, _1, { user }) => {
            return user || null;
        },
    },
    Mutation: {
        auth: async (_0, { input: { username } }, { res }) => {
            const user = await repositories.users.authFromUsername(username);

            const expiresIn = 60 * 60 * 24 * 180; // 180 days
            const token = jwt.sign({ id: user.id }, config.auth.jwt.secret, { expiresIn });
            res!.cookie(config.auth.tokenKey, token, { maxAge: 1000 * expiresIn, httpOnly: true });

            return user;
        },
    },
};
