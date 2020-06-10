/* eslint-disable global-require */
import React from 'react';
import { Route } from 'universal-router';

import { AppRouterContext, RouteResult } from '../router';
import Page from '../components/Page/Page';

// The top-level (parent) route
const routes: Route<AppRouterContext, RouteResult> = {
    path: '',

    // Keep in mind, routes are evaluated in order
    children: [
        // Wildcard routes, e.g. { path: '(.*)', ... } (must go last)
        {
            path: '(.*)',
            load: () => import(/* webpackChunkName: 'not-found' */ './not-found'),
        },
    ],

    async action({ next }) {
        // Execute each child route until one of them return the result
        const route = await next();

        // Provide default values for title, description etc.
        route.title = `${route.title || 'Untitled Page'} - PlayTime`;
        route.description = route.description || '';

        // Render page content wrapped in page if exists
        if (route.pageContent) {
            route.component = <Page>{route.pageContent}</Page>;
        }

        return route;
    },
};

// The error page is available by permanent url for development mode
if (__DEV__) {
    routes.children!.unshift({
        path: '/error',
        action: require('./error').default,
    });
}

export default routes;
