/* eslint-disable @typescript-eslint/no-explicit-any */
import { ModuleContext, Resolvers } from '@graphql-modules/core/dist/types';
import { GraphQLModuleOptions } from '@graphql-modules/core/dist/graphql-module';
import { IMiddleware, IMiddlewareGenerator } from 'graphql-middleware/dist/types';
import { GraphQLModule } from '@graphql-modules/core';
import { applyMiddleware } from 'graphql-middleware';
import { GraphQLSchema } from 'graphql';

export type Middlewares<TSource, TContext, TArgs> = (
    | IMiddleware<TSource, TContext, TArgs>
    | IMiddlewareGenerator<TSource, TContext, TArgs>
)[];

export interface GraphQLModuleWithMiddlewaresOptions<
    Config,
    Session extends object,
    Context,
    SelfResolvers extends Resolvers<any, ModuleContext<Context>>
> extends GraphQLModuleOptions<Config, Session, Context, SelfResolvers> {
    middlewares?: Middlewares<Session, Context, any>;
}

export class GraphQLModuleWithMiddlewares<
    Config = any,
    Session extends object = any,
    Context = any,
    SelfResolvers extends Resolvers<any, ModuleContext<Context>> = Resolvers<any, ModuleContext<Context>>
> extends GraphQLModule {
    private readonly middlewares?: Middlewares<Session, Context, any>;

    constructor(
        _options?: GraphQLModuleWithMiddlewaresOptions<Config, Session, Context, SelfResolvers>,
        _moduleConfig?: Config,
    ) {
        super(_options, _moduleConfig);

        this.middlewares = _options?.middlewares;
    }

    get schema(): GraphQLSchema {
        if (this.middlewares) {
            return applyMiddleware(super.schema, ...this.middlewares);
        }

        return super.schema;
    }
}
