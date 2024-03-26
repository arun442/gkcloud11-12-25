import React, { Fragment } from 'react'
import { Disclosure, Menu, Transition } from '@headlessui/react'
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline'
import Image from "next/image";
import TextTransition, { presets } from 'react-text-transition';
import Link from 'next/link';


export default function OtpContainer() {

  return (
    <main className="w-full bg-primary_color flex-1 flex flex-col justify-center items-center gap-10">
      {/* <!-- Sign Up Form --> */}

      <div className='flex flex-col justify-center items-center gap-2' >
        <h3 className="text-3xl text-white font-semibold">
          Enter <span className='text-blue'>OTP</span>
        </h3>
     
      </div>
      <form action="#" className='w-[375px]'>



        <div className="mb-4">

          <input
          maxLength={6}
            type="password"
            placeholder="Otp"
            className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-primary_color outline-none transition focus:border-blue active:border-blue disabled:cursor-default disabled:bg-whiter"
          />
        </div>





        <button className="mb-3 flex w-full justify-center rounded bg-blue p-3 font-medium text-white ">
          Submit
        </button>



      </form>

    </main>
  )
}
