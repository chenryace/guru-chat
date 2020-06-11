import { Request, Response } from 'express';

import { User } from '../data/models/User';

export interface ApolloContext {
    req?: Request;
    res?: Response;
    user?: User;
}
