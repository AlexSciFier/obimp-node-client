import React from 'react'
import { DialogProvider } from '../../../context/dialogProvider'
import MobileMenu from './mobileMenu'

export default function MessangerMobile({ presInfo }) {
    
    return (
        <DialogProvider>
            <MobileMenu presInfo={presInfo} />
        </DialogProvider>
    )
}