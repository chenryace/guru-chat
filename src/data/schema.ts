// NOTE: This file intended only for importing in codegen
import { mergeTypeDefs } from '@graphql-toolkit/schema-merging';

import scalars from './modules/scalars/schema.graphql';
import users from './modules/users/schema.graphql';
import chat from './modules/chat/schema.graphql';

export default mergeTypeDefs([scalars, users, chat]);
