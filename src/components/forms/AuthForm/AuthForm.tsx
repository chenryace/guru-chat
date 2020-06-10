import React from 'react';
import useStyles from 'isomorphic-style-loader/useStyles';
import { Form } from 'react-final-form';

import s from './AuthForm.scss';
import { cn } from '../../../utils/bem-css-module';
import TextField from '../../fields/TextField/TextField';
import Button from '../../Button/Button';

export interface AuthFormValues {
    username: string;
}

export interface AuthFormProps {
    className?: string;
}

const cnAuthForm = cn(s, 'AuthForm');

const AuthForm: React.FC<AuthFormProps> = ({ className }) => {
    useStyles(s);

    return (
        <Form<AuthFormValues> onSubmit={(...args) => console.log(args)}>
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
