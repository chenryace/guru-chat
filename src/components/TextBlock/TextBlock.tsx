import React from 'react';
import useStyles from 'isomorphic-style-loader/useStyles';

import s from './TextBlock.scss';
import { cn } from '../../utils/bem-css-module';
import Text, { TextProps } from '../Text/Text';

export interface TextBlockProps {
    font?: TextProps['font'];
    size?: TextProps['size'];
    line?: TextProps['line'];
    weight?: TextProps['weight'];
    color?: TextProps['color'];
    italic?: TextProps['italic'];
    upper?: TextProps['upper'];

    className?: string;
    children: TextProps['children'];
}

const cnTextBlock = cn(s, 'TextBlock');

const TextBlock: React.FC<TextBlockProps> = ({
    font,
    size,
    line,
    weight,
    color,
    italic,
    upper,
    className,
    children,
}) => {
    useStyles(s);

    return (
        <p className={cnTextBlock(null, [className])}>
            <Text font={font} size={size} line={line} weight={weight} color={color} italic={italic} upper={upper}>
                {children}
            </Text>
        </p>
    );
};

export default TextBlock;
