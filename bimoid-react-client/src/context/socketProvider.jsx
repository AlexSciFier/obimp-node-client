import React, { useContext, useEffect, useState } from 'react'
import io from 'socket.io-client'

const SocketContext = React.createContext()

export function useSocket() {
  return useContext(SocketContext)
}

export function SocketProvider({ children }) {

  const newSocket = io(
    `http://${window.location.hostname}:3333`
  )


  return (
    <SocketContext.Provider value={newSocket}>
      {children}
    </SocketContext.Provider>
  )
}