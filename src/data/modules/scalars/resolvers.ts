import { GraphQLScalarType } from 'graphql';
import { GraphQLDateTime, GraphQLURL } from 'graphql-scalars';

import { Resolvers } from '../../../interfaces/graphql';

type ScalarResolvers = Resolvers<
    {
        URL: GraphQLScalarType;
        DateTime: GraphQLScalarType;
    },
    never
>;

const resolvers: ScalarResolvers = {
    URL: GraphQLURL,
    DateTime: GraphQLDateTime,
};

export default resolvers;
