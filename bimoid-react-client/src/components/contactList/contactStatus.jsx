import React from 'react'
import { useContactsStatus } from '../../context/contactsStatusProvider'

export default function ContactStatus({ name }) {
    const { contactsStatus } = useContactsStatus()
    const statusColors = {
        PRES_STATUS_ONLINE: { class: "bg-lime-500" },
        PRES_STATUS_INVISIBLE: { class: "bg-gray-500",icon:'π»' },
        PRES_STATUS_INVISIBLE_FOR_ALL: { class: "bg-gray-500",icon:'π»' },
        PRES_STATUS_FREE_FOR_CHAT: { class: "bg-lime-500",icon:'π' },
        PRES_STATUS_AT_HOME: { class: "bg-lime-500", icon:'π ' },
        PRES_STATUS_AT_WORK: { class: "bg-lime-500", icon:'π' },
        PRES_STATUS_LUNCH: { class: "bg-lime-500",icon:'π½' },
        PRES_STATUS_AWAY: { class: "bg-yellow-500", icon:'π' },
        PRES_STATUS_NOT_AVAILABLE: { class: "bg-gray-500",icon:'π«' },
        PRES_STATUS_OCCUPIED: { class: "bg-gray-500",icon:'π' },
        PRES_STATUS_DO_NOT_DISTURB: { class: "bg-gray-500",icon:'π΅' },
    }
    let status = contactsStatus[name];
    return (
        <div className='relative' title={status?.statusName || "ΠΠ΅ Π² ΡΠ΅ΡΠΈ"}>
            <div className='absolute text-sm right-2 bottom-0'>{statusColors[status?.status]?.icon}</div>
            <div className={`${statusColors[status?.status]?.class || "bg-red-500"} rounded-full w-6 h-6 mr-3 border-2 border-white`}></div>
        </div>
    )
}