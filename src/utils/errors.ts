import { uuid } from 'uuidv4';

export class UserError extends Error {
    constructor(message?: string) {
        super(message);

        this.name = 'Error';
        Error.captureStackTrace(this);
    }
}

const isError = (err: unknown): err is Error => {
    return err instanceof Error;
};

export const fallbackError = (err: unknown): Error => {
    if (err === null) {
        return new Error('ERROR');
    }

    if (err instanceof UserError) {
        return err;
    }

    const errId = uuid();

    if (isError(err)) {
        // eslint-disable-next-line no-param-reassign
        err.message = `${err.message}: ${errId}`;
        console.error(err.stack || err);
    } else {
        console.error(`Extraordinary error: ${errId}`);
        console.error(err);
    }

    return new Error(`Internal Error: ${errId}`);
};
