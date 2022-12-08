import './App.css';
import 'react-notifications/lib/notifications.css';
import React from 'react'
import Main from './components/main';
import { NotificationContainer } from 'react-notifications';
import { SocketProvider } from './context/socketProvider'
import { ContactsStatusProvider } from './context/contactsStatusProvider';
import { MessagesProvider } from './context/messagesProvider';
import { UnreadMessagesProvider } from './context/unreadMessages';
import { NotificationProvider } from './context/webNotificationProvider';

function App() {

  return (
    <SocketProvider>
      <ContactsStatusProvider>
        <MessagesProvider>
          <UnreadMessagesProvider>
            <NotificationProvider>
              <div className='h-screen'>
                <section className='flex justify-center h-full'>
                  <Main />
                  <NotificationContainer />
                </section>
              </div>
            </NotificationProvider>
          </UnreadMessagesProvider>
        </MessagesProvider>
      </ContactsStatusProvider>
    </SocketProvider>
  );
}

export default App;
