import { rule } from 'graphql-shield';

import { UserError } from '../../utils/errors';
import { User } from '../models/User';

export const isAuth = rule({ cache: 'contextual' })((_0, _1, ctx: { user?: User }) => {
    if (!ctx.user) {
        return new UserError('NOT_AUTH');
    }

    return true;
});

export default { isAuth };
