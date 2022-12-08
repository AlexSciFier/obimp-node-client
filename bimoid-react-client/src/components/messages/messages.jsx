import React from 'react'
import MessageHeader from './messageHeader'
import MessagesStripe from './messagesStripe'
import MessageForm from './messageForm'
import { useDialog } from '../../context/dialogProvider'
import { MenuIcon } from '@heroicons/react/outline'

export default function Messages({ toggleSidebar }) {
    const { dialog } = useDialog();

    if (dialog?.AccountName)
        return (
            <div className='h-full flex flex-col'>
                <MessageHeader showToggleBtn={false} toggleSidebar={toggleSidebar}/>
                <MessagesStripe />
                <MessageForm />
            </div>
        )
    return (
        <div className='h-full flex flex-col justify-center items-center relative'>
            <button className='absolute w-8 top-3 left-4' onClick={()=>toggleSidebar()}><MenuIcon/></button>
            <div className='text-center'>
                Выберите собеседника из списка контактов, что-бы начать диалог
            </div>
        </div>
    )
}
