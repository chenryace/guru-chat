import React from 'react';
import useStyles from 'isomorphic-style-loader/useStyles';

import { cn } from '../../utils/bem-css-module';
import s from './Text.scss';

type TextFont = 'Karla';
type TextSize = 'xs' | 's' | 'm' | 'l' | 'xl' | 'xxl';
type TextLine = 'xs' | 's' | 'm' | 'l' | 'xl' | 'xxl';
type TextWeight = 'regular' | 'bold';
type TextColor = 'white' | 'black' | 'pink';

export interface TextProps {
    font?: TextFont;
    size?: TextSize;
    line?: TextLine;
    weight?: TextWeight;
    color?: TextColor;
    italic?: boolean;
    upper?: boolean;
    semantic?: boolean;

    className?: string;
    style?: React.CSSProperties;
    children: React.ReactNode;
}

const cnText = cn(s, 'Text');

const Text: React.FC<TextProps> = ({
    font = 'Karla',
    size = 's',
    line: originalLine,
    weight = 'regular',
    color = 'white',
    italic,
    upper,
    semantic,
    className,
    style,
    children,
}) => {
    useStyles(s);

    const line: TextLine = originalLine ?? size;

    let Tag: 'span' | 'strong' = 'span';
    let elem: React.ReactNode = children;

    if (semantic) {
        if (italic) {
            elem = <em>{elem}</em>;
        }

        if (weight === 'bold') {
            Tag = 'strong';
        }
    }

    return (
        <Tag className={cnText({ font, size, line, weight, color, italic, upper }, [className])} style={style}>
            {elem}
        </Tag>
    );
};

export default Text;
