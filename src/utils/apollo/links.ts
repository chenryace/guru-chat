import { onError } from 'apollo-link-error';
import { SchemaLink } from 'apollo-link-schema';
import { HttpLink } from 'apollo-link-http';
import { WebSocketLink } from 'apollo-link-ws';
import { split } from 'apollo-link';
import { getMainDefinition } from 'apollo-utilities';

export const errorLink = () => {
    return onError(({ graphQLErrors, networkError }) => {
        if (graphQLErrors)
            graphQLErrors.map(({ message, locations, path }) =>
                console.warn(`[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`),
            );
        if (networkError) console.warn(`[Network error]: ${networkError}`);
    });
};

export const schemaLink = (options: SchemaLink.Options) => {
    return new SchemaLink({ ...options });
};

export const httpLink = (options: HttpLink.Options = {}) => {
    return new HttpLink({
        uri: '/graphql',
        credentials: 'include',
        ...options,
    });
};

export const wsLink = (config: Partial<WebSocketLink.Configuration> = {}) => {
    const { hostname, host: originalHost } = window.location;
    const host = __DEV__ ? `${hostname}:3002` : originalHost;

    return new WebSocketLink({
        uri: `wss://${host}/graphql`,
        options: {
            reconnect: true,
        },
        ...config,
    });
};

// eslint-disable-next-line no-shadow
export const requestLink = ({ wsLink, httpLink }: { wsLink: WebSocketLink; httpLink: HttpLink }) => {
    return split(
        ({ query }) => {
            const definition = getMainDefinition(query);
            return definition.kind === 'OperationDefinition' && definition.operation === 'subscription';
        },
        wsLink,
        httpLink,
    );
};
