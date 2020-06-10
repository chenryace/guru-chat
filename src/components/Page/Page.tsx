import React from 'react';
import useStyles from 'isomorphic-style-loader/useStyles';
import normalizeCss from 'normalize.css';

import s from './Page.scss';
import { cn } from '../../utils/bem-css-module';

export interface PageProps {
    children: React.ReactNode;
}

const cnPage = cn(s, 'Page');

const Page: React.FC<PageProps> = ({ children }) => {
    useStyles(normalizeCss, s);

    return <div className={cnPage()}>{children}</div>;
};

export default Page;
