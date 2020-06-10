import React from 'react';
import useStyles from 'isomorphic-style-loader/useStyles';

import s from './Chat.scss';
import { cn } from '../../utils/bem-css-module';
import Text from '../../components/Text/Text';
import Scrollable from '../../components/Scrollable/Scrollable';
import ChatMessageForm from '../../components/forms/ChatMessageForm/ChatMessageForm';
import Message from '../../components/Message/Message';

const cnChat = cn(s, 'Chat');

const Chat: React.FC = () => {
    useStyles(s);

    return (
        <div className={cnChat()}>
            <div className={cnChat('Head')}>
                <Text size="l">Test task</Text>
            </div>
            <Scrollable className={cnChat('MessagesContainer')} disablePadding>
                <div className={cnChat('Messages')}>
                    <Message id="1" message="Hi Andrea! How are you?" createdAt="" sender={{ username: 'Andrew' }} />
                    <Message
                        id="2"
                        message="Doing good, how do you feel about grabbing a coffee sometime?"
                        createdAt=""
                        sender={{ username: 'Alice' }}
                    />
                    <Message id="1" message="Hi Andrea! How are you?" createdAt="" sender={{ username: 'Andrew' }} />
                    <Message id="1" message="Hi Andrea! How are you?" createdAt="" sender={{ username: 'Andrew' }} />
                    <Message id="1" message="Hi Andrea! How are you?" createdAt="" sender={{ username: 'Andrew' }} />
                    <Message id="1" message="Hi Andrea! How are you?" createdAt="" sender={{ username: 'Andrew' }} />
                    <Message id="1" message="Hi Andrea! How are you?" createdAt="" sender={{ username: 'Andrew' }} />
                    <Message id="1" message="Hi Andrea! How are you?" createdAt="" sender={{ username: 'Andrew' }} />
                    <Message id="1" message="Hi Andrea! How are you?" createdAt="" sender={{ username: 'Andrew' }} />
                    <Message id="1" message="Hi Andrea! How are you?" createdAt="" sender={{ username: 'Andrew' }} />
                    <Message id="1" message="Hi Andrea! How are you?" createdAt="" sender={{ username: 'Andrew' }} />
                    <Message id="1" message="Hi Andrea! How are you?" createdAt="" sender={{ username: 'Andrew' }} />
                    <Message id="1" message="Hi Andrea! How are you?" createdAt="" sender={{ username: 'Andrew' }} />
                    <Message id="1" message="Hi Andrea! How are you?" createdAt="" sender={{ username: 'Andrew' }} />
                    <Message id="1" message="Hi Andrea! How are you?" createdAt="" sender={{ username: 'Andrew' }} />
                    <Message id="1" message="Hi Andrea! How are you?" createdAt="" sender={{ username: 'Andrew' }} />
                    <Message id="1" message="Hi Andrea! How are you?" createdAt="" sender={{ username: 'Andrew' }} />
                    <Message id="1" message="Hi Andrea! How are you?" createdAt="" sender={{ username: 'Andrew' }} />
                    <Message id="1" message="Hi Andrea! How are you?" createdAt="" sender={{ username: 'Andrew' }} />
                    <Message id="1" message="Hi Andrea! How are you?" createdAt="" sender={{ username: 'Andrew' }} />
                    <Message id="1" message="Hi Andrea! How are you?" createdAt="" sender={{ username: 'Andrew' }} />
                    <Message id="1" message="Hi Andrea! How are you?" createdAt="" sender={{ username: 'Andrew' }} />
                    <Message id="1" message="Hi Andrea! How are you?" createdAt="" sender={{ username: 'Andrew' }} />
                    <Message id="1" message="Hi Andrea! How are you?" createdAt="" sender={{ username: 'Andrew' }} />
                    <Message id="1" message="Hi Andrea! How are you?" createdAt="" sender={{ username: 'Andrew' }} />
                    <Message id="1" message="Hi Andrea! How are you?" createdAt="" sender={{ username: 'Andrew' }} />
                    <Message id="1" message="Hi Andrea! How are you?" createdAt="" sender={{ username: 'Andrew' }} />
                    <Message id="1" message="Hi Andrea! How are you?" createdAt="" sender={{ username: 'Andrew' }} />
                    <Message id="1" message="Hi Andrea! How are you?" createdAt="" sender={{ username: 'Andrew' }} />
                    <Message id="1" message="Hi Andrea! How are you?" createdAt="" sender={{ username: 'Andrew' }} />
                    <Message id="1" message="Hi Andrea! How are you?" createdAt="" sender={{ username: 'Andrew' }} />
                    <Message id="1" message="Hi Andrea! How are you?" createdAt="" sender={{ username: 'Andrew' }} />
                </div>
            </Scrollable>
            <ChatMessageForm className={cnChat('Form')} />
        </div>
    );
};

export default Chat;
