import React, { Fragment } from 'react'
import { Disclosure, Menu, Transition } from '@headlessui/react'
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline'
import Image from "next/image";
import TextTransition, { presets } from 'react-text-transition';
import Link from 'next/link';


export default function SignInContainer() {

    return (
        <main className="w-full bg-primary_color flex-1 flex flex-col justify-center items-center gap-10">
            {/* <!-- Sign Up Form --> */}

            <div className='flex flex-col justify-center items-center gap-2' >
                <h3 className="text-3xl text-blue font-semibold">
                Welcome <span className='text-white'>Back</span>
                </h3>
                <p className='text-sm font-normal text-white'>Login to Continue</p>
            </div>
            <form action="#" className='w-[375px]'>

               

                <div className="mb-4">
                  
                    <input
                        type="email"
                        placeholder="Email"
                        className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-primary_color outline-none transition focus:border-blue active:border-blue disabled:cursor-default disabled:bg-whiter"
                    />
                </div>

                <div className="mb-5">
                   
                    <input
                        type="password"
                        placeholder="Password"
                        className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-primary_color outline-none transition focus:border-blue active:border-blue disabled:cursor-default disabled:bg-whiter"
                    />
                </div>

                <div className="mb-8 flex items-center justify-between">
                  <label htmlFor="formCheckbox" className="flex items-center justify-center gap-2 cursor-pointer">
                    <div className="relative pt-0.5">
                      <input
                        type="checkbox"
                        id="formCheckbox"
                        className="text-white"
                      />
                     
                    </div>
                    <p className='text-sm text-white'>Keep me signed in</p>
                  </label>

                </div>

                <button className="mb-3 flex w-full justify-center rounded bg-blue p-3 font-medium text-white ">
              Login
                </button>
                
  <div className='flex flex-row items-center justify-center mb-3'>              <Link
                    href="#"
                    className="text-sm text-white"
                  >
                    Forget password?
                  </Link></div>
                <div className='flex flex-row items-center justify-center'>
                    <h4 className='text-lg font-semibold text-white'>Don't have account? <span className='font-semibold text-blue'>Signup?</span></h4>
                </div>

            </form>

        </main>
    )
}
