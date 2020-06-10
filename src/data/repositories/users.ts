import { Profile as VkProfile } from 'passport-vkontakte';

import BaseRepository from './base';
import { User } from '../models/User';
import { UserError } from '../../utils/errors';

class UsersRepository extends BaseRepository {
    async authVk(profile: VkProfile): Promise<User> {
        const user: User | null = await this.db.User.findOne({
            where: { vkId: profile.id },
        });

        const avatar = profile.photos ? profile.photos[1].value : 'default_avatar'; // TODO: default avatar

        if (!user) {
            return this.db.User.create({
                vkId: profile.id,
                username: profile.displayName,
                avatar,
            });
        }

        return user.update({
            username: profile.displayName,
            avatar,
        });
    }

    async getUserById(userId: string): Promise<User | null> {
        return this.db.User.findByPk(userId);
    }

    async getUserByIdStrict(userId: string): Promise<User> {
        const user = await this.getUserById(userId);

        if (!user) {
            throw new UserError('NO_USER');
        }

        return user;
    }

    async giveMoney(userId: string, amount: number): Promise<User> {
        return this.db.sequelize.transaction(async transaction => {
            const user: User | null = await this.db.User.findByPk(userId, {
                transaction,
                lock: transaction.LOCK.UPDATE,
            });

            if (!user) {
                throw new UserError('NO_USER');
            }

            return user.update({ money: user.money + amount }, { transaction });
        });
    }

    async withdrawMoney(userId: string, amount: number): Promise<User> {
        return this.db.sequelize.transaction(async transaction => {
            const user: User | null = await this.db.User.findByPk(userId, {
                transaction,
                lock: transaction.LOCK.UPDATE,
            });

            if (!user) {
                throw new UserError('NO_USER');
            }
            if (user.money < amount) {
                throw new UserError('NOT_ENOUGH_MONEY');
            }

            return user.update({ money: user.money - amount }, { transaction });
        });
    }

    async warnChat(userId: string): Promise<User> {
        const now = Date.now();
        const user = await this.getUserByIdStrict(userId);

        return user.update({
            chatWarns: Math.min(user.chatWarns + 1, 5),
            chatWarnsUpdatedAt: new Date(now),
        });
    }
}

export default UsersRepository;
