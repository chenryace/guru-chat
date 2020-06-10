import React from 'react';
import useStyles from 'isomorphic-style-loader/useStyles';

import { cn } from '../../utils/bem-css-module';
import s from './Icon.scss';

type IconSize = 'xs' | 's' | 'm';

type IconType = 'send';

export interface IconProps {
    type: IconType;
    hover?: IconType;
    size?: IconSize;

    className?: string;
}

const cnIcon = cn(s, 'Icon');

const Icon: React.FC<IconProps> = ({ type, hover, size = 's', className }) => {
    useStyles(s);

    return <i className={cnIcon({ type, hover, size }, [className])} />;
};

export default Icon;
