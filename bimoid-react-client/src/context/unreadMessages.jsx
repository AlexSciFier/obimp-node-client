import React, { useContext, useState } from 'react'

const UnreadMessages = React.createContext()

export function useUnreadMessages() {
    return useContext(UnreadMessages)
}

export function UnreadMessagesProvider({ children }) {
    const [unreadMessages, setUnreadMessages] = useState({})

    function addUnreadMessage(message) {
        setUnreadMessages(prev => (
            {
                ...prev,
                [message.account]: ++prev[message.account] || 1
            }
        ))
    }

    function clearUnreadMessage(account) {
        setUnreadMessages(prev => (
            {
                ...prev,
                [account]: 0
            }
        ))
    }

    return (
        <UnreadMessages.Provider value={{ unreadMessages, addUnreadMessage, clearUnreadMessage }}>
            {children}
        </UnreadMessages.Provider>
    )
}