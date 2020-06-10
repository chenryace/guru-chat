import React from 'react';
import useStyles from 'isomorphic-style-loader/useStyles';

import s from './Auth.scss';
import { cn } from '../../utils/bem-css-module';

export interface AuthProps {}

const cnAuth = cn(s, 'Auth');

const Auth: React.FC<AuthProps> = () => {
    useStyles(s);

    return (
        <div className={cnAuth()}>
            <div className={cnAuth('Container')}>
                <div className={cnAuth('AbsoluteContainer')}>
                    <h1 className={cnAuth('Title')}>Chat</h1>
                    <div className={cnAuth('ChatIcon')} />
                </div>
                <div className={cnAuth('Form')} />
            </div>
        </div>
    );
};

export default Auth;
