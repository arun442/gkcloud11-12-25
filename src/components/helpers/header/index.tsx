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
import AllCourses from './flyout_menu';
// import SearchDialog from './dialog_search';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline'
import { SearchComponent } from './dialog_search';
import { ChevronDownIcon } from '@heroicons/react/24/outline'
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
            "menuName": "Programs",
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

    const profileNavigation=[
        {
            "menuId": 0,
            "menuName": "Home",
            "menuUrl": "/",
            "imageId": null,

            "menuSequencePriority": 1
        },
        {
            "menuId": 1,
            "menuName": "Dashboard",
            "menuUrl": "/profile",
            "imageId": null,

            "menuSequencePriority": 1
        },
        {
            "menuId": 2,
            "menuName": "Achievement",
            "menuUrl": "/profile/my-achivement",
            "imageId": null,

            "menuSequencePriority": 2
        },
        {
            "menuId": 3,
            "menuName": "Notification",
            "menuUrl": "/profile/my-notification",
            "imageId": null,

            "menuSequencePriority": 3
        },
        {
            "menuId": 4,
            "menuName": "Upcoming Webinar",
            "menuUrl": "/profile/upcoming-webinar",
            "imageId": null,

            "menuSequencePriority": 4
        },
        {
            "menuId": 5,
            "menuName": "Talk to us",
            "menuUrl": "/profile/talk-to-us",
            "imageId": null,

            "menuSequencePriority": 5
        },
        {
            "menuId": 6,
            "menuName": "Purchase History",
            "menuUrl": "/profile/my-history",
            "imageId": null,

            "menuSequencePriority": 6
        }

    ]

    useEffect(() => {
        fetchData();
        clearLocalStorage();
        return () => {

        }
    }, []);

    function clearLocalStorage() {
        if (pathname=="/auth/signin") {
            if (localStorage.getItem('userData')) {
                localStorage.clear();
                router.reload();
            }

        }
        if (pathname.includes("/profile") && !localStorage.getItem('session')) {
            localStorage.clear();
            router.push("/");
        }


    }

    const fetchData = async () => {
        try {
            const result = await axiosPublic.get("/lms/menu");
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
    let [isOpen, setIsOpen] = useState(false)
    return (
        <>
            {/* <SearchDialog isOpen={isOpen} setIsOpen={setIsOpen}/> */}
            <Disclosure as="nav" className={classNames(scrolling ? "sticky top-0 z-20 bg-primary_color" : "sticky top-0 z-20",)}>
                {({ open }) => (
                    <>
                        <div className="sm:py-4">

                            <div className="relative flex h-16 items-center justify-between">
                                <div className="absolute inset-y-0 left-0 flex items-center md:hidden">
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
                                <div className="flex flex-1 md:flex md:flex-1 items-center justify-center md:items-center md:justify-between">
                                    <div className="flex flex-shrink-0 items-center">
                                        <img
                                            onClick={(e) => {
                                                router.push("/")
                                            }}
                                            className="h-14 md:h-20 w-auto cursor-pointer"
                                            src="/logo.png"
                                            alt="GK cloud solutions"
                                        />

                                    </div>

                                    <div className="hidden md:ml-6 md:block ">
                                        <div className="flex justify-center items-center">
                                            <div className='flex-1 flex items-center gap-4'>
                                                <SearchComponent />
                                            </div>
                                            {navigation.map((item) => item.menuName == "Programs" ? <AllCourses key={item.menuName} /> :

                                                <a
                                                    key={item.menuName}
                                                    href={item.menuUrl}
                                                    className={classNames(
                                                        pathname.includes(item.menuUrl) ? ' text-blue font-semibold' : 'text-white hover:bg-gray-700 hover:text-blue',
                                                        'rounded-md mx-8 py-2 text-sm font-medium '
                                                    )}
                                                    aria-current={true ? 'page' : undefined}
                                                >
                                                    {item.menuName}
                                                </a>
                                            )}
                                        </div>
                                    </div>
                                </div>
                                {/* <div onClick={(event)=>{
                                   event.preventDefault();
                               setIsOpen(!isOpen);
                           }}>
                            <MagnifyingGlassIcon  className="h-5 w-5 text-white items-center" />
                            </div> */}
                                {
                                isLoading?<></>:    pathname=="/auth/signin" ? <></> : <div className="absolute inset-y-0 right-0 flex items-center pr-2 md:static md:inset-auto md:ml-6 md:pr-0">

                                        {
                                         userData == null ? <ButtonLoginHeader /> : <Menu as="div" className="relative ml-3">
                                                <div>
                                                    <Menu.Button className="relative flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                                                        <span className="absolute -inset-1.5" />
                                                        <span className="sr-only">Open user menu</span>

                                                        {
                                                            // pathname.includes("profile") ? 
                                                            <div className='text-white flex justify-end items-center gap-2'>Hello <span className='text-secondary_yellow'>{userData?.firstName ?? "User"}</span><ChevronDownIcon className="text-text_grey_one h-4 w-4" /></div>
                                                            // : !userData?.profilePictureUrl ? <UserCircleIcon className='text-text_grey h-12 w-12' /> :
                                                            //     <Image
                                                            //         width={20}
                                                            //         height={20}
                                                            //         className="h-8 w-8 rounded-full"
                                                            //         alt='profile'
                                                            //         src={userData?.profilePictureUrl}
                                                            //     />
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
                                                                    onClick={(e) => {

                                                                        router.push("/profile");
                                                                    }}
                                                                    className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
                                                                >
                                                                    Dashboard
                                                                </a>
                                                            )}
                                                        </Menu.Item>
                                                        <Menu.Item>
                                                            {({ active }) => (
                                                                <a
                                                                    onClick={(e) => {

                                                                        router.push("/profile/update");
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
                                                                    onClick={(e) => {
                                                                        localStorage.clear();
                                                                        router.push("/");
                                                                        router.reload()
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

                        <Disclosure.Panel className="md:hidden">
                            <div className="space-y-1 px-2 pb-3 pt-2">
                                {pathname.includes("/profile")? profileNavigation.map((item) => (
                                    <Disclosure.Button
                                        key={item.menuName}
                                        as="a"
                                        href={item.menuUrl}
                                        className={classNames(
                                            userData == null ? 'bg-gray-900 text-white' : 'text-white hover:bg-gray-700 hover:text-white',
                                            'block rounded-md px-3 py-2 text-base font-medium'
                                        )}
                                        aria-current={userData == null ? 'page' : undefined}
                                    >
                                        {item.menuName}
                                    </Disclosure.Button>
                                )):  navigation.map((item) => (
                                    <Disclosure.Button
                                        key={item.menuName}
                                        as="a"
                                        href={item.menuUrl}
                                        className={classNames(
                                            userData == null ? 'bg-gray-900 text-white' : 'text-white hover:bg-gray-700 hover:text-white',
                                            'block rounded-md px-3 py-2 text-base font-medium'
                                        )}
                                        aria-current={userData == null ? 'page' : undefined}
                                    >
                                        {item.menuName}
                                    </Disclosure.Button>
                                ))}
                            </div>
                        </Disclosure.Panel>
                    </>
                )}

            </Disclosure>
        </>

    )
}
