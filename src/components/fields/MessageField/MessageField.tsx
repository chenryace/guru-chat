import React from 'react';
import { Field } from 'react-final-form';

import MessageInput from '../../inputs/MessageInput/MessageInput';

export interface MessageFieldProps {
    name: string;
    className?: string;
}

const MessageField: React.FC<MessageFieldProps> = ({ name, className }) => {
    return (
        <Field<string> name={name}>
            {({ input }) => (
                <MessageInput
                    className={className}
                    value={input.value}
                    onChange={input.onChange}
                    onFocus={input.onFocus}
                    onBlur={input.onBlur}
                />
            )}
        </Field>
    );
};

export default MessageField;
