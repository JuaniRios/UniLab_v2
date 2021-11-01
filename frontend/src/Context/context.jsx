import React, {useReducer} from "react";
import {AuthReducer, initialState} from "./reducer";

const AuthStateContext = React.createContext();
const AuthDispatchContext = React.createContext();
const LocaleContext = React.createContext();

export function useAuthState() {
    const context = React.useContext(AuthStateContext);
    if (context === undefined) {
        throw new Error("useAuthState must be used within an AuthProvider")
    }
    return context
}

export function useAuthDispatch() {
    const context = React.useContext(AuthDispatchContext);
    if (context === undefined) {
        throw new Error("useAuthDispatch must be used within a AuthProvider");
    }
    return context;
}

export function useLocale(){
    const locale = React.useContext(LocaleContext)
    if (locale === undefined) {
        throw new Error("useAuthState must be used within an AuthProvider")
    }
    return locale
}


export const ContextProvider = ({children})  => {
    const [user, dispatch] = useReducer(AuthReducer, initialState);

    return (
        <AuthStateContext.Provider value={user}>
            <AuthDispatchContext.Provider value={dispatch}>
                <LocaleContext.Provider value={'en'}>
                    {children}
                </LocaleContext.Provider>
            </AuthDispatchContext.Provider>
        </AuthStateContext.Provider>
    );

}
