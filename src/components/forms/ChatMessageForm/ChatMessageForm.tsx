import React, { useCallback } from 'react';
import useStyles from 'isomorphic-style-loader/useStyles';
import { Form } from 'react-final-form';
import { FormApi } from 'final-form';

import s from './ChatMessageForm.scss';
import { cn } from '../../../utils/bem-css-module';
import MessageField from '../../fields/MessageField/MessageField';
import useSendMessageMutation from '../../../hooks/graphql/useSendMessageMutation';
import Button from '../../Button/Button';

export interface ChatMessageFormValues {
    message: string;
}

export interface ChatMessageFormProps {
    onMutate?: () => void;
    className?: string;
}

const cnChatMessageForm = cn(s, 'ChatMessageForm');

const ChatMessageForm: React.FC<ChatMessageFormProps> = ({ onMutate, className }) => {
    useStyles(s);

    const sendMessageMutation = useSendMessageMutation();

    const onSubmit = useCallback(
        async (values: ChatMessageFormValues, form: FormApi<ChatMessageFormValues>) => {
            if (!values.message) return;

            await sendMessageMutation(values);

            if (onMutate) {
                onMutate();
            }

            setTimeout(() => form.reset(), 0);
        },
        [sendMessageMutation, onMutate],
    );

    return (
        <Form<ChatMessageFormValues> onSubmit={onSubmit}>
            {({ handleSubmit }) => (
                <form className={cnChatMessageForm(null, [className])} onSubmit={handleSubmit}>
                    <MessageField className={cnChatMessageForm('Field')} name="message" />
                    <Button
                        className={cnChatMessageForm('Button')}
                        shape="circle"
                        color="pink"
                        size="m"
                        icon="send"
                        submit
                    />
                </form>
            )}
        </Form>
    );
};

export default ChatMessageForm;
