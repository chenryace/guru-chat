import { Model } from 'sequelize';
import Redis, { RedisOptions } from 'ioredis';
import { PubSubEngine } from 'apollo-server-express';
import { RedisPubSub } from 'graphql-redis-subscriptions';

import config from '../config';
import { OriginMessageParent } from './modules/chat/resolvers';
import { SerializedModel } from '../interfaces/sequelize';

export interface PubSubEventPayloads {
    // Chat
    sentMessage: OriginMessageParent;
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
    retryStrategy: times => Math.min(times * 50, 2000),
};

const pubsub = new TypedPubSub(
    new RedisPubSub({
        publisher: new Redis(config.redisUrl, redisOptions),
        subscriber: new Redis(config.redisUrl, redisOptions),
    }),
);

export default pubsub;
