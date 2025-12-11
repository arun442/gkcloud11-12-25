import { Fragment } from 'react'
import { Disclosure, Menu, Transition } from '@headlessui/react'
import { Bars3Icon, BellIcon, XMarkIcon } from '@heroicons/react/24/outline'
import Image from "next/image";


export default function MainHeading({
    text,
    color
}:{
    text:string
    color:string
}) {
    return (
       <h3 className={color?`w-full text-center text-${color}   text-xl md:text-4xl font-semibold`:'w-full text-center text-white   text-4xl font-semibold'} style={{color:color}}>{text}</h3>
    )
}
