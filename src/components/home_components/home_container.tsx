import React, { Fragment ,useState,useEffect} from 'react'
import { Disclosure, Menu, Transition } from '@headlessui/react'
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline'
import Image from "next/image";
import TextTransition, { presets } from 'react-text-transition';
import { axiosPublic } from '@/common/axiosPublic';

import { Combobox } from '@headlessui/react'
import { useRouter } from 'next/router';
const TEXTS = ['Artificial Intelligence', 'Mobile Application', 'Web Application', 'Cloud Architecture'];

export default function HomePageMainContainer() {
  const router=useRouter();
  const [index, setIndex] = React.useState(0);

  React.useEffect(() => {
    const intervalId = setInterval(
      () => setIndex((index) => index + 1),
      3000, // every 3 seconds
    );
    return () => clearTimeout(intervalId);
  }, []);
  const [query, setQuery] = useState('')

  const [items,setItems]=useState([]);
 
 
 
       const fetch = async () => {
         try {
            if(query.length==0){
             return setItems([]);
            }
             const result = await axiosPublic.get('/lms/search',{
                 params:{
                   "searchTerm":query,
                 }
             });
          
             setItems(result.data.courses);
         } catch (error) {
 
         }
     }
 
     useEffect(() => {
    fetch()
     
    
     }, [query])
  return (
    <main className="w-full bg-primary_color flex-1 flex flex-col justify-center items-center">
      <section className='w-full flex flex-row justify-end items-center gap-6'>
        <div className='w-[45%] flex justify-end text-5xl font-bold text-white text-start leading-[70px]'>Level Up<br/>Your Skills </div>
        <TextTransition className='w-[55%] text-5xl mt-[68px]  font-bold text-start leading-[70px] text-blue' springConfig={presets.stiff}>{TEXTS[index % TEXTS.length]}</TextTransition>
      </section>
      <section >
      <Combobox >
        <div className="relative">
          <div className="mt-20 w-96 mx-auto flex flex-row  items-center justify-center relative">
          <span className="absolute h-5 w-5 left-0 top-4  inset-0 pl-3">  <MagnifyingGlassIcon className="h-5 w-5 text-blue items-center" /></span>
            <Combobox.Input
              className="block w-full border-1 pl-10 rounded-full bg-dark_blue py-[15px] text-white shadow-sm ring-1 ring-inset ring-gray-300 placeholder:font-medium placeholder:text-gray-400 placeholder:pl-3  sm:text-sm sm:leading-6"
              placeholder='What do you want to learn?'
             
              onChange={(event) => setQuery(event.target.value)}
            />
      
          </div>
          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
            afterLeave={() => setQuery('')}
          >
            <Combobox.Options className="bg-white-A700  absolute z-50 mt-1 max-h-80 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm">
              {items.length === 0 && query !== '' ? (
                <div className="relative cursor-default select-none px-4 py-2 text-gray-700">
                  Nothing found.
                </div>
              ) : (
                items.map((person:any) => (
                  <Combobox.Option
                  onClick={(e)=>router.push(`/course/${person.courseId}`)}
                    key={person.courseId}
                    className="relative cursor-default py-2 pl-10 pr-4 text-gray-900"
                    value={person.courseId}
                  >
                    {({ selected, active }) => (
                      <>
                        <p
                          className={`block ${
                            false ? 'font-medium' : 'font-normal'
                          }`}
                        >
                          {person.title}
                        </p>
                       
                      </>
                    )}
                  </Combobox.Option>
                ))
              )}
            </Combobox.Options>
          </Transition>
        </div>
      </Combobox>
    </section>
    </main>
  )
}

