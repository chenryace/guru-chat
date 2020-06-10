import React from 'react';
import useStyles from 'isomorphic-style-loader/useStyles';

import s from './Message.scss';
import { cn } from '../../utils/bem-css-module';
import { MessageFragment } from '../../__generated__/graphql';
import TextBlock from '../TextBlock/TextBlock';
import Text from '../Text/Text';

export interface MessageProps extends MessageFragment {}

const cnMessage = cn(s, 'Message');

const Message: React.FC<MessageProps> = ({ sender, message }) => {
    useStyles(s);

    return (
        <div className={cnMessage()}>
            <TextBlock className={cnMessage('Text')} size="m" color="black">
                {message}
            </TextBlock>
            <Text size="xs" color="pink">
                {sender.username}&nbsp;&nbsp;•&nbsp;&nbsp;5 minutes ago
            </Text>
        </div>
    );
};

export default Message;
