import React from 'react';

import { RouteResult } from '../../router';
import Auth from './Auth';

const action = (): RouteResult => {
    return {
        title: 'Auth page',
        chunks: ['auth'],
        pageContent: <Auth />,
    };
};

export default action;
