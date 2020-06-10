import { ExecutionResult } from 'apollo-link';
import { useMutation } from '@apollo/react-hooks';

import {
    MessagesDocument,
    MessagesQuery,
    SendMessageDocument,
    SendMessageInput,
    SendMessageMutation,
    SendMessageMutationVariables,
} from '../../__generated__/graphql';

export interface UseSendMessageMutationResult {
    (input: SendMessageInput): Promise<ExecutionResult<SendMessageMutation>>;
}

const useSendMessageMutation = (): UseSendMessageMutationResult => {
    const [sendMessage] = useMutation<SendMessageMutation, SendMessageMutationVariables>(SendMessageDocument, {
        update: (proxy, { data: mutationData }) => {
            if (!mutationData) return;

            const { sendMessage: sentMessage } = mutationData;
            const data = proxy.readQuery<MessagesQuery>({ query: MessagesDocument });

            if (data) {
                if (data.messages.some(message => message.id === sentMessage.id)) {
                    return;
                }

                proxy.writeQuery({
                    query: MessagesDocument,
                    data: { ...data, messages: [...data.messages, sentMessage] },
                });
            }
        },
    });

    return input => sendMessage({ variables: { input } });
};

export default useSendMessageMutation;
