import { ModuleContext } from '@graphql-modules/core';
import { chain, IRules } from 'graphql-shield';

import { ChatContext } from './index';
import { Resolver, Resolvers, ResolverSubscriber, TypeResolvers } from '../../../interfaces/graphql';
import { SerializedModel } from '../../../interfaces/sequelize';
import { Message, Mutation, MutationSendMessageArgs, Query, Subscription } from '../../../__generated__/graphql';
import { Message as MessageBackend } from '../../models/Message';
import { OriginUserParent } from '../users/resolvers';
import { repositories } from '../../database';
import pubsub from '../../pubsub';
import { isAuth } from '../rules';
import { checkSendMessageArgs } from './rules';
import { normalizeMessage } from '../../../utils/message';

export type OriginMessageParent = MessageBackend;

type QueryType = Pick<Query, 'messages'>;
type MutationType = Pick<Mutation, 'sendMessage'>;
type SubscriptionType = Pick<Subscription, 'sentMessage'>;
type MessageType = Pick<Message, 'id' | 'sender' | 'message' | 'createdAt'>;

interface QueryMapping {
    messages: Resolver<OriginMessageParent[]>;
}

interface MutationMapping {
    sendMessage: Resolver<OriginMessageParent, MutationSendMessageArgs>;
}

interface SubscriptionMapping {
    sentMessage: ResolverSubscriber<OriginMessageParent, SerializedModel<OriginMessageParent>>;
}

interface MessageMapping {
    sender: Resolver<OriginUserParent>;
}

type ChatResolvers = Resolvers<
    {
        Query: TypeResolvers<QueryType, QueryMapping>;
        Mutation: TypeResolvers<MutationType, MutationMapping>;
        Subscription: TypeResolvers<SubscriptionType, SubscriptionMapping>;
        Message: TypeResolvers<MessageType, MessageMapping, OriginMessageParent>;
    },
    ModuleContext<ChatContext>
>;

export const rules: IRules = {
    Mutation: {
        sendMessage: chain(isAuth, checkSendMessageArgs),
    },
};

export const resolvers: ChatResolvers = {
    Query: {
        messages: () => {
            return repositories.messages.getMessages();
        },
    },
    Mutation: {
        sendMessage: async (_0, { input: { message } }, { user }) => {
            const sentMessage = await repositories.messages.addMessage(user!.id, normalizeMessage(message));

            pubsub.publish('sentMessage', sentMessage).then();
            return sentMessage;
        },
    },
    Subscription: {
        sentMessage: {
            resolve: ({ sentMessage }) => {
                return repositories.messages.getMessageByIdStrict(sentMessage.id);
            },
            subscribe: () => pubsub.asyncIterator('sentMessage'),
        },
    },
    Message: {
        sender: message => {
            return message.getSender();
        },
    },
};
