import React, { useContext, useEffect, useState } from 'react'

const Messages = React.createContext()

export function useMessages() {
    return useContext(Messages)
}

export function MessagesProvider({ children }) {
    const [messages, setMessages] = useState({})

    function addMessage(message, from) {
        setMessages(prev => (
            {
                ...prev,
                [message.account]: [...prev[message.account] || [], { message: message.message, from }]
            }
        ))
    }

    return (
        <Messages.Provider value={{ messages, addMessage }}>
            {children}
        </Messages.Provider>
    )
}