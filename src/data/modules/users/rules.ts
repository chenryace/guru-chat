import { inputRule } from 'graphql-shield';

const rUsername = /^[a-zA-Zа-яА-ЯёЁ0-9_./%!?@#$&*()[\]<>+=\-:;^,"'~\s]{1,255}$/;

export const checkAuthArgs = inputRule()(yup =>
    yup.object({
        input: yup.object({
            username: yup
                .string()
                .required('INVALID_USERNAME_REQUIRED')
                .min(6, 'INVALID_USERNAME_MIN')
                .max(32, 'INVALID_USERNAME_MAX')
                .matches(rUsername, 'INVALID_USERNAME_MATCHES'),
        }),
    }),
);

export default { checkAuthArgs };
