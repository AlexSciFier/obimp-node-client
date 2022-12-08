import React, { useContext } from 'react'

const NotificationContext = React.createContext()

export function useNotification() {
    return useContext(NotificationContext)
}

function newMessage(permission) {
    if (permission != "granted") return false;
}

export function NotificationProvider({ children }) {
    Notification.requestPermission(newMessage);

    function showNotification(title, body) {
        new Notification(title, {
            body
        })
    }

    return (
        <NotificationContext.Provider value={{ showNotification }}>
            {children}
        </NotificationContext.Provider>
    )
}