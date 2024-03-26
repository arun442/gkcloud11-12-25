import React, { Fragment } from 'react'
import { Disclosure, Menu, Transition } from '@headlessui/react'
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline'
import Image from "next/image";
import TextTransition, { presets } from 'react-text-transition';


export default function SignUpContainer() {

    return (
        <main className="w-full bg-primary_color flex-1 flex flex-col justify-center items-center gap-10">
            {/* <!-- Sign Up Form --> */}

            <div className='flex flex-col justify-center items-center gap-2' >
                <h3 className="text-3xl text-blue font-semibold">
                    Create <span className='text-white'>Account</span>
                </h3>
                <p className='text-sm font-normal text-white'>Create a New Account</p>
            </div>
            <form action="#" className='w-[375px]'>

                <div className="mb-6">
                   
                    <input
                        type="text"
                        placeholder="Username"
                        className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-primary_color outline-none transition focus:border-blue active:border-blue disabled:cursor-default disabled:bg-whiter"
                    />
                </div>

                <div className="mb-6">
                  
                    <input
                        type="email"
                        placeholder="Email"
                        className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-primary_color outline-none transition focus:border-blue active:border-blue disabled:cursor-default disabled:bg-whiter"
                    />
                </div>

                <div className="mb-8">
                   
                    <input
                        type="password"
                        placeholder="Password"
                        className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-primary_color outline-none transition focus:border-blue active:border-blue disabled:cursor-default disabled:bg-whiter"
                    />
                </div>



                <button className="mb-8 flex w-full justify-center rounded bg-blue p-3 font-medium text-white ">
                Register
                </button>
                <div className='flex flex-row items-center justify-center'>
                    <h4 className='text-sm font-normal text-white'>Already have an account? <span className='font-semibold text-blue'>Login</span></h4>
                </div>

            </form>

        </main>
    )
}
