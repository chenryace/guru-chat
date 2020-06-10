import { Op } from 'sequelize';

import BaseRepository from './base';
import { Message } from '../models/Message';
import { UserError } from '../../utils/errors';

class MessagesRepository extends BaseRepository {
    async getMessageById(messageId: string): Promise<Message | null> {
        return this.db.Message.findByPk(messageId);
    }

    async getMessageByIdStrict(messageId: string): Promise<Message> {
        const message = await this.getMessageById(messageId);

        if (!message) {
            throw new UserError('NO_MESSAGE');
        }

        return message;
    }

    async getMessages(): Promise<Message[]> {
        const messages: Message[] = await this.db.Message.findAll({
            order: [
                ['createdAt', 'DESC'],
                ['id', 'DESC'],
            ],
            limit: 30,
        });

        return messages.reverse();
    }

    async addMessage(senderId: string, message: string): Promise<Message> {
        return this.db.Message.create({
            senderId,
            message,
        });
    }

    async deleteMessage(messageId: string): Promise<void> {
        const message: Message | null = await this.db.Message.findByPk(messageId);

        if (!message) {
            throw new UserError('NO_MESSAGE');
        }

        return message.destroy();
    }

    async deleteMessagesBySender(senderId: string): Promise<void> {
        const twoDaysAgo = new Date(Date.now() - 2 * 24 * 60 * 60 * 1000);

        await this.db.Message.destroy({ where: { senderId, createdAt: { [Op.gte]: twoDaysAgo } } });
    }
}

export default MessagesRepository;
