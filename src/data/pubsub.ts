import { Model } from 'sequelize';
import Redis, { RedisOptions } from 'ioredis';
import { PubSubEngine } from 'apollo-server-express';
import { RedisPubSub } from 'graphql-redis-subscriptions';

import config from '../config';
import { Subscription } from '../__generated__/graphql';
import { OriginMessageParent } from './modules/chat/resolvers';
import { SerializedModel } from '../interfaces/sequelize';
import {
    OriginClassicGameParent,
    OriginPlacedClassicGameBetPayloadParent,
    OriginUpdatedClassicGameTimerPayloadParent,
} from './modules/classicGame/resolvers';

export interface PubSubEventPayloads {
    // Chat
    sentMessage: OriginMessageParent;
    deletedMessage: Subscription['deletedMessage'];
    deletedMessagesBySender: Subscription['deletedMessagesBySender'];

    // ClassicGame
    placedClassicGameBet: OriginPlacedClassicGameBetPayloadParent;
    startedClassicGame: OriginClassicGameParent;
    updatedClassicGameTimer: OriginUpdatedClassicGameTimerPayloadParent;
    switchedToClassicGameStateCulmination: Subscription['switchedToClassicGameStateCulmination'];
    switchedToClassicGameStateEnded: Subscription['switchedToClassicGameStateEnded'];
}

export type PubSubEvent = keyof PubSubEventPayloads;

export type AsyncIteratorResult<T extends PubSubEvent> = Record<
    T,
    PubSubEventPayloads[T] extends Model ? SerializedModel<PubSubEventPayloads[T]> : PubSubEventPayloads[T]
>;

export class TypedPubSub {
    private readonly pubsub: PubSubEngine;

    constructor(pubsub: PubSubEngine) {
        this.pubsub = pubsub;
    }

    public publish<T extends PubSubEvent>(trigger: T, payload: PubSubEventPayloads[T]) {
        return this.pubsub.publish(trigger, { [trigger]: payload });
    }

    public asyncIterator<T extends PubSubEvent>(trigger: T) {
        return this.pubsub.asyncIterator<AsyncIteratorResult<T>>(trigger);
    }
}

const redisOptions: RedisOptions = {
    host: config.redis.host,
    port: config.redis.port,
    retryStrategy: times => Math.min(times * 50, 2000),
};

const pubsub = new TypedPubSub(
    new RedisPubSub({
        publisher: new Redis(redisOptions),
        subscriber: new Redis(redisOptions),
    }),
);

export default pubsub;
