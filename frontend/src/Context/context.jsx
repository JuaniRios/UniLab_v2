import React, {useReducer, useState} from "react";
import {AuthReducer, initialState} from "./reducer";

const AuthStateContext = React.createContext();
const AuthDispatchContext = React.createContext();
const LocaleContext = React.createContext();
const MessageContext = React.createContext();


export function useAuthState() {
    const context = React.useContext(AuthStateContext);
    if (context === undefined) {
        throw new Error("useAuthState must be used within the ContextProvider")
    }
    return context
}

export function useAuthDispatch() {
    const context = React.useContext(AuthDispatchContext);
    if (context === undefined) {
        throw new Error("useAuthDispatch must be used within the ContextProvider");
    }
    return context;
}

export function useLocale(){
    const locale = React.useContext(LocaleContext)
    if (locale === undefined) {
        throw new Error("useAuthState must be used within the ContextProvider")
    }
    return locale;
}

export function useMessage(){
    const message = React.useContext(MessageContext)
    if (message === undefined) {
        throw new Error("UseMessage must be used within the ContextProvider ")
    }
    return message;
}


export const ContextProvider = ({children})  => {
    const [user, dispatch] = useReducer(AuthReducer, initialState);
    const [locale, setLocale] = useState("en")
    const [message, setMessage] = useState("")

    if (message) {
        alert(message)
        setMessage("")
    }

    return (
        <AuthStateContext.Provider value={user}>
            <AuthDispatchContext.Provider value={dispatch}>
                <LocaleContext.Provider value={[locale, setLocale]}>
                    <MessageContext.Provider value={[message, setMessage]}>
                        {children}
                    </MessageContext.Provider>
                </LocaleContext.Provider>
            </AuthDispatchContext.Provider>
        </AuthStateContext.Provider>
    );

}
