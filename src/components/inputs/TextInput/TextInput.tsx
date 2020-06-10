import React, { useCallback, useState } from 'react';
import useStyles from 'isomorphic-style-loader/useStyles';
import { FieldInputProps } from 'react-final-form';

import s from './TextInput.scss';
import { cn } from '../../../utils/bem-css-module';
import Text from '../../Text/Text';

export interface TextInputProps {
    label: string;
    value: string;
    onChange: FieldInputProps<unknown>['onChange'];
    onFocus: FieldInputProps<unknown>['onFocus'];
    onBlur: FieldInputProps<unknown>['onBlur'];
}

const cnTextInput = cn(s, 'TextInput');

const TextInput: React.FC<TextInputProps> = ({ label, value, onChange, onFocus, onBlur }) => {
    useStyles(s);

    const [isFocused, setFocused] = useState(false);

    const handleFocus = useCallback(
        (event: React.FocusEvent<HTMLDivElement>) => {
            onFocus(event);
            setFocused(true);
        },
        [onFocus],
    );

    const handleBlur = useCallback(
        (event: React.FocusEvent<HTMLDivElement>) => {
            onBlur(event);
            setFocused(false);
        },
        [onBlur],
    );

    return (
        <div className={cnTextInput({ isFocused, isDirty: Boolean(isFocused || value) })}>
            <Text className={cnTextInput('Label')} weight="bold" color="pink" upper>
                {label}
            </Text>
            <input
                className={cnTextInput('Input')}
                type="text"
                value={value}
                onChange={onChange}
                onFocus={handleFocus}
                onBlur={handleBlur}
            />
        </div>
    );
};

export default TextInput;
