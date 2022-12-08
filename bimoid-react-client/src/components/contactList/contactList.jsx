import React, { useEffect, useState } from 'react'
import useLocalStorage from '../../hooks/useLocalStorage'
import ContactItem from './contactItem'

function Tree({ items }) {
    return (<ul className=''>
        {items.map((item, idx) =>
            <TreeNode key={idx} item={item} />
        )}
    </ul>
    )
}

function TreeNode({ item }) {
    var hasChild = item.children.length > 0
    var isGroup = item.type === "GROUP"
    return (
        <li className='divide-y'>
            <ContactItem isGroup={isGroup} item={item} />
            {hasChild && <Tree items={item.children} />}
        </li >
    )
}

export default function ContactList() {
    const [contactList, setContactList] = useLocalStorage('contactList', '')
    const [filtered, setFiltered] = useState(contactList)

    const filterArray = (arr, searchValue) => {
        let filtered = []
        arr.forEach(value => {
            if (value.type === "GROUP") {
                filtered = [...filtered, ...filterArray(value.children, searchValue)]
            } else {
                let contain = value.sTLDItems.ContactName?.toLocaleLowerCase().includes(searchValue.toLocaleLowerCase())
                if (contain) {
                    filtered.push(value)
                }
            }
        })
        return filtered
    }

    const handleSearch = (e) => {
        if (e.target.value === '')
            setFiltered(contactList)
        else
            setFiltered(filterArray(contactList, e.target.value))
    }

    return (<div className='flex-1 overflow-auto'>
        <h2 className='text-xl uppercase px-5'>Контакты</h2>
        <input className='w-full px-5 py-1 border-b border-black/10 mt-2' type={'text'} placeholder={'Поиск'} onChange={(e) => handleSearch(e)} />
        {
            (filtered?.length > 0) ? <Tree items={filtered} /> : <div>Нет контактов</div>
        }
    </div>)
}

