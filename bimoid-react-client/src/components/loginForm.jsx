import React, { useState } from 'react'
import { ReactComponent as CloverLogo } from '../assets/clover.svg'
import { useSocket } from '../context/socketProvider'
import useLocalStorage from '../hooks/useLocalStorage'
import Input from './form/input'

export default function LoginForm() {
    const [clHash] = useLocalStorage('clHash', '')
    const [credLocal, setCredLocal] = useLocalStorage('creds', {
        host: '',
        port: '7023',
        login: ''
    })

    const [cred, setCred] = useState({
        host: credLocal.host || '',
        port: credLocal.port || '7023',
        login: credLocal.login || '',
        password: '',
        clHash
    })

    const socket = useSocket()

    const handleLoginSend = (e) => {
        e.preventDefault()
        setCredLocal({
            host: cred.host,
            port: cred.port,
            login: cred.login
        })
        socket.emit('login', cred)
    }

    const inputChange = (e) => {

        const target = e.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;
        setCred({ ...cred, [name]: value });
    }

    const formData = [
        {
            label: "Хост/IP",
            type: "text",
            id: "hostinput",
            name: "host",
            value: cred.host,
            placeholder: "localhost",
            inputChange
        },
        {
            label: "Порт",
            type: "text",
            id: "portinput",
            name: "port",
            value: cred.port,
            placeholder: "7023",
            inputChange
        },
        {
            label: "Логин",
            type: "text",
            id: "logininput",
            name: "login",
            value: cred.login,
            placeholder: "",
            inputChange
        },
        {
            label: "Пароль",
            type: "password",
            id: "passwordinput",
            name: "password",
            value: cred.password,
            placeholder: "",
            inputChange
        },
    ]

    return (
        <div className="flex flex-col sm:w-1/3">
            <div className='flex justify-center items-center space-x-4'>
                <CloverLogo className="rotate-45 h-12 w-12" fill={'#65a30d'} />
                <h1 className='text-center text-7xl py-9'>Bimoid</h1>
            </div>
            <form
                onSubmit={handleLoginSend}
                className="flex justify-center flex-col w-full space-y-2">
                {
                    formData.map((item, key) => {
                        return (<Input
                            key={key}
                            label={item.label}
                            type={item.type}
                            id={item.id}
                            name={item.name}
                            placeholder={item.placeholder}
                            value={item.value}
                            inputChange={item.inputChange}
                        />)
                    })
                }
                <button className='bg-lime-600 hover:bg-lime-700 text-white py-2 text-lg rounded-md  focus:outline-none focus:ring-2 focus:ring-lime-500'>Войти</button>
            </form>
        </div>
    )
}
