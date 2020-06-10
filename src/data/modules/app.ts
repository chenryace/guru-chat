import { GraphQLModule } from '@graphql-modules/core';

import ScalarsModule from './scalars';
import UsersModule from './users';
import ChatModule from './chat';

const AppModule = new GraphQLModule({
    imports: [ScalarsModule, UsersModule, ChatModule],
});

export default AppModule;
