import React, { useCallback } from 'react';
import useStyles from 'isomorphic-style-loader/useStyles';
import { Form } from 'react-final-form';

import s from './AuthForm.scss';
import { cn } from '../../../utils/bem-css-module';
import TextField from '../../fields/TextField/TextField';
import Button from '../../Button/Button';
import useAuthMutation from '../../../hooks/graphql/useAuthMutation';

export interface AuthFormValues {
    username: string;
}

export interface AuthFormProps {
    className?: string;
}

const cnAuthForm = cn(s, 'AuthForm');

const AuthForm: React.FC<AuthFormProps> = ({ className }) => {
    useStyles(s);

    const authMutation = useAuthMutation();

    const onSubmit = useCallback(
        async (values: AuthFormValues) => {
            if (!values.username) return;

            await authMutation(values);
        },
        [authMutation],
    );

    return (
        <Form<AuthFormValues> onSubmit={onSubmit}>
            {({ handleSubmit }) => (
                <form className={cnAuthForm(null, [className])} onSubmit={handleSubmit}>
                    <div className={cnAuthForm('Main')}>
                        <TextField name="username" />
                    </div>
                    <div className={cnAuthForm('Bottom')}>
                        <Button submit>Start Chatting</Button>
                    </div>
                </form>
            )}
        </Form>
    );
};

export default AuthForm;
