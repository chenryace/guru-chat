import { Database } from '../models';

class BaseRepository {
    protected db: Database;

    constructor(db: Database) {
        this.db = db;
    }
}

export default BaseRepository;
