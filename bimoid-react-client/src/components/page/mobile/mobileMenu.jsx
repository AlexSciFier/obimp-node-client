import React, { useEffect, useState } from 'react'
import MessageHeader from '../../messages/messageHeader'
import MessagesStripe from '../../messages/messagesStripe'
import MessageForm from '../../messages/messageForm'
import ContactList from '../../contactList/contactList'
import Profile from '../../profile'
import { useDialog } from '../../../context/dialogProvider'

export default function MobileMenu({ presInfo }) {
    const { dialog } = useDialog()
    const [sidebarVisible, setSidebarVisible] = useState(true)

    useEffect(() => {
        if (dialog?.AccountName)
            setSidebarVisible(false)
    }, [dialog])
    
    return (
        <div className='flex flex-auto'>
            {sidebarVisible ?
                <div className='w-full'>
                    <Profile presInfo={presInfo} />
                    <ContactList />
                </div> :
                <div className='w-full'>
                    <div className='h-full flex flex-col'>
                        <MessageHeader showToggleBtn={true} toggleSidebar={() => setSidebarVisible(true)} />
                        <MessagesStripe />
                        <MessageForm />
                    </div>
                </div>
            }
        </div>
    )
}
