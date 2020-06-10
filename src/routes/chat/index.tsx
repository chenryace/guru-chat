import React from 'react';

import { RouteResult } from '../../router';
import Chat from './Chat';

const action = (): RouteResult => {
    return {
        title: 'Chat page',
        chunks: ['chat'],
        pageContent: <Chat />,
    };
};

export default action;
