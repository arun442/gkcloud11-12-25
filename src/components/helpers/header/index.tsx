import { Fragment, useState, useEffect } from 'react'
import { Disclosure, Menu, Transition } from '@headlessui/react'
import { Bars3Icon, BellIcon, XMarkIcon } from '@heroicons/react/24/outline'
import { UserCircleIcon } from '@heroicons/react/24/solid'
import Image from "next/image";
import ButtonLoginHeader from '../buttons/header_login_btn_component';
import classNames from '@/helpers/add_class';
import { axiosPublic } from '@/common/axiosPublic';
import useUserData from '@/hooks/userData';
import { useRouter } from 'next/router';
import { usePathname } from "next/navigation";


export default function Header() {
    const [scrolling, setScrolling] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setScrolling(true);
      } else {
        setScrolling(false);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
    const pathname = usePathname();
    const [navigation, setNavigation] = useState([
        {
            "menuId": 1,
            "menuName": "About",
            "menuUrl": "/about",
            "imageId": null,
          
            "menuSequencePriority": 1
        },
        {
            "menuId": 2,
            "menuName": "Courses",
            "menuUrl": "/course",
            "imageId": null,
          
            "menuSequencePriority": 2
        },
        {
            "menuId": 3,
            "menuName": "Schedules",
            "menuUrl": "/schedule",
            "imageId": null,
           
            "menuSequencePriority": 3
        },
        {
            "menuId": 4,
            "menuName": "Webinars",
            "menuUrl": "/webinar",
            "imageId": null,
           
            "menuSequencePriority": 4
        }

    ]);

    useEffect(() => {
        fetchData();
        clearLocalStorage();
        return () => {

        }
    }, []);

   function clearLocalStorage(){
    if(pathname.includes("auth")){
        if(localStorage.getItem('userData')){
            localStorage.clear();
            router.reload();
        }
      
    }
   
 
    }

    const fetchData = async () => {
        try {
            const result = await axiosPublic.get("/lms/menu");
            console.log("what is the response", result.data);
            setNavigation(result.data.menu.sort(function (a: any, b: any) {
                return a.menuSequencePriority - b.menuSequencePriority; // Sort by ascending age
            }))
        } catch (error) {
            console.log("what is the error");
            console.log(error)
        }
    }
    const { userData, isLoading } = useUserData();
    const router = useRouter();
    return (
        <Disclosure as="nav" className={classNames(scrolling?"sticky top-0 z-20 bg-primary_color":"sticky top-0 z-20",)}>
            {({ open }) => (
                <>
                    <div className="sm:py-4">
                        <div className="relative flex h-16 items-center justify-between">
                            <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                                {/* Mobile menu button*/}
                                <Disclosure.Button className="relative inline-flex items-center justify-center rounded-md p-2 text-white  hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                                    <span className="absolute -inset-0.5" />
                                    <span className="sr-only">Open main menu</span>
                                    {open ? (
                                        <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                                    ) : (
                                        <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                                    )}
                                </Disclosure.Button>
                            </div>
                            <div className="flex flex-1 items-center justify-center sm:items-center sm:justify-between">
                                <div className="flex flex-shrink-0 items-center">
                                    <img
                                    onClick={(e)=>{
                                        router.push("/")
                                    }}
                                        className="h-14 w-auto cursor-pointer"
                                        src="/logo.png"
                                        alt="Your Company"
                                    />
                                </div>
                                <div className="hidden sm:ml-6 sm:block ">
                                    <div className="flex space-x">
                                        {navigation.map((item) => (
                                            <a
                                                key={item.menuName}
                                                href={item.menuUrl}
                                                className={classNames(
                                                    pathname.includes(item.menuUrl) ? ' text-blue font-semibold' : 'text-white hover:bg-gray-700 hover:text-white',
                                                    ' rounded-md mx-10 py-2 text-sm font-medium'
                                                )}
                                                aria-current={true ? 'page' : undefined}
                                            >
                                                {item.menuName}
                                            </a>
                                        ))}
                                    </div>
                                </div>
                            </div>
                           {
                            pathname.includes("auth")?<></>: <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                               
                            {
                                userData == null ? <ButtonLoginHeader /> : <Menu as="div" className="relative ml-3">
                                    <div>
                                        <Menu.Button className="relative flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                                            <span className="absolute -inset-1.5" />
                                            <span className="sr-only">Open user menu</span>
                                                          
                                        {
                                             !userData?.profilePictureUrl ? <UserCircleIcon className='text-text_grey h-12 w-12'/>  : 
                                             <Image
                                                width={20}
                                                height={20}
                                                className="h-8 w-8 rounded-full"
                                                alt='profile'
                                                src={userData?.profilePictureUrl}
                                            />
                                        }
                                        </Menu.Button>
                                    </div>
                                    <Transition
                                        as={Fragment}
                                        enter="transition ease-out duration-100"
                                        enterFrom="transform opacity-0 scale-95"
                                        enterTo="transform opacity-100 scale-100"
                                        leave="transition ease-in duration-75"
                                        leaveFrom="transform opacity-100 scale-100"
                                        leaveTo="transform opacity-0 scale-95"
                                    >
                                        <Menu.Items className="absolute cursor-pointer right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                                            <Menu.Item>
                                                {({ active }) => (
                                                    <a
                                                    onClick={(e)=>{
                                                       
                                                        // router.push("/profile");
                                                      }}
                                                        className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
                                                    >
                                                        Your Profile
                                                    </a>
                                                )}
                                            </Menu.Item>

                                            <Menu.Item>
                                                {({ active }) => (
                                                    <a
                                                      onClick={(e)=>{
                                                        localStorage.clear();
                                                        router.reload();
                                                      }}
                                                        className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
                                                    >
                                                        Sign out
                                                    </a>
                                                )}
                                            </Menu.Item>
                                        </Menu.Items>
                                    </Transition>
                                </Menu>
                            }
                        </div>
                           }
                        </div>
                    </div>

                    <Disclosure.Panel className="sm:hidden">
                        <div className="space-y-1 px-2 pb-3 pt-2">
                            {navigation.map((item) => (
                                <Disclosure.Button
                                    key={item.menuName}
                                    as="a"
                                    href={item.menuUrl}
                                    className={classNames(
                                        userData==null ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                                        'block rounded-md px-3 py-2 text-base font-medium'
                                    )}
                                    aria-current={userData==null ? 'page' : undefined}
                                >
                                    {item.menuName}
                                </Disclosure.Button>
                            ))}
                        </div>
                    </Disclosure.Panel>
                </>
            )}
        </Disclosure>
    )
}
