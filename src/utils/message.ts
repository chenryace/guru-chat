export const normalizeMessage = (message: string) => {
    return message.trim().replace(/\n{3,}/g, '\n\n');
};

export default { normalizeMessage };
