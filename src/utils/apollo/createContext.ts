import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';

import { ApolloContext } from '../../interfaces/apollo';
import { repositories } from '../../data/database';
import config from '../../config';

export interface ConnectionParams {
    authToken: string;
}

export interface Payload {
    id: string;
}

export const isValidConnectionParams = (connectionParams: object): connectionParams is ConnectionParams => {
    return (
        'authToken' in connectionParams &&
        typeof (connectionParams as { connectionParams: unknown }).connectionParams === 'string'
    );
};

export const isValidPayload = (payload: object | string): payload is Payload => {
    return typeof payload === 'object' && 'authToken' in payload && typeof (payload as { id: unknown }).id === 'string';
};

// Request can be undefined because apollo doesn't provide this for websocket connection
export const createContext = async (req: Request | undefined, res: Response): Promise<ApolloContext> => {
    if (!req) return {};

    return {
        req,
        res,
        user: (req.user && (await repositories.users.getUserById(req.user.id))) || undefined,
    };
};

export const createWebSocketContext = async (connectionParams: object): Promise<ApolloContext> => {
    if (!isValidConnectionParams(connectionParams)) {
        return {};
    }

    const payload = jwt.verify(connectionParams.authToken, config.auth.jwt.secret);
    if (!isValidPayload(payload)) {
        return {};
    }

    return {
        user: (await repositories.users.getUserById(payload.id)) || undefined,
    };
};
