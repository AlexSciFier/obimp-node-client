import React from 'react'

export default function Profile({ presInfo }) {
    return (
        <div className='px-4 py-5 flex items-center space-x-5'>
            <div>
                <div className='w-10 h-10 rounded-full bg-gray-700'></div>
            </div>
            <div>
                <h1 className='text-xl font-semibold uppercase'>{presInfo.username}</h1>
                <span className='text-gray-600'>{presInfo.ip}</span>
            </div>
        </div>
    )
}
