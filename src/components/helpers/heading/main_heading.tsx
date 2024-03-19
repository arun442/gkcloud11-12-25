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
       <h2 className='text-blue text-4xl font-bold'>{text}</h2>
    )
}
