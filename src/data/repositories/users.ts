import BaseRepository from './base';
import { User } from '../models/User';

class UsersRepository extends BaseRepository {
    async authFromUsername(username: string): Promise<User> {
        const user: User | null = await this.db.User.findOne({
            where: { username },
        });

        if (!user) {
            return this.db.User.create({ username });
        }

        return user;
    }

    async getUserById(userId: string): Promise<User | null> {
        return this.db.User.findByPk(userId);
    }
}

export default UsersRepository;
