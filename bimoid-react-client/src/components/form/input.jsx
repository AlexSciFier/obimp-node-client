import React from 'react'

export default function Input({label, type,id,name,placeholder,value,inputChange}) {
    return (<>
        <label htmlFor={id}>{label}</label>
        <input 
        type={type} 
        id={id} 
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={inputChange}
        className="appearance-none border rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-lime-600"/>
    </>)
}
