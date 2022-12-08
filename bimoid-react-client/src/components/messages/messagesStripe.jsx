import React, { useEffect } from 'react'
import { useMessages } from '../../context/messagesProvider'
import { useDialog } from '../../context/dialogProvider'
import { useUnreadMessages } from '../../context/unreadMessages'

export default function MessagesStripe() {
    const { messages } = useMessages()
    const { dialog } = useDialog()
    const { clearUnreadMessage } = useUnreadMessages()
    let accountID = dialog.AccountName

    useEffect(() => {
        clearUnreadMessage(accountID)
    }, [messages])

    return (
        <div className='flex-1 px-8 py-4 space-y-2 overflow-y-auto'>
            {
                messages[accountID]?.map((message, key) => (
                    <div
                        key={key}
                        className={`${message.from ? "bg-gray-300 rounded-br" : "bg-lime-500 rounded-bl"} px-4 py-2 w-fit whitespace-pre rounded-t`}>
                        {message.message}
                    </div>
                ))
            }
        </div>
    )
}
