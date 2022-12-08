import React from 'react'
import { useDialog } from '../../context/dialogProvider';
import { useUnreadMessages } from '../../context/unreadMessages';
import ContactStatus from './contactStatus';

export default function ContactItem({ isGroup, item }) {

    const { dialog, updateDialog } = useDialog()
    const { unreadMessages } = useUnreadMessages()
    const unreadMessagesCount = unreadMessages[item.sTLDItems.AccountName]

    const handleContacntClick = (item) => {
        let contactInfo = item.sTLDItems
        updateDialog(contactInfo)
    }

    if (isGroup)
        return (
            <div className='bg-gray-200 flex items-center space-x-2 px-5 w-full'>
                <span> {item.sTLDItems.GroupName}</span>
            </div >
        )

    return (
        <button className={`px-5 flex items-center w-full text-left ${dialog.AccountName === item.sTLDItems.AccountName && "bg-lime-400"}`} onClick={e => handleContacntClick(item)}>
            <ContactStatus name={item.sTLDItems.AccountName} />
            <div className='flex-1'>
                <div className='border-b border-black/10'>{item.sTLDItems.ContactName}</div>
                <div className='text-gray-500'>{item.sTLDItems.AccountName}</div>
            </div>
            {
                unreadMessagesCount > 0 &&
                <div className='w-6 h-6 bg-lime-600 rounded-full flex justify-center items-center text-white ml-3'>{unreadMessagesCount}</div>
            }
        </button>
    )
}
