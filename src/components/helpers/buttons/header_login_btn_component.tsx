import { Fragment } from 'react'
import { Disclosure, Menu, Transition } from '@headlessui/react'
import { Bars3Icon, BellIcon, XMarkIcon } from '@heroicons/react/24/outline'
import Image from "next/image";


export default function ButtonLoginHeader() {
    return (
       <div className='bg-white text-sm text-blue font-bold py-2 px-8 border-1 rounded-xl border-separate border-blue'>Login</div>
    )
}
