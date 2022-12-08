import React from 'react'
import { ExclamationCircleIcon } from '@heroicons/react/outline'

export default function ErrorPage({ type, message }) {
    return (
        <div className='flex flex-col justify-center items-center text-center space-y-3 mt-10'>
            <div className='flex flex-row items-center text-red-600'>
                <ExclamationCircleIcon className='w-10 h-10' />
                <h1 className='text-4xl'>Ошибка</h1>
            </div>
            <h3 className='text-2xl'>{type}</h3>
            <p className='text-xl'>{message}</p>
        </div>
    )
}
