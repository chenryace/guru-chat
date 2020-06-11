import React from 'react';
import { Field } from 'react-final-form';

import MessageInput, { MessageInputProps } from '../../inputs/MessageInput/MessageInput';

export interface MessageFieldProps {
    name: string;
    onSubmit?: MessageInputProps['onSubmit'];
    className?: string;
}

const MessageField: React.FC<MessageFieldProps> = ({ name, onSubmit, className }) => {
    return (
        <Field<string> name={name}>
            {({ input }) => (
                <MessageInput
                    className={className}
                    value={input.value}
                    onChange={input.onChange}
                    onFocus={input.onFocus}
                    onBlur={input.onBlur}
                    onSubmit={onSubmit}
                />
            )}
        </Field>
    );
};

export default MessageField;
