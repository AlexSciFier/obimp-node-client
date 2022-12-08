import React, { useState, useRef } from 'react'
import { PaperClipIcon } from '@heroicons/react/outline'
import { DocumentIcon } from '@heroicons/react/outline'

export default function FileButton() {
    const fileBtn = useRef()
    const [file, setFile] = useState()
    const [fileName, setFileName] = useState()

    const fileChange = (e) => {
        let url = URL.createObjectURL(e.target.files[0])
        setFile(url)
        setFileName(e.target.files[0].name)
    }
    const fileClear = (e) => {
        e.preventDefault()
        setFile('')
    }
    const errorImage = (e) => {
        setFile('error')
    }

    return (
        <div className='w-8 h-8 ml-2 text-gray-500 relative'>
            <div className='p-1 hover:cursor-pointer rounded hover:bg-gray-100'>
                <label className='hover:cursor-pointer' htmlFor='fileAtt'><PaperClipIcon /></label>
                <input ref={fileBtn} className='hidden' type={'file'} id='fileAtt' onChange={fileChange} />
            </div>

            {file &&
                <div className='absolute -top-24 left-0 h-20 w-20 shadow-md rounded flex justify-center overflow-hidden'>
                    <button className='absolute w-full h-full text-6xl text-red-600 opacity-0 hover:opacity-100' onClick={fileClear}>×</button>
                    {file === 'error' ?
                        <div className='w-full h-fit my-auto'>
                            <DocumentIcon className='w-6 h-6 mx-auto'/> 
                            <div className='text-xs w-full text-center'>{fileName}</div>
                        </div>:
                        <img src={file} alt='' className='bg-contain my-auto' onError={errorImage} />}
                </div>
            }

        </div>
    )
}
