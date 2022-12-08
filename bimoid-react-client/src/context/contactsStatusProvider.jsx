import React, { useContext, useEffect, useState } from 'react'

const ContactsStatus = React.createContext()

export function useContactsStatus() {
  return useContext(ContactsStatus)
}

export function ContactsStatusProvider({ children }) {
  const [contactsStatus, setContactsStatus] = useState({})

  function updateContactStatus(status) {
    setContactsStatus(prev => (
      {
        ...prev,
        [status.name]: {
          status: status.status,
          statusName: status.statusName
        }
      }
    ))
  }


  return (
    <ContactsStatus.Provider value={{ contactsStatus, updateContactStatus }}>
      {children}
    </ContactsStatus.Provider>
  )
}