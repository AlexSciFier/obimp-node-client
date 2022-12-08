import React, { useEffect, useState } from 'react'
import ContactList from '../contactList/contactList'
import Profile from '../profile'
import Messages from '../messages/messages'
import { DialogProvider } from '../../context/dialogProvider'

export default function Messanger({ presInfo }) {
    const [sidebarVisible, setSidebarVisible] = useState(true)
    return (
        <DialogProvider>
            <div className='w-3/4 flex h-screen shadow-xl'>
                <div className='flex flex-col'>
                    <Profile presInfo={presInfo} />
                    <ContactList />
                </div>
                <div className='flex-auto shadow-xl'>
                    <Messages toggleSidebar={()=>setSidebarVisible(!sidebarVisible)}/>
                </div>
            </div>
        </DialogProvider>
    )
}
