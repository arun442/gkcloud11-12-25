import React, { Fragment } from 'react'
import { Disclosure, Menu, Transition } from '@headlessui/react'
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline'
import Image from "next/image";
import TextTransition, { presets } from 'react-text-transition';


const TEXTS = ['Artificial Intelligence', 'Mobile Application', 'Web Application', 'Cloud Architecture'];

export default function HomePageMainContainer() {
  const [index, setIndex] = React.useState(0);

  React.useEffect(() => {
    const intervalId = setInterval(
      () => setIndex((index) => index + 1),
      3000, // every 3 seconds
    );
    return () => clearTimeout(intervalId);
  }, []);
  return (
    <main className="w-full bg-primary_color flex-1 flex flex-col justify-center items-center">
      <section>
        <div className='text-5xl font-bold text-white text-start leading-[70px]'>Level Up Your Skills Level Up Your Skills <TextTransition className='text-blue' springConfig={presets.stiff}>{TEXTS[index % TEXTS.length]}</TextTransition></div>
        <div className="mt-20 w-96 mx-auto flex flex-row  items-center justify-center relative">
          <span className="absolute   inset-0 flex items-center justify-start pl-3">  <MagnifyingGlassIcon className="h-5 w-5 text-blue items-center" /></span>
          <input
            id="search"
            name="search"
            type="text"
            autoComplete="text"
            placeholder='What do you want to learn?'
            required
            className="block w-full border-1 pl-10 rounded-full bg-dark_blue py-[15px] text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:font-medium placeholder:text-gray-400 placeholder:pl-3 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          />
        </div>
      </section>
    </main>
  )
}
