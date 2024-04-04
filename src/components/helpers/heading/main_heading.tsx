import { Fragment } from 'react'
import { Disclosure, Menu, Transition } from '@headlessui/react'
import { Bars3Icon, BellIcon, XMarkIcon } from '@heroicons/react/24/outline'
import Image from "next/image";


export default function MainHeading({
    text
}:{
    text:string
}) {
    return (
       <h2 className='w-full text-center text-white text-4xl font-semibold'>{text}</h2>
    )
}
