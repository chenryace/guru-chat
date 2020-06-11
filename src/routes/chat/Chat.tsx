import React, { useCallback, useEffect, useRef } from 'react';
import useStyles from 'isomorphic-style-loader/useStyles';

import s from './Chat.scss';
import { cn } from '../../utils/bem-css-module';
import useMeQuery from '../../hooks/graphql/useMeQuery';
import useMessagesQuery from '../../hooks/graphql/useMessagesQuery';
import Text from '../../components/Text/Text';
import Scrollable, { ScrollableRef } from '../../components/Scrollable/Scrollable';
import ChatMessageForm from '../../components/forms/ChatMessageForm/ChatMessageForm';
import Message from '../../components/Message/Message';
import Guard from '../../components/Guard/Guard';
import Link from '../../components/Link/Link';
import Icon from '../../components/Icon/Icon';

const cnChat = cn(s, 'Chat');

const Chat: React.FC = () => {
    useStyles(s);

    const scrollableRef = useRef<ScrollableRef | null>(null);

    const scrollTo = (y: number, duration: number) => {
        if (scrollableRef.current) {
            scrollableRef.current.scrollTo(y, duration);
        }
    };

    const onMessageSend = useCallback(() => {
        scrollTo(-0, 100);
    }, []);

    const onMessageSendOther = useCallback(() => {
        if (
            scrollableRef.current &&
            scrollableRef.current.getScrollHeight() -
                scrollableRef.current.getScrollTop() -
                scrollableRef.current.getClientHeight() <=
                30
        ) {
            setTimeout(() => scrollTo(-0, 100), 100);
        }
    }, []);

    useEffect(() => {
        scrollTo(-0, 700);
    }, []);

    const { me, loading: loadingMe } = useMeQuery();
    const { messages, loading: loadingMessages } = useMessagesQuery(onMessageSendOther);

    if (loadingMe || loadingMessages || !messages) {
        return <div>Loading...</div>;
    }

    return (
        <Guard isAllowed={Boolean(me)} redirectUrl="/auth">
            <div className={cnChat()}>
                <div className={cnChat('Head')}>
                    <Link className={cnChat('LogoutBtn')} to="/logout" external>
                        <Icon type="arrow-left" size="xs" />
                        <Text weight="bold" upper>
                            Back
                        </Text>
                    </Link>
                    <Text size="l">Test task</Text>
                </div>
                <Scrollable className={cnChat('MessagesContainer')} disablePadding ref={scrollableRef}>
                    <div className={cnChat('Messages')}>
                        {messages.map(message => (
                            <Message {...message} key={message.id} />
                        ))}
                    </div>
                </Scrollable>
                <ChatMessageForm className={cnChat('Form')} onMutate={onMessageSend} />
            </div>
        </Guard>
    );
};

export default Chat;
