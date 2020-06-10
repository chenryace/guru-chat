import React from 'react';
import { Field } from 'react-final-form';

import TextInput from '../../inputs/TextInput/TextInput';

export interface TextFieldProps {
    name: string;
    label?: string;
}

const TextField: React.FC<TextFieldProps> = ({ name, label = name }) => {
    return (
        <Field<string> name={name}>
            {({ input }) => (
                <TextInput
                    label={label}
                    value={input.value}
                    onChange={input.onChange}
                    onFocus={input.onFocus}
                    onBlur={input.onFocus}
                />
            )}
        </Field>
    );
};

export default TextField;
