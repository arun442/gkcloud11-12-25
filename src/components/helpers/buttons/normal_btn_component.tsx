import { Fragment } from 'react'
import { Disclosure, Menu, Transition } from '@headlessui/react'
import { Bars3Icon, BellIcon, XMarkIcon } from '@heroicons/react/24/outline'
import Image from "next/image";


export default function NormalBtn({
    text,onClick
}:{
    text:any,
    onClick:any
}) {
    return (
        <div onClick={onClick} className='flex flex-row justify-center items-center bg-blue px-12 py-2 text-sm font-medium text-white rounded-full'>{text}</div>
    )
}
