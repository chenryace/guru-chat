import React, { useEffect } from 'react';

import history from '../../history';

export interface GuardProps {
    isAllowed: boolean;
    redirectUrl?: string;
    children: React.ReactElement;
}

const Guard: React.FC<GuardProps> = ({ isAllowed, redirectUrl, children }) => {
    useEffect(() => {
        if (!isAllowed && redirectUrl) {
            history.replace(redirectUrl);
        }
    }, [isAllowed, redirectUrl]);

    return isAllowed ? children : null;
};

export default Guard;
