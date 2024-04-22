import React, {useRef, useState, Fragment ,useEffect} from 'react'
import { Dialog, Transition,Combobox  } from '@headlessui/react'
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline'
import { axiosPublic } from '@/common/axiosPublic'
import { useRouter } from 'next/router'
import classNames from '@/helpers/add_class'


  
 function SearchComponent() {
    const router=useRouter();
    const [query, setQuery] = useState('')
    const [show, setShow] = useState(false)
    const [items, setItems] = useState([]);
  
  
  
    const fetch = async () => {
      try {
        if (query.length == 0) {
          return setItems([]);
        }
        const result = await axiosPublic.get('/lms/search', {
          params: {
            "searchTerm": query,
          }
        });
  
        setItems(result.data.courses);
      } catch (error) {
  
      }
    }
  
    useEffect(() => {
      fetch()
  
  
    }, [query])
    const [isExpanded, setIsExpanded] = useState(false);
    const inputRef = useRef<HTMLInputElement>(null);
  
    const expandSearch = () => {
      setIsExpanded(true);
    };
  
    const collapseSearch = () => {
      if (inputRef.current && inputRef.current.value === '') {
        setIsExpanded(false);
      }
    };
  
   
    return (
        <Combobox >
        <div  className=" relative ">
          <div   className=" mx-auto flex flex-row  items-center justify-center relative">
         
            <Combobox.Input
           ref={inputRef}
            onMouseLeave={(e)=>setShow(false)}
              className={classNames("transition-width transition-all duration-1000 pl-4 outline-none focus:outline-none text-gray-900 block w-full rounded-lg bg-white py-[10px] text-gray-900 shadow-sm  placeholder:font-normal placeholder:text-text_grey_one   sm:text-sm sm:leading-6", isExpanded ? 'block w-80' : 'w-0 hidden')
              }
              placeholder='Search Program'

              onFocus={expandSearch}
              onMouseOut={collapseSearch}
              onBlur={collapseSearch}
              onChange={(event) => setQuery(event.target.value)}
            />
 {
   !isExpanded &&<MagnifyingGlassIcon onMouseEnter={expandSearch}  onClick={expandSearch} className="h-5 w-5 text-white items-center" />
 }
          </div>
          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
            afterLeave={() => setQuery('')}
          >
            <Combobox.Options className="bg-white-A700  absolute z-50 mt-1 max-h-80 w-full md:w-96 overflow-auto rounded-md bg-white  text-base  sm:text-sm">
              {items.length === 0 && query != '' ? (
                <div className="relative cursor-default select-none px-4 py-2 text-gray-700">
                  Nothing found.
                </div>
              ) : (
                items.map((person: any) => (
                  <Combobox.Option
                    onClick={(e) =>{
                     
                        router.push(`/course/${person.courseId}`);
                    } }
                    key={person.courseId}
                    className="relative cursor-default py-2 pl-10 pr-4 text-gray-900"
                    value={person.courseId}
                  >
                    {({ selected, active }) => (
                      <>
                        <p
                          className={`block ${false ? 'font-medium' : 'font-normal'
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
    )
  }
function SearchDialog({isOpen, setIsOpen}:{isOpen:any,setIsOpen:any}) {
 

  return (
    <Dialog
      open={isOpen}
      onClose={() => setIsOpen(false)}
      className="relative z-50"
    >
      {/* The backdrop, rendered as a fixed sibling to the panel container */}
      <div  className="fixed inset-0 bg-black/30" aria-hidden="true" />

      {/* Full-screen container to center the panel */}
      <div className="fixed inset-0 flex w-screen items-center justify-center p-4">
        {/* The actual dialog panel  */}
        <Dialog.Panel>
        <SearchComponent/>

          {/* ... */}
        </Dialog.Panel>
     
      </div>
    </Dialog>
  )
}

export { SearchDialog,SearchComponent}