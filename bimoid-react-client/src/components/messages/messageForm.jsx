import React, { useRef } from 'react'
import { ArrowSmRightIcon } from '@heroicons/react/outline';
import { useSocket } from '../../context/socketProvider';
import { useDialog } from '../../context/dialogProvider'
import { useMessages } from '../../context/messagesProvider';
import FileButton from './fileButton';

export default function MessageForm() {

    const socket = useSocket();
    const { dialog } = useDialog();
    const { addMessage } = useMessages();
    let accountID = dialog.AccountName

    const messageInput = useRef(null)

    const submitMessage = (e) => {
        e.preventDefault()
        let msg = {
            account: accountID,
            message: messageInput.current.value
        }
        addMessage(msg, false)
        socket.emit('sendMessage', msg)
        messageInput.current.value = ''
    }

    return (
        <form onSubmit={submitMessage} className='flex h-16 p-4 space-x-2 items-center'>
            <div className='border-gray-200 flex items-center flex-1 shadow-md rounded border'>
                <FileButton />
                <input ref={messageInput} className='px-4 py-2 flex-1' name='message' autoComplete={"off"} />
            </div>
            <button className='bg-lime-600 text-white h-10 w-10 flex items-center justify-center shadow-md rounded-full' type='submit'><ArrowSmRightIcon className='h-7 w-7' /></button>
        </form>
    )
}
