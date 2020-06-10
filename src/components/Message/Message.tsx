import React, { useMemo } from 'react';
import useStyles from 'isomorphic-style-loader/useStyles';

import s from './Message.scss';
import { cn } from '../../utils/bem-css-module';
import { MessageFragment } from '../../__generated__/graphql';
import TextBlock from '../TextBlock/TextBlock';
import Text from '../Text/Text';

type StringOrElement = string | React.ReactElement;

export interface MessageProps extends MessageFragment {}

const transformNewLines = (elements: StringOrElement[]): StringOrElement[] => {
    let matchedIndex: number | undefined;
    let matchedStart: number | undefined;
    let matchedEnd: number | undefined;

    elements.some((elem, index) => {
        if (typeof elem !== 'string') return false;

        const match = /\n/.exec(elem);
        if (match) {
            matchedIndex = index;
            matchedStart = match.index;
            matchedEnd = match.index + match[0].length;
            return true;
        }

        return false;
    });

    if (
        typeof matchedIndex === 'undefined' ||
        typeof matchedStart === 'undefined' ||
        typeof matchedEnd === 'undefined'
    ) {
        return elements;
    }

    const matchedString = elements[matchedIndex] as string;

    return transformNewLines([
        ...elements.slice(0, matchedIndex),
        matchedString.slice(0, matchedStart),
        <br />,
        matchedString.slice(matchedEnd),
        ...elements.slice(matchedIndex + 1),
    ]);
};

const transformMessage = (message: string): React.ReactNode => {
    return React.createElement(React.Fragment, null, ...transformNewLines([message]).filter(Boolean));
};

const cnMessage = cn(s, 'Message');

const Message: React.FC<MessageProps> = ({ sender, message }) => {
    useStyles(s);

    const transformedMessage = useMemo(() => transformMessage(message), [message]);

    return (
        <div className={cnMessage()}>
            <TextBlock className={cnMessage('Text')} size="m" color="black">
                {transformedMessage}
            </TextBlock>
            <Text size="xs" color="pink">
                {sender.username}&nbsp;&nbsp;•&nbsp;&nbsp;5 minutes ago
            </Text>
        </div>
    );
};

export default Message;
