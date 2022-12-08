import React, { useEffect, useState } from 'react'
import { isMobile, isBrowser } from 'react-device-detect';
import LoginForm from './loginForm';
import ErrorPage from './page/error';
import { LOGIN_ERROR_CODES, BYE_CODES } from '../locale/ru';
import Messanger from './page/messanger';
import { useSocket } from '../context/socketProvider';
import useLocalStorage from '../hooks/useLocalStorage'
import { useContactsStatus } from '../context/contactsStatusProvider';
import { useMessages } from '../context/messagesProvider';
import { NotificationManager } from 'react-notifications';
import { useUnreadMessages } from '../context/unreadMessages';
import { useNotification } from '../context/webNotificationProvider';
import MessangerMobile from './page/mobile/messangerMobile';

export default function Main() {

    const socket = useSocket()
    const { showNotification } = useNotification()

    const { updateContactStatus } = useContactsStatus()
    const { addMessage } = useMessages()
    const { addUnreadMessage } = useUnreadMessages()

    const [, setClHash] = useLocalStorage('clHash', '')
    const [, setContactList] = useLocalStorage('contactList', [])

    const [srvLoginReply, setSrvLoginReply] = useState()
    const [presInfo, setPresInfo] = useState()
    const [srvBye, setSrvBye] = useState({
        state: false,
        reason: ''
    });

    useEffect(() => {
        const errorListener = (message) => {
            NotificationManager.error('Ошибка', message)
            showNotification('Ошибка', message)
        };

        const srvByeListener = (message) => setSrvBye({ state: true, reason: message });

        const srvLoginReplyListener = (message) => {
            setSrvLoginReply(message)
        };

        const presPresenceInfoListener = (message) => {
            setPresInfo(message)
        };

        const contactOnlineListener = (message) => {
            updateContactStatus(message)
        };
        const contactOfflineListener = (message) => {
            updateContactStatus({
                name: message,
                status: '',
                statusName: 'Не в сети'
            })
        };
        const srvMessageListener = (message) => {
            NotificationManager.success(message.message, message.account)
            addUnreadMessage(message)
            addMessage(message, true)
            showNotification(message.account, message.message)
        };

        const clListListener = (message) => {
            setClHash(message.hash)
            setContactList(message.list)
        };

        socket.on('srvBye', srvByeListener);
        socket.on('srvLoginReply', srvLoginReplyListener);
        socket.on('presPresenceInfo', presPresenceInfoListener);
        socket.on('error', errorListener);
        socket.on('contactOnline', contactOnlineListener);
        socket.on('contactOffline', contactOfflineListener);
        socket.on('srvMessage', srvMessageListener);
        socket.on('clList', clListListener);

        return () => {
            socket.off('srvBye', srvByeListener);
            socket.off('srvLoginReply', srvLoginReplyListener);
            socket.off('presPresenceInfo', presPresenceInfoListener);
            socket.off('error', errorListener);  
            socket.off('srvMessage', srvMessageListener);
            socket.off('clList', clListListener);
            socket.off('contactOnline', contactOnlineListener);
            socket.off('contactOffline', contactOfflineListener);
        };
    }, [socket, NotificationManager, setClHash])

    if (srvBye?.state) {
        return (
            <ErrorPage
                type={'Вы были отключены от сервера'}
                message={BYE_CODES[srvBye.reason]} />
        )
    }

    if (srvLoginReply?.error) {
        console.error(srvLoginReply.errorCode)
        return (
            <ErrorPage
                type={"Ошибка аутентификации"}
                message={LOGIN_ERROR_CODES[srvLoginReply.errorCode]} />
        )
    }

    if (presInfo) {
        if (isBrowser) return <Messanger presInfo={presInfo} />
        if (isMobile) return <MessangerMobile presInfo={presInfo} />
    }

    return (
        <LoginForm />
    )

}
