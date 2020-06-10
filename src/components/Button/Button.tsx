import React from 'react';
import useStyles from 'isomorphic-style-loader/useStyles';

import s from './Button.scss';
import { cn } from '../../utils/bem-css-module';
import Icon, { IconProps } from '../Icon/Icon';

type ButtonShape = 'rect' | 'circle';
type ButtonColor = 'transparent' | 'pink';
type ButtonSize = 'xs' | 's' | 'm';
type ButtonWeight = 'normal' | 'bold';

export interface ButtonProps {
    shape?: ButtonShape;
    color?: ButtonColor;
    size?: ButtonSize;
    weight?: ButtonWeight;
    upper?: boolean;
    icon?: IconProps['type'];
    iconHover?: IconProps['hover'];
    iconSize?: IconProps['size'];
    clear?: boolean;
    submit?: boolean;

    onClick?: () => void;

    className?: string;
    children?: React.ReactText;
}

const cnButton = cn(s, 'Button');

const Button: React.FC<ButtonProps> = ({
    shape = 'rect',
    color = 'transparent',
    size = 's',
    weight = 'bold',
    upper,
    icon,
    iconHover,
    iconSize,
    clear,
    submit,
    onClick,
    className,
    children,
}) => {
    useStyles(s);

    return (
        // eslint-disable-next-line react/button-has-type
        <button
            className={cnButton(clear ? null : { shape, color, size, weight, upper }, [className])}
            type={submit ? 'submit' : 'button'}
            onClick={onClick}
        >
            {icon ? (
                <Icon
                    className={cnButton('Icon', { withHover: Boolean(iconHover) })}
                    type={icon}
                    hover={iconHover}
                    size={iconSize}
                />
            ) : (
                <span className={cnButton('Text')}>{children}</span>
            )}
        </button>
    );
};

export default Button;
