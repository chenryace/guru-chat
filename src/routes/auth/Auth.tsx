import React from 'react';
import useStyles from 'isomorphic-style-loader/useStyles';

import s from './Auth.scss';
import { cn } from '../../utils/bem-css-module';
import Title from '../../components/Title/Title';
import AuthForm from '../../components/forms/AuthForm/AuthForm';

const cnAuth = cn(s, 'Auth');

const Auth: React.FC = () => {
    useStyles(s);

    return (
        <div className={cnAuth()}>
            <div className={cnAuth('Container')}>
                <div className={cnAuth('AbsoluteContainer')}>
                    <Title className={cnAuth('Title')}>Chat</Title>
                    <div className={cnAuth('ChatIcon')} />
                </div>
                <AuthForm className={cnAuth('Form')} />
            </div>
        </div>
    );
};

export default Auth;
