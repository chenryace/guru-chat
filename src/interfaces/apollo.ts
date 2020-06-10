import { Request, Response } from 'express';
import { InMemoryCache } from 'apollo-cache-inmemory';

import { User } from '../data/models/User';

export interface ApolloContext {
    req?: Request;
    res?: Response;
    user?: User;
}
