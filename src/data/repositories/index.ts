import { Database } from '../models';
import UsersRepository from './users';
import MessagesRepository from './messages';

const initRepositories = (db: Database) => ({
    users: new UsersRepository(db),
    messages: new MessagesRepository(db),
});

export default initRepositories;
