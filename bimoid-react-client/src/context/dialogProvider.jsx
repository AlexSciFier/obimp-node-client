import React, { useContext, useEffect, useState } from 'react'

const Dialog = React.createContext()

export function useDialog() {
    return useContext(Dialog)
}

export function DialogProvider({ children }) {
    const [dialog, setDialog] = useState({})

    function updateDialog(contactInfo) {
        setDialog(contactInfo)
    }


    return (
        <Dialog.Provider value={{ dialog, updateDialog }}>
            {children}
        </Dialog.Provider>
    )
}