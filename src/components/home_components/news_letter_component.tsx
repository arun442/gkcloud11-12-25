import React, { Fragment, useState } from 'react'
import MainHeading from '../helpers/heading/main_heading'





export default function NewsLetterComponent() {



    return (
        <main className='flex flex-col justify-center items-center gap-14'>
            <MainHeading text='Subscribe to our Newsletter'/>
            <div className="w-128 mx-auto flex flex-row  items-center justify-center relative">
         
          <input
            id="search"
            name="search"
            type="text"
            autoComplete="text"
            placeholder='Enter your email'
            required
            className="block pl-2 w-full border-1 pr-40 rounded-full bg-dark_blue h-12 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:font-medium placeholder:text-gray-400 placeholder:pl-3 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          />
          <div className='absolute right-0 top-0 bottom-0 h-12 w-40 bg-blue rounded-full text-white text-sm font-medium flex flex-row items-center justify-center'>Subscribe</div>
        </div>
        </main>
    )
}
