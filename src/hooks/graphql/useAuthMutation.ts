import { ExecutionResult } from 'apollo-link';
import { useMutation } from '@apollo/react-hooks';

import { AuthDocument, AuthInput, AuthMutation, AuthMutationVariables, MeDocument } from '../../__generated__/graphql';

export interface UseAuthMutationResult {
    (input: AuthInput): Promise<ExecutionResult<AuthMutation>>;
}

const useAuthMutation = (): UseAuthMutationResult => {
    const [auth] = useMutation<AuthMutation, AuthMutationVariables>(AuthDocument, {
        update: (proxy, { data: mutationData }) => {
            if (!mutationData) return;

            const { auth: user } = mutationData;

            proxy.writeQuery({
                query: MeDocument,
                data: { me: user },
            });
        },
    });

    return input => auth({ variables: { input } });
};

export default useAuthMutation;
