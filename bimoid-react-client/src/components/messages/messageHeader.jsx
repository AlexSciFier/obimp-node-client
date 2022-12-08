import React from 'react'
import { useDialog } from '../../context/dialogProvider'
import ContactStatus from '../contactList/contactStatus'
import { MenuIcon } from '@heroicons/react/outline'

export default function MessageHeader({ toggleSidebar, showToggleBtn }) {
    const { dialog } = useDialog()
    let accountID = dialog.AccountName
    return (
        <div className='h-16 flex items-center px-4 border-b border-gray-200 justify-start'>
            {showToggleBtn && <button className='w-8 text-gray-600 mr-3 flex-shrink-0' onClick={() => toggleSidebar()}>
                <MenuIcon />
            </button>}
            <ContactStatus name={accountID} />
            <h3 className='text-xl flex-shrink'>{dialog.ContactName}</h3>
        </div>
    )
}
