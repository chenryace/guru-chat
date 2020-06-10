export const tagRegexp = /<\\?.+?>/g;

export const textToHtml = (text: string): string => {
    return text
        .replace(/&/g, '&amp;')
        .replace(/>/g, '&gt;')
        .replace(/</g, '&lt;')
        .replace(/\n/g, '<br>');
};

export const htmlToText = (html: string): string => {
    return html
        .replace(/<br>/g, '\n')
        .replace(new RegExp(tagRegexp), '')
        .replace(/&nbsp;/g, ' ')
        .replace(/&amp;/g, '&')
        .replace(/&gt;/g, '>')
        .replace(/&lt;/g, '<')
        .replace(/\n{3,}/g, '\n\n')
        .trim();
};

export const trimTags = (html: string): string => {
    return html.replace(new RegExp(tagRegexp), match => {
        if (match === '<br>') {
            return match;
        }

        return '';
    });
};
