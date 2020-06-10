import React, { useCallback, useState } from 'react';
import useStyles from 'isomorphic-style-loader/useStyles';
import { FieldInputProps } from 'react-final-form';
import TextareaAutosize from 'react-autosize-textarea';

import s from './MessageInput.scss';
import { cn } from '../../../utils/bem-css-module';
import Text from '../../Text/Text';

export interface MessageInputProps {
    value: string;
    onChange: FieldInputProps<unknown>['onChange'];
    onFocus: FieldInputProps<unknown>['onFocus'];
    onBlur: FieldInputProps<unknown>['onBlur'];
    onSubmit?: () => void;
    className?: string;
}

const cnMessageInput = cn(s, 'MessageInput');

const MessageInput: React.FC<MessageInputProps> = ({ value, onChange, onFocus, onBlur, onSubmit, className }) => {
    useStyles(s);

    const [isFocused, setFocused] = useState(false);

    const handleFocus = useCallback(
        (event: React.FocusEvent<HTMLTextAreaElement>) => {
            onFocus(event);
            setFocused(true);
        },
        [onFocus],
    );

    const handleBlur = useCallback(
        (event: React.FocusEvent<HTMLTextAreaElement>) => {
            onBlur(event);
            setFocused(false);
        },
        [onBlur],
    );

    const handleKeyDown = useCallback(
        (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
            const keyCode = event.keyCode || event.which;

            if (!onSubmit || keyCode !== 13 || event.shiftKey) return;

            event.preventDefault();
            onSubmit();
        },
        [onSubmit],
    );

    return (
        <div className={cnMessageInput({ isFocused, isPresent: value !== '' }, [className])}>
            <TextareaAutosize
                className={cnMessageInput('Input')}
                maxRows={5}
                value={value}
                onChange={onChange}
                onFocus={handleFocus}
                onBlur={handleBlur}
                onKeyDown={handleKeyDown}
            />
            <Text className={cnMessageInput('Placeholder')} size="m">
                Type message...
            </Text>
        </div>
    );
};

export default MessageInput;
