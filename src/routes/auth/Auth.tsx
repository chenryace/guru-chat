import React from 'react';
import useStyles from 'isomorphic-style-loader/useStyles';

import s from './Auth.scss';
import { cn } from '../../utils/bem-css-module';
import useMeQuery from '../../hooks/graphql/useMeQuery';
import Title from '../../components/Title/Title';
import AuthForm from '../../components/forms/AuthForm/AuthForm';
import Guard from '../../components/Guard/Guard';

const cnAuth = cn(s, 'Auth');

const Auth: React.FC = () => {
    useStyles(s);

    const { me, loading } = useMeQuery();

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <Guard isAllowed={!me} redirectUrl="/">
            <div className={cnAuth()}>
                <div className={cnAuth('Container')}>
                    <div className={cnAuth('AbsoluteContainer')}>
                        <Title className={cnAuth('Title')}>Chat</Title>
                        <div className={cnAuth('ChatIcon')} />
                    </div>
                    <AuthForm className={cnAuth('Form')} />
                </div>
            </div>
        </Guard>
    );
};

export default Auth;
