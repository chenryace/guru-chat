import { createContext } from 'react';

export type AppContextTypes = {
    pathname: string;
    query?: object;
    params?: object;
    isAuth?: boolean;
};

const AppContext = createContext<AppContextTypes>({
    pathname: '',
    query: {},
    params: {},
    isAuth: false,
});

export default AppContext;
