import { inputRule } from 'graphql-shield';

const rMessage = /^[a-zA-Zа-яА-ЯёЁ0-9_./%!?@#$&*()[\]<>+=\-:;^,"'\s]{1,255}$/;

export const checkSendMessageArgs = inputRule()(yup =>
    yup.object({
        input: yup.object({
            message: yup
                .string()
                .required('INVALID_MESSAGE_REQUIRED')
                .transform(value => value.replace(/\n{3,}/g, '\n\n').trim())
                .min(1, 'INVALID_MESSAGE_MIN')
                .max(255, 'INVALID_MESSAGE_MAX')
                .matches(rMessage, 'INVALID_MESSAGE_MATCHES'),
        }),
    }),
);

export default { checkSendMessageArgs };
